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
    if (!window.matchMedia("(max-width: 64rem)")) {
      navpanel.style.visibility = "hidden";
    } else {
      navpanel.style.visibility = "visible";
    }
    currentPage = "home";
  });

  destination.addEventListener("click", (e) => {
    dynamicArea.innerHTML = "";
    destinationArea();
    if (!window.matchMedia("(max-width: 64rem)")) {
      navpanel.style.visibility = "hidden";
    } else {
      navpanel.style.visibility = "visible";
    }
  });

  crew.addEventListener("click", (e) => {
    dynamicArea.innerHTML = "";
    crewArea();
    if (!window.matchMedia("(max-width: 64rem)")) {
      navpanel.style.visibility = "hidden";
    } else {
      navpanel.style.visibility = "visible";
    }
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
          break;

        case "crew":
          let cName = aText(`${data.crew[i].name}`);
          title.appendChild(cName);
          let cPara = aText(`${data.crew[i].bio}`);
          body.appendChild(cPara);
          image.style.backgroundImage = `url('${data.crew[i].images.webp}')`;
          if (i === 0) {
            image.style.marginLeft = "26%";
          }
          let role = aText(`${data.crew[i].role}`);
          time.appendChild(role);
      }
    });
}

function removeData(title, bodyText, km, time) {
  title.innerHTML = "";
  bodyText.innerHTML = "";
  km.innerHTML = "";
  time.innerHTML = "";
}

function removeCrew(title, bodyText, time) {
  title.innerHTML = "";
  bodyText.innerHTML = "";
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
  buttonHandle('dest',
    clsNames,
    moon,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    km,
    time,
    0
  );
  buttonHandle('dest',
    clsNames,
    mars,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    km,
    time,
    1
  );
  buttonHandle('dest',
    clsNames,
    europa,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    km,
    time,
    2
  );
  buttonHandle('dest',
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
  let pageLayout = new PageLayout();

  body.className = "";
  body.classList.add("crew-bg");

  const crewDiv = document.createElement("div");
  crewDiv.classList.add("main");
  dynamicArea.appendChild(crewDiv);

  //header
  pageLayout.setHeader("02 MEET YOUR CREW", crewDiv, "main-header");
  //image
  pageLayout.setImage("main-image-crew", crewDiv);
  //divider
  const divider = document.createElement("span");
  divider.classList.add("main-divider-crew");
  crewDiv.appendChild(divider);
  // slider
  const sliderDiv = document.createElement("div");
  crewDiv.appendChild(sliderDiv);
  sliderDiv.classList.add("main-slider");
  const sc0 = document.createElement("a");
  const sc1 = document.createElement("a");
  const sc2 = document.createElement("a");
  const sc3 = document.createElement("a");
  const scArr = [sc0, sc1, sc2, sc3];

  for (i in scArr) {
    scArr[i].href = "#";
    sliderDiv.appendChild(scArr[i]);
    scArr[i].classList.add("main-slider-circle");
    if(scArr[i] !== sc0){
      scArr[i].classList.add("inactive");
    }
  }

  //subhead
  pageLayout.setSubhead("main-subhead", crewDiv);
  //title
  pageLayout.setTitle("main-title-crew", crewDiv);
  //para
  pageLayout.setPara("main-body", crewDiv);

  //set dfault
  
  loadData(
    "crew",
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    null,
    pageLayout.subhead,
    0
  );
  //sliders actions

  buttonHandle(
    "crew",
    scArr,
    sc0,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    null,
    pageLayout.subhead,
    0
  );
  buttonHandle(
    "crew",
    scArr,
    sc1,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    null,
    pageLayout.subhead,
    1
  );
  buttonHandle(
    "crew",
    scArr,
    sc2,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    null,
    pageLayout.subhead,
    2
  );
  buttonHandle(
    "crew",
    scArr,
    sc3,
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    null,
    pageLayout.subhead,
    3
  );
}

function aText(tx) {
  let aT = document.createTextNode(`${tx}`);
  return aT;
}

function buttonHandle(
  type,
  clsNames,
  btn,
  image,
  title,
  bodyText,
  km,
  time,
  i
) {
  btn.addEventListener("click", (e) => {
    for (c in clsNames) {
      if (!clsNames[c].classList.contains("inactive")) {
        clsNames[c].classList.add("inactive");
      }
    }
    btn.classList.remove("inactive");
    
    switch (type) {
      case "dest":
        setTimeout(removeData(title, bodyText, km, time), 100);
        setTimeout(loadData("dest", image, title, bodyText, km, time, i), 300);
        break
      case "crew":
        setTimeout(removeCrew(title, bodyText, time), 100);
        setTimeout(loadData("crew", image, title, bodyText, km, time, i), 300);
        break
    }
  });
}

class PageLayout {
  constructor(header, image, subhead, title, para) {
    this.header = document.createElement("p");
    this.image = document.createElement("div");
    this.subhead = document.createElement("h3");
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

  setSubhead(cls, baseDiv) {
    this.subhead.classList.add(`${cls}`);
    baseDiv.appendChild(this.subhead);
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
