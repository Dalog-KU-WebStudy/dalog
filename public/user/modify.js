function onDelete(){
    console.log('ondelete 실행');
    if(confirm('정말로 탈퇴하시겠습니까?')==true){
        document.form.submit();
    } else {
        return;
    }
}

const togglePW1 = document.querySelector('#togglePw1');
const togglePW2 = document.querySelector('#togglePw2');
const togglePW3 = document.querySelector('#togglePw3');

var pw1 = document.querySelector('#pswd1');
var pwMsg = document.querySelector('#alertTxt');

var new_pw1 = document.querySelector('#new_pswd1');
var pwMsg = document.querySelector('#alertTxt_new');

var new_pw2 = document.querySelector('#new_pswd2');
var pwMsgArea = document.querySelector('.int_pass');

var userName = document.querySelector('#name');

var yy = document.querySelector('#yy');
var mm = document.querySelector('#mm');
var dd = document.querySelector('#dd');

var mobile = document.querySelector('#mobile');

var error = document.querySelectorAll('.error_next_box');

var mod = document.querySelector('#btnMod');
 
togglePW1.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = pw1.getAttribute('type') === 'password' ? 'text' : 'password';
    pw1.setAttribute('type', type);

    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

togglePW2.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = new_pw1.getAttribute('type') === 'password' ? 'text' : 'password';
    new_pw1.setAttribute('type', type);

    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

togglePW3.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = new_pw2.getAttribute('type') === 'password' ? 'text' : 'password';
    new_pw2.setAttribute('type', type);

    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});


/* 수정 - DB 연동 후 기존 비밀번호와 비교 */
// pw1.addEventListener("blur", checkPw);


new_pw1.addEventListener("blur", checkPw);
new_pw2.addEventListener("blur", comparePw);
userName.addEventListener("blur", checkName);
yy.addEventListener("change", isBirthCompleted);
mm.addEventListener("change", isBirthCompleted);
dd.addEventListener("change", isBirthCompleted);
mobile.addEventListener("change", checkPhone);
mod.addEventListener("mousedown", checkAll);


function checkPw(){
    var pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
    if(!pwPattern.test(new_pw1.value)) {
        error[1].innerHTML = "8~16자 영문 대/소문자, 숫자, 특수문자를 사용하세요.";
        pwMsg.innerHTML = "사용불가";
        pwMsgArea.style.paddingRight = "9.3rem";
        pwMsgArea.style.marginBottom = "2rem"
        error[1].style.display = "block";
        pwMsg.style.color = "red";
        pwMsg.style.display = "block";
        mod.disabled = true;
    } 

    /* 이메일과 비교하는 것 또한 DB 연동 후 비교 */

    // else if(new_pw1.value == email.value){
    //     error[1].innerHTML = "이메일과 같은 비밀번호는 사용할 수 없습니다.";
    //     pwMsg.innerHTML = "사용불가";
    //     pwMsgArea.style.paddingRight = "9.3rem";
    //     pwMsgArea.style.marginBottom = "2rem"
    //     error[1].style.display = "block";
    //     pwMsg.style.color = "red";
    //     pwMsg.style.display = "block";
    //     join.disabled = true;
    // }

    else {
        error[1].style.display = "none";
        pwMsg.innerHTML = "안전";
        pwMsgArea.style.paddingRight = "9.3rem";
        pwMsg.style.color = "#03c75a";
        pwMsg.style.display = "block";
        mod.disabled = false;
    }
}

function comparePw() {

    if(new_pw2.value === new_pw1.value) {
        error[2].style.display = "none";
        mod.disabled = false;
    } else if(new_pw2.value === "" && new_pw1.value !== "") {
        error[2].innerHTML = "미입력 시 비밀번호 변경이 반영되지 않습니다.";
        error[2].style.display = "block";
        mod.disabled = true;
    } else if(new_pw2.value !== new_pw1.value) {
        error[2].innerHTML = "비밀번호가 일치하지 않습니다.";
        error[2].style.display = "block";
        mod.disabled = true;
    } 
}

function checkName() {
    var namePattern = /[a-zA-Z가-힣]/;
    if(!namePattern.test(userName.value) || userName.value.indexOf(" ") > -1) {
        error[3].innerHTML = "한글과 영문 대/소문자를 사용하세요. (특수기호, 공백 사용 불가)";
        error[3].style.display = "block";
        mod.disabled = true;
    } else {
        error[3].style.display = "none";
        mod.disabled = false;
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
    if(yy.value === "" || mm.value === "" || dd.value === ""){
        mod.disabled = false;
    }
    else if(!datePattern.test(dd.value) || Number(dd.value)<1 || Number(dd.value)>31) {
        error[4].innerHTML = "생년월일이 올바르지 않습니다. 다시 확인해주세요.";
    }
}


function checkPhone() {
    var isPhoneNum = /([01]{2,})([01679]{1,})([0-9]{3,4})([0-9]{4})/;

    if(mobile.value === ""){
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

    // 비밀번호 수정 X
    if(new_pw1.value === "" || new_pw2.value === "" || new_pw1.value !== new_pw2.value){
        // -> 비밀번호는 기존 비밀번호 그대로. (DB) 이부분은 나중에 router에서 처리해주면 될듯
    }
    alert("수정완료");
    location.href = "../index.html";
}