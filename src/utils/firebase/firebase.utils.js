//import { format } from "date-fns";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABNSzJSUwugvtapz1Wm-_qh14S0m8Lnbk",
  authDomain: "crown-clothing-db-e3e89.firebaseapp.com",
  projectId: "crown-clothing-db-e3e89",
  storageBucket: "crown-clothing-db-e3e89.appspot.com",
  messagingSenderId: "797250526606",
  appId: "1:797250526606:web:bcf3be5fbb88402a7a98df",
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
fireBaseApp();
// console.log(fireBaseApp, Firestore);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = new getAuth();
export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = new getFirestore();

// push data from files to the cloud data base
export const addToCollectionAndDocument = async (
  collectionKey,
  objectsToAdd,
  field = "title"
) => {
  const collectionReference = collection(db, collectionKey);

  // guarantee the objects are set in place in the data base
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionReference, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();

  //console.log("done");
};

// download data from the cloud data base into the user interface
export const getCollectionFromCloud = async () => {
  const collections = collection(db, "categories");
  const theQuery = query(collections);

  //getting the document collection from cloud storage
  const querySnapShot = await getDocs(theQuery);
  // await Promise.reject(new Error("new error woops"));

  return querySnapShot.docs.map((docSnapShot) => docSnapShot.data());

  // .reduce((acc, snapShot) => {
  //   const { title, items } = snapShot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
};

export const createUserDocumentFromPopUp = async (
  userAuth,
  additionalInfo = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  // console.log(userDocRef);

  const userSnapDoc = await getDoc(userDocRef);

  //first check if the instance of the document exists
  if (!userSnapDoc.exists()) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();
    //const formattedDate = format(today, "yyyy-MM-dd");

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdDate,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("an error occured:", error.message);
    }
  }

  return userSnapDoc;
};

//method to input details using email and password with firebase inbuilt createuserwithemailandpasword
export const createUserWithEmailAndPass = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPass = async (email, password) => {
  if (!email || !password) {
    throw new Error(" Username or Password must be entered");
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) => {
  if (!callback) return;
  onAuthStateChanged(auth, callback);
};

//this implements the signOut to the application,llll,,}L

export const signOutUser = async () => {
  await signOut(auth);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
