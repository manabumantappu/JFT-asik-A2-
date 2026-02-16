import { db, auth } from "../firebase.js";
import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

export async function getUserRole() {
  const uid = auth.currentUser.uid;
  const snap = await getDoc(doc(db, "users", uid));

  if (snap.exists()) {
    return snap.data().role;
  }

  return "user";
}
