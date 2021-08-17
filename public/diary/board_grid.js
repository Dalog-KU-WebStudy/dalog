const contentsContainer = document.getElementById("contents");

const diaryArr = [
  {
    id: 1,
    title: "일기1",
    content: "내용내용1",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/a85cd36f-9da3-48ad-87e3-044119fd8618/IMG_0910.JPG",
    weather: "sun",
  },
  {
    id: 2,
    weather: "cloud",
    title: "일기2",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure magnam ea architecto excepturi voluptatum omnis, magni obcaecati enim ad, laboriosam quia animi delectus ut similique consectetur culpa ducimus, aliquid dolores! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint vero, numquam labore cum dignissimos doloremque itaque earum non quis nisi quasi sequi blanditiis, eius enim sapiente quam adipisci eligendi doloribus Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, esse, alias pariatur, optio velit recusandae commodi atque minus distinctio dolor tempora ad deserunt fugiat. Quidem perspiciatis omnis voluptate mollitia quasi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure magnam ea architecto excepturi voluptatum omnis, magni obcaecati enim ad, laboriosam quia animi delectus ut similique consectetur culpa ducimus, aliquid dolores! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint vero, numquam labore cum dignissimos doloremque itaque earum non quis nisi quasi sequi blanditiis, eius enim sapiente quam adipisci eligendi doloribus Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, esse, alias pariatur, optio velit recusandae commodi atque minus distinctio dolor tempora ad deserunt fugiat. Quidem perspiciatis omnis voluptate mollitia quasi!",
    date: "20210607",
    img: "",
  },
  {
    id: 3,
    weather: "rain",
    title: "일기3",
    content: "내용내용3",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/e82e3053-beb4-4fa9-b97e-88f46263fe78/Atto3.jpg",
  },
  {
    id: 4,
    weather: "snow",
    title: "일기4",
    content: "내용내용4",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/c9e731a5-ba8c-4782-9f6a-0a25dfef978e/Atto1.JPG",
  },
  {
    id: 5,
    weather: "sun",
    title: "일기5",
    content: "내용내용4",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/a85cd36f-9da3-48ad-87e3-044119fd8618/IMG_0910.JPG",
  },
  {
    id: 6,
    weather: "cloud",
    title: "일기6",
    content: "내용내용4",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/c9e731a5-ba8c-4782-9f6a-0a25dfef978e/Atto1.JPG",
  },
];

const weatherType = {
  sun: "맑음",
  cloud: "흐림",
  rain: "비",
  snow: "눈",
};

const renderInit = () => {
  diaryArr.map((diary) => {
    const diaryFragment = document.createDocumentFragment();
    const diaryDom = document.createElement("a");
    diaryDom.setAttribute("href", "view.html?" + diary.id);
    diaryDom.className = "diary";
    diaryDom.setAttribute("name", "diary#" + diary.id);

    if (diary.img != "") {
      const imgdom = document.createElement("img");
      imgdom.className = "diary__img";
      imgdom.setAttribute("src", diary.img);
      diaryDom.appendChild(imgdom);
    } else {
      diaryDom.appendChild(noneImg(diary.id));
    }

    const flex = document.createElement("div");
    flex.className = "flex";
    diaryDom.appendChild(flex);

    const titledom = document.createElement("div");
    titledom.className = "diary__title";
    titledom.innerText = diary.title;
    flex.appendChild(titledom);

    const weatherdom = document.createElement("img");
    weatherdom.className = "diary__weather";
    weatherdom.setAttribute("src", `../media/icon_${diary.weather}.png`);
    flex.appendChild(weatherdom);

    const datedom = document.createElement("div");
    datedom.className = "diary__date";
    datedom.innerText = diary.date;
    diaryDom.appendChild(datedom);

    diaryFragment.appendChild(diaryDom);
    contentsContainer.appendChild(diaryFragment);
  });
};

const noneImg = (id) => {
  const noneContainer = document.createElement("div");
  noneContainer.className = "diary__noneContainer";

  const noneImgdom = document.createElement("img");
  noneImgdom.className = "diary__noneimg";
  noneImgdom.setAttribute("src", "../media/noneImg_back.jpg");

  const contentPrevdom = document.createElement("div");
  contentPrevdom.className = "diary__none_contentprev";
  contentPrevdom.innerText = diaryArr[id - 1].content;

  noneContainer.appendChild(noneImgdom);
  noneContainer.appendChild(contentPrevdom);

  return noneContainer;
};

renderInit();
