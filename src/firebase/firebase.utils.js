import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCGEiKpcMKLCLikWw-1w941_aC1V7aefZA",
  authDomain: "alphacloning.firebaseapp.com",
  databaseURL: "https://alphacloning.firebaseio.com",
  projectId: "alphacloning",
  storageBucket: "alphacloning.appspot.com",
  messagingSenderId: "254040229962",
  appId: "1:254040229962:web:5c4c4c92e9bc438a493eb3",
  measurementId: "G-S4RM1DZ9G5"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
