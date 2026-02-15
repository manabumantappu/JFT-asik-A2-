import { db } from "../firebase.js";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function getQuestionsRandom(limitCount = 20) {

  const randomValue = Math.random();

  const q = query(
    collection(db, "questions"),
    where("type", "==", "quiz"),
    orderBy("random"),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);
  let questions = snapshot.docs.map(doc => doc.data());

  // Jika kurang dari 20 (misalnya random di akhir range)
  if (questions.length < limitCount) {
    const q2 = query(
      collection(db, "questions"),
      where("type", "==", "quiz"),
      orderBy("random"),
      limit(limitCount - questions.length)
    );

    const snapshot2 = await getDocs(q2);
    questions = questions.concat(
      snapshot2.docs.map(doc => doc.data())
    );
  }

  return questions;
}
