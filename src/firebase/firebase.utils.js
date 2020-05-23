import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCOx1-P07usKOX9H1VcKCbn8w2d4x_QEUQ",
  authDomain: "crown-db-8af95.firebaseapp.com",
  databaseURL: "https://crown-db-8af95.firebaseio.com",
  projectId: "crown-db-8af95",
  storageBucket: "crown-db-8af95.appspot.com",
  messagingSenderId: "53815890575",
  appId: "1:53815890575:web:1574192cbf05e597aa56fa",
  measurementId: "G-5Q6V1NMSYE",
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
        ...additionalData,
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
