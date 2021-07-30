let date = new Date();
const modal = document.querySelector(".modal");
const modalBack = document.querySelector(".modal_background");
const modalDate = document.querySelector(".modal_date");
const modalContent = document.querySelector(".modal_content");
const closeBtn = document.querySelector(".modal_closeBtn");

const memoMockData = [
  { id: 0, date: "2021.6.3", memo: "6월메모1" },
  { id: 1, date: "2021.6.3", memo: "6월메모2" },
  { id: 2, date: "2021.6.3", memo: "6월메모3" },
  { id: 3, date: "2021.6.4", memo: "아리랑아리랑아라리오" },
  { id: 4, date: "2021.6.4", memo: "아리랑아리랑아라리오" },
  { id: 5, date: "2021.7.1", memo: "아리랑아리랑아라리오" },
  { id: 6, date: "2021.7.30", memo: "웅레ㅔㄹ" },
  { id: 7, date: "2021.6.30", memo: "호롤로" },
  { id: 8, date: "2021.6.30", memo: "호롤로" },
  { id: 9, date: "2021.5.30", memo: "이미미ㅣ" },
];

const renderMemo = () => {
  const memoUl = document.querySelectorAll(".memo");
  for (const ul of memoUl) {
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild);
    }
  }
  memoMockData.map((data) => {
    const thisMemoUl = document.getElementById(`${data.date}`);
    if (thisMemoUl) {
      const memoli = document.createElement("li");
      memoli.innerText = data.memo;
      memoli.className = "memo_one";
      memoli.addEventListener("click", () => {
        openModal(data.date, data.memo, data.id);
      });
      thisMemoUl.appendChild(memoli);
    }
  });
};

const openModal = (date, content, id) => {
  modal.classList.remove("hidden");
  modalDate.innerText = date;
  modalContent.value = content;
  closeBtn.addEventListener(
    "click",
    () => {
      modalClose(date, modalContent.value, id);
    },
    { once: true }
  );
  modalBack.addEventListener(
    "click",
    () => {
      modalClose(date, modalContent.value, id);
    },
    { once: true }
  );
};

const modalClose = (date, content, id) => {
  if (id !== null) {
  }
  //수정
  else memoMockData.push({ date: date, memo: content, id: null }); //삽입
  modal.classList.add("hidden");
  renderMemo();
};

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  //지난달 마지막 날, 이번달 마지막 날
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);
  //지난달 마지막 날짜, 요일 (요일은 숫자로 받아온다.)
  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  //이번달 마지막 날짜, 요일
  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  //전체 달력에 필요한 날짜들을 담아둘 배열
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  //prevDates 계산
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  //nextDates 계산
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    if (i >= firstDateIndex && i < lastDateIndex + 1) {
      dates[i] = `<div class="date">
        <div class="dateTop">
            <div class = "flex">
                <button class="plus" 
                value="${viewYear}.${viewMonth}.${date}">+</button>
                <img class="diaryImg" src="./media/diary.svg"/>
            </div>
            <div class="${condition} dateNum">${date}</div>
        </div>
        <ul class="memo" id ="${viewYear}.${viewMonth}.${date}" ></ul>
    </div>`;
    } else {
      dates[i] = `<div class="date">
        <div class="dateTop">
            <div class = "flex"></div>
            <div class="${condition} dateNum">${date}</div>
        </div>
    </div>`;
    }
  });

  document.querySelector(".dates").innerHTML = dates.join("");
  const plusBtns = document.querySelectorAll(".plus");
  for (const plus of plusBtns) {
    plus.addEventListener("click", (event) => {
      const memoNum = memoMockData.filter((value) => {
        return value.date === event.target.value;
      }).length;
      if (memoNum >= 3) {
        alert("3개이상의 메모를 입력할 수 없습니다");
      } else {
        openModal(event.target.value, null, null);
      }
    });
  }

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerText === today.getDate()) {
        date.classList.add("today");
        break;
      }
    }
  }
  renderMemo();
};

renderCalendar();

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

const goToday = () => {
  date = new Date();
  renderCalendar();
};
