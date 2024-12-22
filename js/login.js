import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

console.log("Login script loaded successfully!");

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Login form submitted!");

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    console.log("Login inputs received - Email:", email);

    const messageBox = document.getElementById("login-message");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful for user:", userCredential.user.email);

        // Display success message
        messageBox.textContent = "Login successful! Welcome back, " + userCredential.user.email;
        messageBox.className = "message success";
        messageBox.style.display = "block";
    } catch (error) {
        console.error("Error during login:", error.message);

        // Display error message
        messageBox.textContent = "Error during login: " + error.message;
        messageBox.className = "message error";
        messageBox.style.display = "block";
    }
});
