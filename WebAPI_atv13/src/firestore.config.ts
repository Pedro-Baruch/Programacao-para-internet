var admin = require("firebase-admin");

var serviceAccount = require("../keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();
export const PostFire = db.collection("post")