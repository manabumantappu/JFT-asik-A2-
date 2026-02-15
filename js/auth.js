import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.registerUser = async () => {
  const email = emailInput.value;
  const pass = passwordInput.value;
  await createUserWithEmailAndPassword(auth, email, pass);
  alert("Berhasil daftar!");
  location.href = "index.html";
};

window.loginUser = async () => {
  const email = emailInput.value;
  const pass = passwordInput.value;
  await signInWithEmailAndPassword(auth, email, pass);
  location.href = "index.html";
};

window.logoutUser = async () => {
  await signOut(auth);
  location.href = "login.html";
};
