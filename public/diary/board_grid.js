const contentsContainer = document.getElementById("contents");
const searchInput = document.getElementById("searchInput");

const getdiaryArr = async () => {
  const response = await fetch("/diary/get");
  const data = await response.json();
  console.log(data);
  return data;
};

const doSearch = async (search) => {
  const response = await fetch("/diary/search", {
    method: "post", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search: search,
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

const renderInit = async () => {
  const diaryArr = await getdiaryArr();
  render(diaryArr);
};

const render = async (diaryArr) => {
  console.log(diaryArr);
  diaryArr
    .slice(0)
    .reverse()
    .map((diary) => {
      const diaryFragment = document.createDocumentFragment();
      const diaryDom = document.createElement("a");
      diaryDom.setAttribute("href", "view/" + diary.diary_id);
      diaryDom.className = "diary";

      if (diary.image_dir) {
        const imgdom = document.createElement("img");
        imgdom.className = "diary__img";
        imgdom.setAttribute("src", `/${diary.image_dir}`);
        diaryDom.appendChild(imgdom);
      } else {
        diaryDom.appendChild(noneImg(diary.diary_content));
      }

      const flex = document.createElement("div");
      flex.className = "flex";
      diaryDom.appendChild(flex);

      const titledom = document.createElement("div");
      titledom.className = "diary__title";
      titledom.innerText = diary.diary_title;
      flex.appendChild(titledom);

      if (diary.weather) {
        const weatherdom = document.createElement("img");
        weatherdom.className = "diary__weather";
        weatherdom.setAttribute("src", `../media/icon_${diary.weather}.png`);
        flex.appendChild(weatherdom);
      }
      const datedom = document.createElement("div");
      datedom.className = "diary__date";
      datedom.innerText = diary.diary_date;
      diaryDom.appendChild(datedom);

      diaryFragment.appendChild(diaryDom);
      contentsContainer.appendChild(diaryFragment);
    });
};

const noneImg = (content) => {
  const noneContainer = document.createElement("div");
  noneContainer.className = "diary__noneContainer";

  const noneImgdom = document.createElement("img");
  noneImgdom.className = "diary__noneimg";
  noneImgdom.setAttribute("src", "../media/noneImg_back.jpg");

  //미리보기에서는 스타일 적용X
  const extractTextPattern = /(<([^>]+)>)/gi;
  const extractedText = content.replace(extractTextPattern, "");
  const contentPrevdom = document.createElement("div");
  contentPrevdom.className = "diary__none_contentprev";
  contentPrevdom.innerText = extractedText;

  noneContainer.appendChild(noneImgdom);
  noneContainer.appendChild(contentPrevdom);

  return noneContainer;
};

const deleteNodes = () => {
  while (contentsContainer.firstChild) {
    contentsContainer.removeChild(contentsContainer.lastChild);
  }
};

renderInit();

searchInput.addEventListener("change", async () => {
  console.log(searchInput.value);
  const diaryArr = await doSearch(searchInput.value);
  deleteNodes();
  render(diaryArr);
});
