// Signup form submission
document.getElementById("signupForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Store user data
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));
  
    alert("Signup successful! Please log in.");
    window.location.href = "login.html";
  });
  
  // Login form submission
  document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      alert("Login successful!");
      window.location.href = "../shop/index.html";
    } else {
      alert("Incorrect email or password. Please try again.");
    }
  });
  
  // Display logged-in user's name in profile
  window.onload = function() {
    const profileName = document.getElementById("usernameDisplay");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (profileName && loggedInUser) {
      profileName.textContent = loggedInUser.username;
    }
  };
  
  // Logout functionality
  document.getElementById("logoutBtn")?.addEventListener("click", function() {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    window.location.href = "login.html";
  });
  