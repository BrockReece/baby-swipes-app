import firebase from "firebase";
import "firebase/firestore";

import names from "./assets/names.json";
console.log(window.location.hash);
const currentUser = window.location.hash.replace("#", "") || 2;
let cursor = null;
let parent = {};

firebase.initializeApp({
  apiKey: "AIzaSyDIbH8tFgJsQ5ZxF25f4dy589jQYIr9TLY",
  authDomain: "baby-name-swipe.firebaseapp.com",
  databaseURL: "https://baby-name-swipe.firebaseio.com",
  projectId: "baby-name-swipe",
  storageBucket: "baby-name-swipe.appspot.com",
  messagingSenderId: "921233145464"
});

firebase.auth().useDeviceLanguage();

// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//   "sign-in-button",
//   {
//     size: "invisible",
//     callback: function(response) {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       // onSignInSubmit();
//       console.log(response)
//     }
//   }
// );

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

export const setBaby = baby => {
  return db
    .collection("babies")
    .doc("6atmjxdMLkLtr41wpbWE")
    .set(baby);
};

export const importNames = () => {
  // names.forEach(name => {
  //   db.collection("names").add(name);
  // });
};

export const sendResult = (name, like) => {
  const batch = db.batch();
  const babyRef = db.collection("babies").doc("6atmjxdMLkLtr41wpbWE");

  batch.set(
    babyRef.collection("names").doc(name.name),
    {
      [currentUser]: like
    },
    { merge: true }
  );

  batch.set(
    babyRef.collection("parents").doc(`${currentUser}`),
    {
      last: name.id
    },
    { merge: true }
  );

  return batch.commit();
};

export const getFavourites = userId => {
  return db
    .collection("results")
    .where("userId", "==", userId || 1)
    .where("like", "==", true)
    .get()
    .then(querySnapshot => {
      const names = [];
      querySnapshot.forEach(doc => {
        console.log(doc);
        names.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return names;
    });
};

export const getMatches = (user1, user2) => {
  return db
    .collection("babies")
    .doc("6atmjxdMLkLtr41wpbWE")
    .collection("names")
    .where(user1, "==", true)
    .where(user2, "==", true)
    .get()
    .then(querySnapshot => {
      const names = [];
      querySnapshot.forEach(doc => {
        names.push({
          name: doc.id,
          ...doc.data()
        });
      });
      return names;
    });
};

export const getBaby = () => {
  const babyRef = db.collection("babies").doc("6atmjxdMLkLtr41wpbWE");

  babyRef
    .collection("parents")
    .doc(`${currentUser}`)
    .get()
    .then(doc => {
      console.log(doc, doc.data());
      parent = doc.data();
    });

  return babyRef.get().then(doc => doc.data());
};

export const getNames = async (baby = {}) => {
  let collection = db.collection("names");
  console.log(baby);
  if (baby.gender) {
    collection = collection.where("gender", "==", baby.gender);
  }

  // const doc =
  //   cursor ||
  //   ( parent.last ?
  //   (await db
  //     .collection("names")
  //     .doc(parent.last)
  //     .get()) : null );

  if (cursor || parent.last) {
    const doc =
      cursor ||
      (await db
        .collection("names")
        .doc(parent.last)
        .get());

    collection = collection.orderBy("count", "desc").startAfter(doc);
  } else {
    collection = collection.orderBy("count", "desc");
  }

  return collection
    .limit(25)
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot);
      cursor = querySnapshot.docs[querySnapshot.docs.length - 1];
      const names = [];
      querySnapshot.forEach(doc => {
        names.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return names;
    });
};
