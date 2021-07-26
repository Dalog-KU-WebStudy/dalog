const togglePW1 = document.querySelector('#togglePw1');
const togglePW2 = document.querySelector('#togglePw2');

var email = document.querySelector('#email');

var pw1 = document.querySelector('#pswd1');
var pwMsg = document.querySelector('#alertTxt');

var pw2 = document.querySelector('#pswd2');
var pwMsgArea = document.querySelector('.int_pass');

var userName = document.querySelector('#name');

var yy = document.querySelector('#yy');
var mm = document.querySelector('#mm');
var dd = document.querySelector('#dd');

var mobile = document.querySelector('#mobile');

var error = document.querySelectorAll('.error_next_box');

 
togglePW1.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = pw1.getAttribute('type') === 'password' ? 'text' : 'password';
    pw1.setAttribute('type', type);

    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

togglePW2.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = pw2.getAttribute('type') === 'password' ? 'text' : 'password';
    pw2.setAttribute('type', type);

    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

email.addEventListener("blur", isEmailCorrect);
pw1.addEventListener("blur", checkPw);
pw2.addEventListener("blur", comparePw);
userName.addEventListener("blur", checkName);
yy.addEventListener("change", isBirthCompleted);
mm.addEventListener("change", isBirthCompleted);
dd.addEventListener("change", isBirthCompleted);
mobile.addEventListener("change", checkPhone);


function isEmailCorrect() {
    var emailPattern = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/;

    if(email.value === ""){ 
        error[0].innerHTML = "필수 정보입니다."; 
        error[0].style.display = "block";
    } else if(!emailPattern.test(email.value)) {
        error[0].style.display = "block";
    } else {
        error[0].style.display = "none"; 
    }

}


function checkPw(){
    var pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
    if(pw1.value == "") {
        error[1].innerHTML = "필수 정보입니다.";
        pwMsg.style.display = "block";
        pwMsgArea.style.paddingRight = "40px";
        error[1].style.display = "block";
    }
    else if(!pwPattern.test(pw1.value)) {
        error[1].innerHTML = "8~16자 영문 대/소문자, 숫자, 특수문자를 사용하세요.";
        pwMsg.innerHTML = "사용불가";
        pwMsgArea.style.paddingRight = "9.3rem";
        pwMsgArea.style.marginBottom = "2rem"
        error[1].style.display = "block";
        pwMsg.style.color = "red";
        pwMsg.style.display = "block";
    } else if(pw1.value == email.value){
        error[1].innerHTML = "이메일과 같은 비밀번호는 사용할 수 없습니다.";
        pwMsg.innerHTML = "사용불가";
        pwMsgArea.style.paddingRight = "9.3rem";
        pwMsgArea.style.marginBottom = "2rem"
        error[1].style.display = "block";
        pwMsg.style.color = "red";
        pwMsg.style.display = "block";
    }
    else {
        error[1].style.display = "none";
        pwMsg.innerHTML = "안전";
        pwMsgArea.style.paddingRight = "9.3rem";
        pwMsg.style.color = "#03c75a";
        pwMsg.style.display = "block";
    }
}

function comparePw() {
    if(pw2.value === pw1.value) {
        error[2].style.display = "none";
    } else if(pw2.value !== pw1.value) {
        error[2].innerHTML = "비밀번호가 일치하지 않습니다.";
        error[2].style.display = "block";
    } 

    if(pw2.value === "") {
        error[2].innerHTML = "필수 정보입니다.";
        error[2].style.display = "block";
    }
}

function checkName() {
    var namePattern = /[a-zA-Z가-힣]/;
    if(userName.value === "") {
        error[3].innerHTML = "필수 정보입니다.";
        error[3].style.display = "block";
    } else if(!namePattern.test(userName.value) || userName.value.indexOf(" ") > -1) {
        error[3].innerHTML = "한글과 영문 대/소문자를 사용하세요. (특수기호, 공백 사용 불가)";
        error[3].style.display = "block";
    } else {
        error[3].style.display = "none";
    }
}

function isBirthCompleted() {
    var yearPattern = /[0-9]{4}/;

    if(!yearPattern.test(yy.value)) {
        error[4].innerHTML = "태어난 년도 4자리를 정확하게 입력하세요.";
        error[4].style.display = "block";
    } else {
        isMonthSelected();
    }


    function isMonthSelected() {
        if(mm.value === "월") {
            error[4].innerHTML = "태어난 월을 선택하세요.";
        } else {
            isDateCompleted();
        }
    }

    function isDateCompleted() {
        if(dd.value === "") {
            error[4].innerHTML = "태어난 일(날짜) 2자리를 정확하게 입력하세요.";
        } else {
            isBirthRight();
        }
    }
}

function isBirthRight() {
    var datePattern = /\d{1,2}/;
    if(!datePattern.test(dd.value) || Number(dd.value)<1 || Number(dd.value)>31) {
        error[4].innerHTML = "생년월일이 올바르지 않습니다. 다시 확인해주세요.";
    }
}


function checkPhone() {
    var isPhoneNum = /([01]{2,})([01679]{1,})([0-9]{3,4})([0-9]{4})/;

    if(mobile.value == ""){
        error[5].style.display = "none";
    }
    else if(!isPhoneNum.test(mobile.value)) {
        error[5].innerHTML = "형식에 맞지 않는 번호입니다. '-'를 제외하고 입력해주세요.";
        error[5].style.display = "block";
    } else {
        error[5].style.display = "none";
    }

    
}


function checkAll(){
    if(document.getElementById("info-checkbox").checked == true){
        var i;
        for( i=0 ; i<6 ; i++){
            if(error[i].style.display == "block"){
                alert("필수 정보를 모두 입력해주세요.");
                return false;
            }
        }
        
        location.href='../index.html';
        return true;
    }
    else{
        alert("개인정보수집에 동의하지 않으시면 가입이 불가합니다.");
        document.getElementById("btnJoin").disabled = true;
        return false;
    }

}