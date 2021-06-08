const contentsContainer = document.getElementById("contents");

const diaryArr = [
  {
    title: "일기1",
    content: "내용내용1",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/a85cd36f-9da3-48ad-87e3-044119fd8618/IMG_0910.JPG",
    weather: "맑음",
  },
  {
    weather: "맑음",
    title: "일기2",
    content: "내용내용2",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/e82e3053-beb4-4fa9-b97e-88f46263fe78/Atto3.jpg",
  },
  {
    weather: "맑음",
    title: "일기3",
    content: "내용내용3",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/e82e3053-beb4-4fa9-b97e-88f46263fe78/Atto3.jpg",
  },
  {
    weather: "맑음",
    title: "일기4",
    content: "내용내용4",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/c9e731a5-ba8c-4782-9f6a-0a25dfef978e/Atto1.JPG",
  },
  {
    weather: "맑음",
    title: "일기5",
    content: "내용내용4",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/a85cd36f-9da3-48ad-87e3-044119fd8618/IMG_0910.JPG",
  },
  {
    weather: "맑음",
    title: "일기6",
    content: "내용내용4",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/c9e731a5-ba8c-4782-9f6a-0a25dfef978e/Atto1.JPG",
  },
];

const renderInit = () => {
  diaryArr.map((diary) => {
    const diaryFragment = document.createDocumentFragment();
    const diaryDom = document.createElement("div");
    diaryDom.className = "diary";

    // const imgdom = document.createElement("img");
    // imgdom.className = "diary__img";
    // imgdom.setAttribute("src", diary.img);
    // diaryDom.appendChild(imgdom);

    const flex = document.createElement("div");
    flex.className = "flex";
    diaryDom.appendChild(flex);

    const titledom = document.createElement("div");
    titledom.className = "diary__title";
    titledom.innerText = diary.title;
    flex.appendChild(titledom);

    const datedom = document.createElement("div");
    datedom.className = "diary__date";
    datedom.innerText = diary.date;
    flex.appendChild(datedom);

    const imagedom = document.createElement("div");
    imagedom.setAttribute("src", diary.img);
    imagedom.className = "diary__image";
    diaryDom.appendChild(imagedom);

    diaryFragment.appendChild(diaryDom);
    contentsContainer.appendChild(diaryFragment);
  });
};

renderInit();
