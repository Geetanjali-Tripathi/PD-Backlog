document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    
    function generateCustomerId() {
        const length = Math.floor(Math.random() * 16) + 5; // Random length between 5 and 20
        const randomId = Math.random().toString(36).substr(2, length).toUpperCase(); // Generate alphanumeric string
        return "CUST" + randomId;
    }
    const customerId = generateCustomerId();

    const houseNumber = document.getElementById("houseNumber").value.trim();
    const street = document.getElementById("street").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const zip = document.getElementById("zip").value.trim();

    const cityStatePattern = /^[A-Za-z\s]+$/; // Only letters and spaces
    const zipPattern = /^[0-9]{5,6}$/; // ZIP code: 5 or 6 digits

    if (houseNumber === "" || street === "") {
        popupMessage.className = "error";
        popupMessage.textContent = "House number and street cannot be empty.";
        popup.style.display = "block";
        return;
    }
    
    if (!cityStatePattern.test(city)) {
        popupMessage.className = "error";
        popupMessage.textContent = "City should contain only letters.";
        popup.style.display = "block";
        return;
    }
    
    if (!cityStatePattern.test(state)) {
        popupMessage.className = "error";
        popupMessage.textContent = "State should contain only letters.";
        popup.style.display = "block";
        return;
    }
    
    if (!zipPattern.test(zip)) {
        popupMessage.className = "error";
        popupMessage.textContent = "Enter a valid 5 or 6-digit ZIP code.";
        popup.style.display = "block";
        return;
    }

    const address = {
        houseNumber: houseNumber,
        street: street,
        city: city,
        state: state,
        zip: zip
    };
    

    const preferences = [];
    document.querySelectorAll("input[type='checkbox']:checked").forEach(checkbox => {
        preferences.push(checkbox.value);
    });

    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
    let namePattern = /^.{1,50}$/;  
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let mobilePattern = /^[0-9]{10}$/;
    
    
    let popup = document.getElementById("popup");
    let popupMessage = document.getElementById("popupMessage");

    if (!namePattern.test(name)) {  
        popupMessage.className = "error";
        popupMessage.textContent = "Name must be 50 characters or less.";  
        popup.style.display = "block";  
        return;  
    }  

    if (!emailPattern.test(email)) {  
        popupMessage.className = "error";
        popupMessage.textContent = "Enter a valid email address.";  
        popup.style.display = "block";  
        return;  
    }  

    if (!mobilePattern.test(mobile)) {
        popupMessage.className = "error";
        popupMessage.textContent = "Enter a valid 10-digit mobile number.";
        popup.style.display = "block";
        return;
    }

    if (!passwordPattern.test(password)) {
        popupMessage.className = "error";
        popupMessage.textContent = "Password must be of minimum 8 and maximum 30 character and should contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        popup.style.display = "block";
        return;
    }

    if (password !== confirmPassword) {
        popupMessage.className = "error";
        popupMessage.textContent = "Passwords do not match";
        popup.style.display = "block";
        return;
    }

    const user = {
        id: customerId,
        name: name,
        email: email,
        mobile: mobile,
        address: address,
        preferences: preferences,
        password: password
    };

    localStorage.setItem(customerId, JSON.stringify(user));
    popupMessage.className = "success";
    popupMessage.textContent = "Customer Registration Successful. ID: " + customerId + ", Name: " + name;
    popup.style.display = "block";
    document.getElementById("popup").querySelector("button").onclick = function () {
        document.getElementById("popup").style.display = "none";
        window.location.href = "login.html"; // Redirect to login page
    };
});
function closePopup() {
    document.getElementById("popup").style.display = "none";
}


if (!localStorage.getItem("ADMIN123")) { // Only set if not already stored
    const adminCredentials = {
        id: "ADMIN123",
        password: "Admin@123"
    };
    localStorage.setItem("ADMIN123", JSON.stringify(adminCredentials));
}