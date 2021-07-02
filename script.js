window.addEventListener("load", function () {
    stopWatch(); //bai 1
    clock(); //bai 2
    calculator(); //bai 3
    drumKit(); //bai 4
    colorGame(); //bai 5
});

function stopWatch() {
    var secs = 0;
    var tens = 0;
    var appendTens = document.getElementById("tens");
    var appendSecs = document.getElementById("seconds");
    var button_start = document.getElementById("start-watch");
    var button_stop = document.getElementById("pause-watch");
    var butotn_reset = document.getElementById("reset-watch");
    var interval;

    button_start.addEventListener("click", function () {
        clearInterval(interval);
        interval = setInterval(startTimer, 10)
    })
    button_stop.addEventListener("click", function () {
        clearInterval(interval);
    })
    butotn_reset.addEventListener("click", function () {
        clearInterval(interval);
        secs = 0;
        tens = 0;
        appendSecs.innerHTML = "00";
        appendTens.innerHTML = "00";
    })

    function startTimer() {
        tens++;
        if (tens > 99) {
            tens = 0;
            secs++;
        }
        if (tens < 10)
            appendTens.innerHTML = "0" + tens;
        else
            appendTens.innerHTML = tens;
        if (secs < 10)
            appendSecs.innerHTML = "0" + secs;
        else
            appendSecs.innerHTML = secs;

    }
}

function clock() {
    let time = new Date();
    let sec = time.getSeconds();
    let min = time.getMinutes();
    let hour = time.getHours();
    let session = hour > 12 ? "PM" : "AM";
    if (sec < 10)
        sec = "0" + sec;
    if (min < 10)
        min = "0" + min;
    if (hour < 10)
        hour = "0" + hour;

    document.getElementById("clock").innerHTML = hour + ":" + min + ":" + sec + " " + session;
    setTimeout(clock, 1000);
}

function calculator() {
    var input = document.getElementById("cal-input");
    var operator = document.querySelectorAll(".cal-operators div");
    var number = document.querySelectorAll(".number div");
    var result = document.getElementById("result");
    var clear = document.getElementById("clear");
    var resultDisplayed = false;
    for (let i = 0; i < number.length; i++) {
        number[i].addEventListener("click", function (e) {
            if (resultDisplayed === false) {
                input.innerHTML += number[i].innerHTML;
            } else {
                resultDisplayed = false;
                input.innerHTML = number[i].innerHTML;
            }
        });
    }
    for (let i = 0; i < operator.length; i++) {
        operator[i].addEventListener("click", function () {
            if (input.innerHTML !== '') {
                if (resultDisplayed === true) {
                    input.innerHTML += operator[i].innerHTML;
                    resultDisplayed = false;
                } else {
                    let curString = input.innerHTML;
                    let lastChar = curString[curString.length - 1];
                    switch (lastChar) {
                        case '+':
                        case '-':
                        case '×':
                        case '÷':
                            break;
                        default:
                            input.innerHTML += operator[i].innerHTML;
                    }
                }
            }
        });
    }
    clear.addEventListener("click", function () {
        input.innerHTML = "";
        resultDisplayed = false;
    });
    result.addEventListener("click", function () {
        var inputString = input.innerHTML;
        if (inputString === '') {
            alert("Chua nhap phep tinh");
            return;
        }
        let lastChar = inputString[inputString.length - 1];
        if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
            alert("Khong hop le");
            return;
        }
        if (resultDisplayed !== true) {
            resultDisplayed = true;
            var arr_num = inputString.split(/\+|\-|\×|\÷/g);
            var arr_oper = inputString.replace(/[0-9]|\./g, "").split("");

            arr_num.forEach((val, index) => {
                arr_num[index] = parseFloat(val);
            });

            var div_index = arr_oper.indexOf('÷');
            while (div_index !== -1) {
                arr_num.splice(div_index, 2, arr_num[div_index] / arr_num[div_index + 1]);
                arr_oper.splice(div_index, 1);
                div_index = arr_oper.indexOf('÷');
            }
            var mul_index = arr_oper.indexOf('×');
            while (mul_index !== -1) {
                arr_num.splice(mul_index, 2, arr_num[mul_index] * arr_num[mul_index + 1]);
                arr_oper.splice(mul_index, 1);
                mul_index = arr_oper.indexOf('×');
            }
            var sub_index = arr_oper.indexOf('-');
            while (sub_index !== -1) {
                arr_num.splice(sub_index, 2, arr_num[sub_index] - arr_num[sub_index + 1]);
                arr_oper.splice(sub_index, 1);
                sub_index = arr_oper.indexOf('-');
            }
            var sum_index = arr_oper.indexOf('+');
            while (sum_index !== -1) {
                arr_num.splice(sum_index, 2, arr_num[sum_index] + arr_num[sum_index + 1]);
                arr_oper.splice(sum_index, 1);
                sum_index = arr_oper.indexOf('+');
            }
            input.innerHTML = arr_num[0];
        }
    });
}

