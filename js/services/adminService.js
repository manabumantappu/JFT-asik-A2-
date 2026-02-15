import { db } from "../firebase.js";
import { collection, addDoc } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.addQuestion = async () => {
  await addDoc(collection(db, "questions"), {
    question: question.value,
    options: [opt1.value, opt2.value, opt3.value, opt4.value],
    answer: Number(answer.value),
    explanation: explanation.value,
    type: "quiz"
  });

  alert("Soal berhasil ditambahkan!");
  location.reload();
};
