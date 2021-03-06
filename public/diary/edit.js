

$(function() {
    //모든 datepicker에 대한 공통 옵션 설정
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd' //Input Display Format 변경
        ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
        ,changeYear: true //콤보박스에서 년 선택 가능
        ,changeMonth: true //콤보박스에서 월 선택 가능                
        ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
        ,buttonImage: "/media/icon_calendar.png" //버튼 이미지 경로
        ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
        ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
        ,minDate: "-10Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        ,maxDate: "0" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)                    
    });

    //input을 datepicker로 선언
    $("#write_date #date #datepicker-date").datepicker();                    
});

const fillContent = async function(){
    const url = `http://ec2-13-209-20-122.ap-northeast-2.compute.amazonaws.com:3000/diary/edit/${id}`;
    const xhr = new XMLHttpRequest();
    xhr.open('post', url);
    xhr.send();
    console.log('post 호출');

    xhr.addEventListener('load', function () {

        if (xhr.responseText!="wrongId") {
            diary = JSON.parse(xhr.responseText);
            console.dir(diary);

            document.getElementById('datepicker').value=diary.diary_date;
            if(diary.weather){
                document.getElementById('currentWeather').src=`/media/icon_${diary.weather}.png`;
                let weather_select = document.getElementById('weather_select');
                for(let i=0; i<6; i++){
                    if(weather_select.options[i].value==diary.weather){
                        weather_select.options[i].selected=true;
                    }
                }
            }
            else {
                getWeatherData();
            }
            document.getElementById('input_title').value=diary.diary_title;
            
            if (diary.image_dir) {
                document.getElementById('today_photo').src=`/${diary.image_dir}`;
            } else {
                document.getElementById("today_photo").style = "display : none";
            }
            
            document.getElementById('note-editable').innerHTML = diary.diary_content;
            document.getElementById('input_content').innerHTML = diary.diary_content;
            document.getElementsByClassName('note-placeholder')[0].style = 'display:none;'
        } else {
            alert('잘못된 접근입니다.'); location.href = '/';
        }
    })
}

fillContent();
