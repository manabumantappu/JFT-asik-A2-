import { db, auth } from "../firebase.js";
import { doc, getDoc } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function getUserRole() {
  const uid = auth.currentUser.uid;
  const snap = await getDoc(doc(db, "users", uid));
  return snap.data()?.role || "user";
}
