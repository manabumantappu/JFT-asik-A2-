import { db, auth } from "../firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Email yang otomatis jadi admin
const ADMIN_EMAILS = [
  "azishachigo@gmail.com" // pastikan email login kamu sama persis
];

export async function getUserRole() {

  const user = auth.currentUser;
  if (!user) return "user";

  const email = user.email.toLowerCase().trim();

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  const isAdmin = ADMIN_EMAILS.includes(email);

  // Jika document belum ada → buat
  if (!snap.exists()) {

    const role = isAdmin ? "admin" : "user";

    await setDoc(userRef, {
      email: email,
      role: role,
      createdAt: serverTimestamp()
    });

    return role;
  }

  // Jika email admin tapi role belum admin → update otomatis
  if (isAdmin && snap.data().role !== "admin") {

    await setDoc(userRef, {
      email: email,
      role: "admin",
      createdAt: serverTimestamp()
    });

    return "admin";
  }

  return snap.data().role;
}
