// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile, 
  User, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup,
  OAuthProvider,
  AuthProvider,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7J8jPjndyKgU7nqsEz349swIYmHk_Yek",
  authDomain: "jobfinder-d31fa.firebaseapp.com",
  projectId: "jobfinder-d31fa",
  storageBucket: "jobfinder-d31fa.firebasestorage.app",
  messagingSenderId: "721530326028",
  appId: "1:721530326028:web:80c6fc627263da10657229",
  measurementId: "G-03C3BSDDPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// Initialize providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const linkedInProvider = new OAuthProvider('linkedin.com');

// Configure providers with additional scopes/permissions for faster authentication
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
facebookProvider.setCustomParameters({
  'display': 'popup'
});
linkedInProvider.setCustomParameters({
  'prompt': 'select_account'
});

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Custom user types
export type UserType = "employer" | "employee";

// Set authentication persistence (improves user experience)
export async function setAuthPersistence(remember: boolean) {
  const persistenceType = remember ? browserLocalPersistence : browserSessionPersistence;
  try {
    await setPersistence(auth, persistenceType);
    return { error: null };
  } catch (error) {
    console.error("Error setting persistence:", error);
    return { error };
  }
}

// Function to register a new user with email and password
export async function registerUser(email: string, password: string, userType: UserType, displayName: string) {
  try {
    console.log(`Attempting to register user with email: ${email}, type: ${userType}`);
    
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User account created successfully", user.uid);
    
    // Set user display name
    try {
      await updateProfile(user, {
        displayName: displayName
      });
      console.log("User profile updated with displayName");
    } catch (profileError) {
      console.error("Error updating user profile:", profileError);
      // Continue with the process even if profile update fails
    }
    
    // Store additional user data in Firestore, including the user type
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        displayName: displayName,
        userType: userType,
        createdAt: new Date().toISOString()
      });
      console.log("User data stored in Firestore");
    } catch (firestoreError) {
      console.error("Error storing user data in Firestore:", firestoreError);
      // Return partial success since the auth account was created
      return { 
        user, 
        error: {
          message: "Account created but profile data could not be saved. Some features may be limited.",
          originalError: firestoreError
        } 
      };
    }
    
    return { user, error: null };
  } catch (error) {
    console.error("Error registering user:", error);
    return { user: null, error };
  }
}

// Function to login a user with email and password
export async function loginUser(email: string, password: string, remember: boolean = false) {
  try {
    // Set persistence based on remember choice
    await setAuthPersistence(remember);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user data including type
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    
    return { user, userData, error: null };
  } catch (error) {
    console.error("Error logging in:", error);
    return { user: null, userData: null, error };
  }
}

// Function to sign out the current user
export async function logoutUser() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    console.error("Error signing out:", error);
    return { error };
  }
}

// Function to get the current user's type (employer or employee)
export async function getUserType(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.userType as UserType;
    }
    return null;
  } catch (error) {
    console.error("Error getting user type:", error);
    return null;
  }
}

// Function to check current auth state
export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

// Generic function for social media authentication
async function signInWithSocialMedia(provider: AuthProvider, userType: UserType, remember: boolean = true) {
  try {
    // Set persistence based on remember choice (default to true for social logins)
    await setAuthPersistence(remember);
    
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userEmail = user.email;
    
    // Check if user document already exists
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      // User is signing in for the first time, create a profile
      await setDoc(doc(db, "users", user.uid), {
        email: userEmail,
        displayName: user.displayName || `${userType} User`,
        userType: userType,
        createdAt: new Date().toISOString(),
        authProvider: provider.providerId
      });
      console.log("New social media user profile created");
    } else {
      // Update existing profile with latest login
      await setDoc(doc(db, "users", user.uid), 
        { lastLogin: new Date().toISOString() }, 
        { merge: true }
      );
    }
    
    // Get user data
    const updatedUserDoc = await getDoc(doc(db, "users", user.uid));
    const userData = updatedUserDoc.data();
    
    return { user, userData, error: null };
  } catch (error) {
    console.error("Error signing in with social media:", error);
    return { user: null, userData: null, error };
  }
}

// Function to sign in with Google
export async function signInWithGoogle(userType: UserType, remember: boolean = true) {
  return signInWithSocialMedia(googleProvider, userType, remember);
}

// Function to sign in with Facebook
export async function signInWithFacebook(userType: UserType, remember: boolean = true) {
  return signInWithSocialMedia(facebookProvider, userType, remember);
}

// Function to sign in with LinkedIn
export async function signInWithLinkedIn(userType: UserType, remember: boolean = true) {
  return signInWithSocialMedia(linkedInProvider, userType, remember);
}

// Export the instances
export { auth, db, storage, analytics, googleProvider, facebookProvider, linkedInProvider }; 