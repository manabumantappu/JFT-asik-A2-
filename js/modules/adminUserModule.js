import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const userList = document.getElementById("userList");

async function loadUsers() {

  const snapshot = await getDocs(collection(db, "users"));

  userList.innerHTML = "";

  snapshot.forEach((docSnap) => {

    const data = docSnap.data();
    const uid = docSnap.id;

    userList.innerHTML += `
      <div class="flex justify-between items-center border 
                  dark:border-gray-600 p-4 rounded-xl">

        <div>
          <div class="font-semibold">${data.email}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Role: 
            <span class="${data.role === "admin" ? "text-yellow-500 font-semibold" : ""}">
              ${data.role}
            </span>
          </div>
        </div>

        <div class="space-x-2">
          <button onclick="toggleRole('${uid}', '${data.role}')"
            class="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm">
            Ubah Role
          </button>

          <button onclick="deleteUser('${uid}')"
            class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
            Hapus
          </button>
        </div>

      </div>
    `;
  });
}

// ================= EDIT ROLE =================
window.toggleRole = async function(uid, currentRole) {

  const newRole = currentRole === "admin" ? "user" : "admin";

  await updateDoc(doc(db, "users", uid), {
    role: newRole
  });

  loadUsers();
};

// ================= DELETE USER =================
window.deleteUser = async function(uid) {

  if (!confirm("Yakin ingin menghapus user ini?")) return;

  await deleteDoc(doc(db, "users", uid));

  loadUsers();
};

loadUsers();
