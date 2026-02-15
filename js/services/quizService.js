import { db } from "../firebase.js";
import { collection, getDocs } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function getQuestions(type="quiz") {
  const snapshot = await getDocs(collection(db, "questions"));
  return snapshot.docs
    .map(doc => doc.data())
    .filter(q => q.type === type);
}
