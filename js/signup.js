import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

console.log("Signup script loaded successfully!");

document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Sign-up form submitted!");

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    console.log("Sign-up inputs received - Email:", email);

    const messageBox = document.getElementById("signup-message");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Sign-up successful for user:", userCredential.user.email);

        // Display success message
        messageBox.textContent = "Sign-up successful! Welcome, " + userCredential.user.email;
        messageBox.className = "message success";
        messageBox.style.display = "block";
    } catch (error) {
        console.error("Error during sign-up:", error.message);

        // Display error message
        messageBox.textContent = "Error during sign-up: " + error.message;
        messageBox.className = "message error";
        messageBox.style.display = "block";
    }
});
