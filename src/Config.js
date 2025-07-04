// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider ,signOut} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsv-hXQuZr7LY6BI_Eifei7bfj-79XF-4",
  authDomain: "movie-app-ba1ef.firebaseapp.com",
  projectId: "movie-app-ba1ef",
  storageBucket: "movie-app-ba1ef.firebasestorage.app",
  messagingSenderId: "883531097843",
  appId: "1:883531097843:web:88e32964e4e3afb66b7986"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// HANDLE GOOGLE LOGIN
const handleGoogleLogin = async (setError) => {
  try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In:', result.user);
      setError('');
      return result.user;
  } catch (err) {
      console.log(err);
      setError('Google Sign-In failed');
  }
}
// Handle sign up with email ans password

const handleSignUp = async (e,setError) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  if (password !== confirmPassword) {
      setError("Passwords do not match");
    return;
  }

  try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", result.user);
      setError('');
      return result.user;
  } catch (err) {
      console.log(err);
      setError("Sign up failed: " + err.message);
  }
  e.target.reset();
  };

// const signIn = async ()=>{
//   try{
//     await createUserWithEmailAndPassword()
//   }catch{

//   }
// }




// HANDLE LOGIN USING EMAIL AND PASSWORD
const handleSubmit = async (e, setError) => {
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCred.user);
      setError('');
      return userCred.user;
  } catch (err) {
      console.log(err);
      setError('Invalid email or password');
  }
  e.target.reset();
}

// Handle log out 

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (err) {
    console.error("Logout failed:", err.message);
  }
};




export { auth, googleProvider ,handleGoogleLogin ,handleSubmit,handleSignUp,logout} 