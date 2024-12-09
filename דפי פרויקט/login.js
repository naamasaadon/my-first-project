let userScore = 0;
console.log(localStorage.getItem('users'));
window.addEventListener("load", function () {
    document.getElementById('logInForm').style.display = "none";
});

const SignUpBtn = document.getElementById('signUpForm');
const logInBtn = document.getElementById('logInForm');

function showLogIn() {
    logInBtn.style.display = 'block';
    SignUpBtn.style.display = 'none';
}

function showSignUp() {
    SignUpBtn.style.display = 'block';
    logInBtn.style.display = 'none';
}

const btnSign = document.getElementById('signUpForm');
btnSign.addEventListener("submit", sign);

function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{5,8}$/;
    return regex.test(password);
}

function sign(event) {
    event.preventDefault();
    let userName = document.getElementById('nameSign').value;
    let userPsw = document.getElementById('passwordSign').value;
    
    // בדיקת תקינות סיסמה
    if (!validatePassword(userPsw)) {
        document.getElementById("messageSign").innerHTML = 'הסיסמה חייבת להיות בת 5-8 תווים, להכיל לפחות אות קטנה אחת ומספר אחד';
        return;
    }
    
    let newUser = {
        name: userName
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(item => item.name === userName);
    if (user) {
        document.getElementById("messageSign").innerHTML = 'An account with this name already exists,you have to log in';
        return;
    }
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    window.location.href = "../project.html";
}

const btnLogin = document.getElementById('logInForm');
btnLogin.addEventListener("submit", logIn);

function logIn(event) {
    event.preventDefault();
    let userName = document.getElementById('nameLog').value;
    let userPsw = document.getElementById('passwordLog').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const checkName = users.find((item) => item.name === userName);
    if (!checkName) {
        document.getElementById("messageLog").innerHTML = 'An account with this name does not exist. Click the Sign Up button.';
        return;
    }

    // בדיקת תקינות סיסמה
    if (!validatePassword(userPsw)) {
        document.getElementById("messageLog").innerHTML = 'הסיסמה לא תקינה. נסה שוב.';
        return;
    }

    // בדיקת התאמה של שם משתמש וסיסמה
    const user = users.find((item) => item.name === userName )
    if (!user) {
        document.getElementById("messageLog").innerHTML = 'שם משתמש לא מוכר';
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = "../project.html";
}
