const contentsContainer = document.getElementById("contents");

const diaryArr = [
  {
    id: 1,
    title: "일기1",
    content: "내용내용1",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/a85cd36f-9da3-48ad-87e3-044119fd8618/IMG_0910.JPG",
    weather: "맑음",
  },
  {
    id: 2,
    weather: "맑음",
    title: "일기2",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure magnam ea architecto excepturi voluptatum omnis, magni obcaecati enim ad, laboriosam quia animi delectus ut similique consectetur culpa ducimus, aliquid dolores! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint vero, numquam labore cum dignissimos doloremque itaque earum non quis nisi quasi sequi blanditiis, eius enim sapiente quam adipisci eligendi doloribus Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, esse, alias pariatur, optio velit recusandae commodi atque minus distinctio dolor tempora ad deserunt fugiat. Quidem perspiciatis omnis voluptate mollitia quasi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure magnam ea architecto excepturi voluptatum omnis, magni obcaecati enim ad, laboriosam quia animi delectus ut similique consectetur culpa ducimus, aliquid dolores! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint vero, numquam labore cum dignissimos doloremque itaque earum non quis nisi quasi sequi blanditiis, eius enim sapiente quam adipisci eligendi doloribus Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, esse, alias pariatur, optio velit recusandae commodi atque minus distinctio dolor tempora ad deserunt fugiat. Quidem perspiciatis omnis voluptate mollitia quasi!",
    date: "20210607",
    img: "",
  },
  {
    id: 3,
    weather: "맑음",
    title: "일기3",
    content: "내용내용3",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/e82e3053-beb4-4fa9-b97e-88f46263fe78/Atto3.jpg",
  },
  {
    id: 4,
    weather: "맑음",
    title: "일기4",
    content: "내용내용4",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/c9e731a5-ba8c-4782-9f6a-0a25dfef978e/Atto1.JPG",
  },
  {
    id: 5,
    weather: "맑음",
    title: "일기5",
    content: "내용내용4",
    date: "20210607",
    img: "https://images.velog.io/images/sukong/post/a85cd36f-9da3-48ad-87e3-044119fd8618/IMG_0910.JPG",
  },
  {
    id: 6,
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
    const diaryDom = document.createElement("a");
    diaryDom.setAttribute("href", "view.html?" + diary.id);
    diaryDom.className = "diary";

    if (diary.img != "") {
      const imgdom = document.createElement("img");
      imgdom.className = "diary__img";
      imgdom.setAttribute("src", diary.img);
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
    titledom.innerText = diary.title;
    flex.appendChild(titledom);

    const datedom = document.createElement("div");
    datedom.className = "diary__date";
    datedom.innerText = diary.date;
    flex.appendChild(datedom);

    const contentwrapper = document.createElement("div");
    contentwrapper.className = "contentwrapper";
    right.appendChild(contentwrapper);

    const contentdom = document.createElement("div");
    contentdom.className = "diary__content";
    contentdom.innerText = diary.content;
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

renderInit();
