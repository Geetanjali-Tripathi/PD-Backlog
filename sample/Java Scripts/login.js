document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let loginId = document.getElementById("loginId").value;
    let loginPassword = document.getElementById("loginPassword").value;
    let loginPopup = document.getElementById("loginPopup");
    let loginPopupMessage = document.getElementById("loginPopupMessage");

    let userData = localStorage.getItem(loginId);
    
    if (!userData) {
        loginPopupMessage.className = "error";
        loginPopupMessage.textContent = "Invalid credentials";
        loginPopup.style.display = "block";
        return;
    }

    let user = JSON.parse(userData);
    
    if (user.password !== loginPassword) {
        loginPopupMessage.className = "error";
        loginPopupMessage.textContent = "Invalid credentials";
        loginPopup.style.display = "block";
        return;
    }
    
    loginPopupMessage.className = "success";
    loginPopupMessage.textContent = "Login Successful!";
    loginPopup.style.display = "block";

    setTimeout(() => { 
        window.location.href = "register.html"; 
    }, 2000);
});

function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}
