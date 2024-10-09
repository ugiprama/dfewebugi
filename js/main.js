import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCClWii5L5W-p3Ig6du_kA01unEhaVoiyE",
    authDomain: "webportfolio-ugi.firebaseapp.com",
    databaseURL: "https://webportfolio-ugi-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "webportfolio-ugi",
    storageBucket: "webportfolio-ugi.appspot.com",
    messagingSenderId: "1015416685531",
    appId: "1:1015416685531:web:35168e5f1af4518b3a9dfe",
    measurementId: "G-XERVVH7SR4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const commentsRef = ref(database, 'comments/');

document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;

    set(ref(database, 'comments/' + Date.now()), { 
        name: name,  
        email: email,
        comment: comment
    }).then(() => {
        alert('Comment submitted successfully!');
        document.getElementById('commentForm').reset();
    }).catch((error) => {
        console.error('Error submitting comment: ', error);
    });
});

onValue(commentsRef, (snapshot) => {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; 

    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-box'); 

        const commentName = document.createElement('h3');
        commentName.textContent = `Nama: ${data.name || 'Anonymous'}`; 
        commentItem.appendChild(commentName);

        const commentEmail = document.createElement('p');
        commentEmail.textContent = `Email: ${data.email}`;
        commentItem.appendChild(commentEmail);

        const commentText = document.createElement('p');
        commentText.textContent = `Keterangan: ${data.comment}`;
        commentItem.appendChild(commentText);

        commentsList.appendChild(commentItem);
    });
});
