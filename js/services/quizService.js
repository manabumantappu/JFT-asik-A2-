import { db } from "../firebase.js";
import {
  collection,
  query,
  where,
  orderBy,
  startAt,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function getQuestionsRandom(limitCount = 20) {

  const randomValue = Math.random();

  // Query utama
  const q = query(
    collection(db, "questions"),
    where("type", "==", "quiz"),
    orderBy("random"),
    startAt(randomValue),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);
  let questions = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  // Jika data kurang dari 20, ambil dari awal
  if (questions.length < limitCount) {

    const q2 = query(
      collection(db, "questions"),
      where("type", "==", "quiz"),
      orderBy("random"),
      limit(limitCount - questions.length)
    );

    const snapshot2 = await getDocs(q2);

    questions = questions.concat(
      snapshot2.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    );
  }

  return questions;
}
