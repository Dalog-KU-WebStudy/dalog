const diaryContent = {
    date: "2021-06-14",
    temper_night: "-20",
    temper_day: "10",
    weather: "rain",
    title: "오늘의 일기",
    img: "../media/view_photo_example.jpg",
    content: `에베베베베베베베베우아아아아아악
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure magnam ea architecto excepturi voluptatum omnis, magni obcaecati enim ad, laboriosam quia animi delectus ut similique consectetur culpa ducimus, aliquid dolores!
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint vero, numquam labore cum dignissimos doloremque itaque earum non quis nisi quasi sequi blanditiis, eius enim sapiente quam adipisci eligendi doloribus.
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, esse, alias pariatur, optio velit recusandae commodi atque minus distinctio dolor tempora ad deserunt fugiat. Quidem perspiciatis omnis voluptate mollitia quasi!`
}


document.getElementById('input_date').value=diaryContent.date;
document.getElementById('input_temper_night').value=diaryContent.temper_night;
document.getElementById('input_temper_day').value=diaryContent.temper_day;
document.getElementById('weather').childNodes[1].src=`../media/icon_${diaryContent.weather}.png`;
document.getElementById('weather').childNodes[1].title=weatherType[diaryContent.weather];
document.getElementById('input_title').value=diaryContent.title;
document.getElementById('today_photo').src=diaryContent.img;
document.getElementById('input_content').innerText= diaryContent.content;

$(function() {
    //모든 datepicker에 대한 공통 옵션 설정
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd' //Input Display Format 변경
        ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
        ,changeYear: true //콤보박스에서 년 선택 가능
        ,changeMonth: true //콤보박스에서 월 선택 가능                
        ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
        ,buttonImage: "../media/icon_calendar.png" //버튼 이미지 경로
        ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
        ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
        ,minDate: "-10Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        ,maxDate: "+2M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)                    
    });

    //input을 datepicker로 선언
    $("#write_date #date #datepicker").datepicker();                    

    //초기값을 오늘 날짜로 설정
    $('#write_date #date #datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    
});