function drumKit() {
    const playingClass = "playing";
    const crashRide = document.getElementById('crash-ride');
    const hiHatTop = document.getElementById('hihat-top');
    const drumKeys = [...document.querySelectorAll('.key')];

    window.addEventListener('keydown', playSound);
    // drumKeys.forEach(obj => obj.addEventListener('keydown', playSound)); //ko can vi da co event window bat su kien ban phim, neu bi key trung voi bai khac thi moi dung no
    drumKeys.forEach(obj => obj.addEventListener('transitionend', removeKeyTransition));

    crashRide.addEventListener('transitionend', removeCrashRideTransition);

    hiHatTop.addEventListener('transitionend', removeHiHatTopTransition);

    function animateCrashOrRide() {
        crashRide.style.transform = 'rotate(0deg) scale(1.5)';
    }

    function animateHiHatClosed() {
        hiHatTop.style.top = '171px';
    }

    function removeCrashRideTransition() {
        crashRide.style.transform = 'rotate(-6.8deg) scale(1.5)';
    }

    function removeHiHatTopTransition() {
        hiHatTop.style.top = '166px';
    }

    function removeKeyTransition(e) {
        if (e.propertyName !== 'transform')
            return;
        e.target.classList.remove(playingClass);
    }

    function playSound(e) {
        let keyCode = e.keyCode;
        let keyElement = document.querySelector(`div[data-key="${keyCode}"`);
        if (!keyElement)
            return;

        let audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
        audioElement.currentTime = 0;
        audioElement.play();

        switch (keyCode) {
            case 69:
            case 82:
                animateCrashOrRide();
                break;
            case 75:
                animateHiHatClosed();
                break;
        }

        keyElement.classList.add(playingClass);
    }
}

function colorGame() {
    let background = document.getElementById('color-game');
    let quiz = document.getElementById('color-quiz');
    let button = document.querySelectorAll('.color-button button');

    let cor_color = randomColor();
    let cor_color_str = `rgb(${cor_color.join(', ')})`;
    let correct_button = Math.floor(Math.random() * 6);
    // let count = 0;


    quiz.innerHTML = cor_color_str.toUpperCase() + '<br>#' + cor_color.map(convert16).join('');    
    // console.log(`Answer quiz ${count++}: ${correct_button}`);

    initButton();
    button.forEach(item => {
        item.addEventListener("click", function () {
            if (item.getAttribute("correct")) {
                correct();
            } else {
                item.style.opacity = "0";
            }
        });
    });

    function correct() {
        button.forEach(item => {
            item.style.backgroundColor = cor_color_str;
            item.style.pointerEvents = "none";
            item.style.opacity = 1;
            background.style.backgroundColor = cor_color_str;
        });
        setTimeout(() => reset(), 1500);
    }
    function convert16(item){
        item = item.toString(16).toUpperCase();
        if(item < 10)
            item = '0' + item;
        return item;
    }
    function reset() {
        //next random
        cor_color = randomColor();
        cor_color_str = `rgb(${cor_color.join(', ')})`;
        correct_button = Math.floor(Math.random() * 6);
        // console.log(`Answer quiz ${count++}: ${correct_button}`);

        quiz.innerHTML = cor_color_str.toUpperCase() + '<br>#' + cor_color.map(convert16).join('');    

        background.style.backgroundColor = "#2c8e99";
        initButton();
    }
    function initButton(){
        button.forEach((item, index) => {
            //clear special change
            item.style.pointerEvents = 'all';
            item.removeAttribute('correct');

            if (index === correct_button) {
                item.style.backgroundColor = cor_color_str;
                item.setAttribute("correct", true);
            } else {
                item.style.backgroundColor = `rgb(${randomColor().join(', ')})`;
            }
        });
    }
    function randomColor() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return [r, g, b];
    }
}

