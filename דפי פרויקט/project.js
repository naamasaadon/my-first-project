let colorsArray = [];
let userColorsArray = []; // מערך של המשתמש
let computerColorsArray = []; // מערך של המחשב
let guessCount = 0;
let gradeCount = 100;
let winCount = 0;
let timer; // משתנה לניהול הטיימר
let timeLeft = 240; // זמן במשחק (בכמה שניות)

// פונקציה שמעתיקה למערך עזר את כל הצבעים,לא מוגדר כפונקצייה כי זה מתרחש רק פעם אחת
document.querySelectorAll('.colorButton').forEach(function(button) {
    // קריאה לצבע הרקע של הכפתור
    let color = button.style.backgroundColor;
    // הוספת הצבע למערך
    colorsArray.push(color);
});
console.log(colorsArray); // הדפסת מערך עזר

// פונקציה להתחלת משחק
function startNewGame() {
    getColorsFromTheComputer();
    startTimer(); // התחלת הטיימר
}

// פונקציה להתחלת הטיימר
function startTimer() {
    timeLeft = 240; // איפוס הזמן בכל התחלה חדשה של משחק
    timer = setInterval(updateTimer, 1000);
}

// פונקציה לעדכון הזמן
function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = 'Time left: ' + timeLeft + 's';
    if (timeLeft <= 0) {
        clearInterval(timer);
        alert('הזמן נגמר! המשחק הסתיים.');
        document.querySelectorAll('.colorButton').forEach(function(button) {
            button.removeEventListener('click', getColorsFromTheUser);
        });
    }
}

// פונקציה שקולטת את בחירת המחשב ע"י הגרלת צבעים ממערך הצבעים
function getColorsFromTheComputer() {
    while (computerColorsArray.length < 4) {
        let randomIndex = Math.floor(Math.random() * colorsArray.length);
        let randomColor = colorsArray[randomIndex];
        if (!computerColorsArray.includes(randomColor)) {
            computerColorsArray.push(randomColor);
        }
    }
    console.log(computerColorsArray); // הדפסת מערך המחשב
}

// פונקציה שקולטת את בחירת המשתמש לתוך מערך
function getColorsFromTheUser(event) {
    if (!event || !event.target) {
        console.error('אירוע לא הועבר כראוי.');
        return;
    }
    if (userColorsArray.length < 4) {
        guessCount++;
        userColorsArray.push(event.target.style.backgroundColor);
        console.log('הצבע שנבחר הוא: ' + event.target.style.backgroundColor);
        console.log('מערך הצבעים של המשתמש: ' + userColorsArray);
        document.getElementById(guessCount).style.background = event.target.style.backgroundColor;

        console.log(guessCount);
        if (userColorsArray.length === 4) {
            compareColors();
            userColorsArray = []; // ניקוי המערך של המשתמש לאחר ההשוואה
            if (guessCount >= 32) {
                setTimeout(() => {
                    alert('המשחק הסתיים! מספר הניחושים הוגבל ל-8.');
                    document.querySelectorAll('.colorButton').forEach(function(button) {
                        button.removeEventListener('click', getColorsFromTheUser);
                    });
                    clearInterval(timer); // עצירת הטיימר
                }, 100); // הוספת השהיה קטנה של 100 מילישניות
            }
        }
    }
}

document.querySelectorAll('.colorButton').forEach(function(button) {
    button.addEventListener('click', getColorsFromTheUser);
});

//פונקצייה להשמעת צליל מחיאות כפיים בעת ניצחון
function playClapSound() {
    const clapSound = document.getElementById('clapSound');
    clapSound.play();
}

//פונקצייה להפרחת קונפטי בעת ניצחון
function launchConfetti() {
    confetti({
        particleCount: 120,//מספר הקונפטי
        spread: 70,//פיזור
        origin: { y: 0.9 }//מאיפה יתחיל הקונפטי
    });
}

// פונקציה להשוואת ניחוש המשתמש עם בחירת המחשב
function compareColors() {
    winCount = 0; // איפוס משתנה הספירה של הניצחונות
    if (userColorsArray.length === 4) {
        for (let i = 0; i < 4; i++) {
            let found = false; // משתנה לעקוב אם מצאנו התאמה חלקית או מלאה
            gradeCount++;
            for (let j = 0; j < 4; j++) {
                if (userColorsArray[i] === computerColorsArray[j]) {
                    if (i === j) {
                        console.log('bool'); // התאמה מלאה: אותו צבע באותו מיקום
                        document.getElementById(gradeCount).style.background = 'rgb(249, 243, 243)';
                        winCount++;
                    } else {
                        console.log('pgia'); // התאמה חלקית: אותו צבע במיקום שונה
                        document.getElementById(gradeCount).style.background = 'rgb(2, 0, 0)';
                    }
                    found = true; // ציין שמצאנו התאמה
                    break; // צא מהלולאה הפנימית
                }
            }
            if (!found) {
                console.log('this color is not found'); // לא מצאנו התאמה
                document.getElementById(gradeCount).style.background = 'rgb(252, 16, 16)';
            }
        }
        checkWin(winCount); // בדיקת הניצחון לאחר סיום כל ההשוואות
    } else {
        console.log('אנא בחר 4 צבעים לפני ביצוע ההשוואה.');
    }
}

function checkWin(winCount) {
    setTimeout(() => {
        if (winCount === 4) {
            playClapSound();
            launchConfetti();
            document.querySelectorAll('.colorButton').forEach(function(button) {
                button.removeEventListener('click', getColorsFromTheUser);
            });
            clearInterval(timer); // עצירת הטיימר
        }
    }, 100); // הוספת השהיה קטנה של 100 מילישניות
}

startNewGame();