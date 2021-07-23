const togglePW1 = document.querySelector('#togglePw1');
const togglePW2 = document.querySelector('#togglePw2');
const password1 = document.querySelector('#pswd1');
const password2 = document.querySelector('#pswd2');

 
togglePW1.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password1.getAttribute('type') === 'password' ? 'text' : 'password';
    password1.setAttribute('type', type);

    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

togglePW2.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type);

    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});




function joinCheck(){
    if(document.getElementById("info-checkbox").checked == true){
      document.getElementById("btnJoin").style.backgroundColor="#104c7c";
      document.getElementById("btnJoin").disabled = false;
    }
    else{
      document.getElementById("btnJoin").disabled = true;
    }

  }

function checkAll(){
    if(document.getElementById("info-checkbox").checked == true){
        if(!checkUserEmail(document.getElementById("email").value)){
        return false;
        }
        if (!checkPassword(document.getElementById("email").value, document.getElementById("pswd1").value, document.getElementById("pswd2").value)) {
            return false;
        }
        if (!checkName(document.getElementById("name").value)) {
            return false;
        }
        location.href='../index.html';
        return true;
    }
    else{
        alert("개인정보수집에 동의하지 않으시면 가입이 불가합니다!");
        document.getElementById("btnJoin").disabled = true;
        return false;
    }

}

function checkExistData(value, dataName){
    if(value == ""){
        alert(dataName + " 입력해주세요!");
        return false;
    }
    return true;
}

function checkUserEmail(email){
    if(!checkExistData(email, "이메일을"))
        return false;

    var emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    if(!emailRegExp.test(email)){
        alert("이메일 형식에 맞게 입력해주세요!");
        document.getElementById("email").value = "";
        document.getElementById("email").focus();
        return false;
    }

    return true;
}

function checkPassword(id, password1, password2) {
    //비밀번호가 입력되었는지 확인하기
    if (!checkExistData(password1, "비밀번호를"))
        return false;
    //비밀번호 확인이 입력되었는지 확인하기
    if (!checkExistData(password2, "비밀번호 확인을"))
        return false;

    //비밀번호와 비밀번호 확인이 맞지 않다면..
    if (password1 != password2) {
        alert("비밀번호가 일치하지 않습니다.");
        form.password1.value = "";
        form.password2.value = "";
        form.password2.focus();
        return false;
    }

    //아이디와 비밀번호가 같을 때..
    if (id == password1) {
        alert("아이디와 비밀번호는 같을 수 없습니다!");
        form.password1.value = "";
        form.password2.value = "";
        form.password2.focus();
        return false;
    }
    return true; //확인이 완료
}

function checkName(name) {
    if (!checkExistData(name, "이름을"))
        return false;

    var nameRegExp = /^[가-힣a-zA-Z' ']{2,15}$/;
    if (!nameRegExp.test(name)) {
        alert("이름이 올바르지 않습니다.");
        return false;
    }
    return true; //확인이 완료되었을 때
}