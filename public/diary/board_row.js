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
        diaryDom.appendChild(noneImg());
      }

      const right = document.createElement("div");
      right.className = "right";
      diaryDom.appendChild(right);

      const flex = document.createElement("div");
      flex.className = "flex";
      right.appendChild(flex);

      const titledom = document.createElement("div");
      titledom.className = "diary__title";
      titledom.innerText = diary.diary_title;
      flex.appendChild(titledom);

      const datedom = document.createElement("div");
      datedom.className = "diary__date";
      datedom.innerText = diary.diary_date;
      flex.appendChild(datedom);

      const contentwrapper = document.createElement("div");
      contentwrapper.className = "contentwrapper";
      right.appendChild(contentwrapper);

      //미리보기에서는 스타일 적용X
      const extractTextPattern = /(<([^>]+)>)/gi;
      const extractedText = diary.diary_content.replace(extractTextPattern, "");
      const contentdom = document.createElement("div");
      contentdom.className = "diary__content";
      contentdom.innerText = extractedText;
      contentwrapper.appendChild(contentdom);

      diaryFragment.appendChild(diaryDom);
      contentsContainer.appendChild(diaryFragment);
    });
};

const noneImg = () => {
  const background = document.createElement("div");
  background.className = "diary__noneBackground";
  background.setAttribute("src", "../media/noneImg_back.jpg");

  const noneImg = document.createElement("img");
  noneImg.className = "diary__noneImg";
  noneImg.setAttribute("src", "../media/noneImg_row.svg");

  background.appendChild(noneImg);

  return background;
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
