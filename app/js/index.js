const menuBtn = document.querySelector(".navbar-menu");
const closeBtn = document.querySelector(".navpanel-close");
const navpanel = document.querySelector(".navpanel");
const body = document.querySelector("body");
const dynamicArea = document.querySelector(".dynamic-area");
const home = document.querySelector(".navpanel-home");
const destination = document.querySelector(".navpanel-destination");
const crew = document.querySelector(".navpanel-crew");
const technology = document.querySelector(".navpanel-technology");

let bodyText = "";
bodyText = dynamicArea.innerHTML;

let currentPage = "home";

function panel() {
  menuBtn.addEventListener("click", (e) => {
    navpanel.style.visibility = "visible";
  });

  closeBtn.addEventListener("click", (e) => {
    navpanel.style.visibility = "hidden";
  });

  home.addEventListener("click", (e) => {
    dynamicArea.innerHTML = bodyText;
    body.className = "";
    body.classList.add("background");
    navpanel.style.visibility = "hidden";
    currentPage = "home";
  });

  destination.addEventListener("click", (e) => {
    dynamicArea.innerHTML = "";
    destinationArea();
    navpanel.style.visibility = "hidden";
  });
}

panel();

function loadData(type, image, title, body, km, time, i) {
  fetch(
    "https://raw.githubusercontent.com/gurpreet2188/frontend-mentor-space/master/assets/data.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      switch (type) {
        case "dest":
          image.style.backgroundImage = `url('${data.destinations[i].images.webp}')`;
          let tText = aText(`${data.destinations[i].name}`);
          title.appendChild(tText);
          let bText = aText(`${data.destinations[i].description}`);
          body.appendChild(bText);
          let avgDist = aText(`${data.destinations[i].distance}`);
          km.appendChild(avgDist);
          let est = aText(`${data.destinations[i].travel}`);
          time.appendChild(est);
      }
    });
}

function removeData(title, bodyText, km, time) {
  title.innerHTML = "";
  bodyText.innerHTML = "";
  km.innerHTML = "";
  time.innerHTML = "";
}

function destinationArea() {
  let pageLayout = new PageLayout();
  body.className = "";
  body.classList.add("destination-bg");
  currentPage = "destination";

  // main div
  const desDiv = document.createElement("div");
  desDiv.classList.add("main");
  dynamicArea.appendChild(desDiv);

  // header
  pageLayout.setHeader("01 Pick your destination", desDiv, "main-header");

  // image
  pageLayout.setImage("main-image", desDiv);

  // names
  const namesDiv = document.createElement("div");
  namesDiv.classList.add("main-names");
  const moon = document.createElement("a");
  const mars = document.createElement("a");
  const europa = document.createElement("a");
  const titan = document.createElement("a");

  const clsNames = [moon, mars, europa, titan];

  mars.classList.add("inactive");
  europa.classList.add("inactive");
  titan.classList.add("inactive");
  moon.href = "#";
  mars.href = "#";
  europa.href = "#";
  titan.href = "#";

  moon.appendChild(aText("Moon"));
  mars.appendChild(aText("mars"));
  europa.appendChild(aText("europa"));
  titan.appendChild(aText("titan"));
  namesDiv.appendChild(moon);
  namesDiv.appendChild(mars);
  namesDiv.appendChild(europa);
  namesDiv.appendChild(titan);
  desDiv.appendChild(namesDiv);

  // title
  pageLayout.setTitle("main-title", desDiv);

  // body text
  pageLayout.setPara("main-body", desDiv);

  //divider
  const divider = document.createElement("span");
  divider.classList.add("main-divider");
  desDiv.appendChild(divider);

  // p
  const avgDist = document.createElement("p");
  avgDist.appendChild(aText("AVG. DISTANCE"));
  avgDist.classList.add("main-avg");
  desDiv.appendChild(avgDist);

  // h2
  const km = document.createElement("h2");
  km.classList.add("main-km");
  desDiv.appendChild(km);

  //p
  const est = document.createElement("p");
  est.appendChild(aText("EST. Travel Time"));
  est.classList.add("main-est");
  desDiv.appendChild(est);

  // h2
  const time = document.createElement("h2");
  time.classList.add("main-time");
  desDiv.appendChild(time);

  loadData(
    "dest",
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    km,
    time,
    0
  );

  // button handling
  buttonHandle(
    clsNames,
    moon,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    km,
    time,
    0
  );
  buttonHandle(
    clsNames,
    mars,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    km,
    time,
    1
  );
  buttonHandle(
    clsNames,
    europa,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    km,
    time,
    2
  );
  buttonHandle(
    clsNames,
    titan,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    km,
    time,
    3
  );
}


function crewArea() {
    //header
    //image
    //divider
    //
}



function aText(tx) {
  let aT = document.createTextNode(`${tx}`);
  return aT;
}

function buttonHandle(clsNames, btn, image, title, bodyText, km, time, i) {
  btn.addEventListener("click", (e) => {
    for (c in clsNames) {
      if (!clsNames[c].classList.contains("inactive")) {
        clsNames[c].classList.add("inactive");
      }
    }
    btn.classList.remove("inactive");
    setTimeout(removeData(title, bodyText, km, time), 100);
    setTimeout(loadData("dest", image, title, bodyText, km, time, i), 300);
  });
}

class PageLayout {
  constructor(header, image, subhead, title, para) {
    this.header = document.createElement("p");
    this.image = document.createElement("div");
    this.subhead = subhead;
    this.title = document.createElement("h1");
    this.para = document.createElement("p");
  }

  setHeader(txt, baseDiv, clsname) {
    let text = document.createTextNode(`${txt}`);
    this.header.appendChild(text);
    baseDiv.appendChild(this.header);
    this.header.classList.add(`${clsname}`);
  }

  setImage(cls, baseDiv) {
    this.image.classList.add(`${cls}`);
    baseDiv.appendChild(this.image);
  }

  setTitle(cls, baseDiv) {
    this.title.classList.add(`${cls}`);
    baseDiv.appendChild(this.title);
  }

  setPara(cls, baseDiv) {
    this.para.classList.add(`${cls}`);
    baseDiv.appendChild(this.para);
  }
}
