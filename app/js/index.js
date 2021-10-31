const menuBtn = document.querySelector(".navbar-menu");
const closeBtn = document.querySelector(".navpanel-close");
const navpanel = document.querySelector(".navpanel");
const body = document.querySelector("body");
const dynamicArea = document.querySelector(".dynamic-area");
const home = document.querySelector(".navpanel-text-home");
const destination = document.querySelector(".navpanel-text-destination");
const crew = document.querySelector(".navpanel-text-crew");
const technology = document.querySelector(".navpanel-text-technology");

let bodyText = "";
bodyText = dynamicArea.innerHTML;
const size = window.matchMedia("(min-width: 64em)")
let currentPage = "home";

const btns = [home, destination, crew, technology]

function panelItems(type) {
  switch(type) {
    case 'none':
      menuBtn.classList.add('menu-open')
      // navpanel.classList.remove('close');
      navpanel.classList.add('open');
      break
    case 'm-close':
        menuBtn.classList.remove('menu-open')
        menuBtn.classList.add('menu-close')
        navpanel.classList.remove('open');
        navpanel.classList.add('close');
        break
        
    case 'm-open':
        menuBtn.classList.remove('menu-close')
        menuBtn.classList.add('menu-open')
        navpanel.classList.remove('close');
        navpanel.classList.add('open');
        break

    case 'btn-state':
      for(i in btns) {
        if (btns[i].classList.contains('state-active')) {
          btns[i].classList.remove('state-active')
        }
      }
  }
}

function panel() {

  menuBtn.addEventListener("click", (e) => {
    if(!menuBtn.classList.contains('menu-close') && !menuBtn.classList.contains('menu-open')) {
     panelItems('none')
    } else if (menuBtn.classList.contains('menu-close')){
      panelItems('m-open')
    } else if (menuBtn.classList.contains('menu-open')) {
      panelItems('m-close')
    }
  });

  home.addEventListener("click", (e) => {
    dynamicArea.innerHTML = bodyText;
    body.className = "";
    body.classList.add("bg-home");
    panelItems('m-close')
    panelItems('btn-state')
    setTimeout(home.classList.add('state-active'), 100)
    currentPage = "home";
  });

  destination.addEventListener("click", (e) => {
    dynamicArea.innerHTML = "";
    destinationArea();
    panelItems('m-close')
    panelItems('btn-state')
    setTimeout(destination.classList.add('state-active'), 100)
  });

  crew.addEventListener("click", (e) => {
    dynamicArea.innerHTML = "";
    crewArea()
    panelItems('m-close')
    panelItems('btn-state')
   setTimeout(crew.classList.add('state-active'), 100)
  });

  technology.addEventListener("click", (e) => {
    dynamicArea.innerHTML = "";
    techArea();
    panelItems('m-close')
    panelItems('btn-state')
    setTimeout(technology.classList.add('state-active'), 100)
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
          image.style.backgroundImage = `url('${data.destinations[i].images.webp}')`
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
          image.style.backgroundImage = `url('${data.crew[i].images.webp}')`
          if (i === 0) {
            image.style.marginLeft = "26%";
          }
          let role = aText(`${data.crew[i].role}`);
          time.appendChild(role);
          break;

      case "tech":
          let tName = aText(`${data.technology[i].name}`);
          title.appendChild(tName);
          let tPara = aText(`${data.technology[i].description}`);
          body.appendChild(tPara);
          if (size.matches) {
            console.log('test')
            image.style.backgroundImage = `url('${data.technology[i].images.portrait}')`
          } else {
            image.style.backgroundImage = `url('${data.technology[i].images.landscape}')`
          }
          break;
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

function removeTech(title, bodyText) {
  title.innerHTML = "";
  bodyText.innerHTML = "";
}

function destinationArea() {
  let pageLayout = new PageLayout();
  body.className = "";
  body.classList.add("bg-destination");
  currentPage = "destination";

  // main div
  const desDiv = document.createElement("div");
  desDiv.classList.add("destination");
  dynamicArea.appendChild(desDiv);

  //first half
  const fh = document.createElement("div")
  fh.classList.add("destination-fh")
  desDiv.appendChild(fh)

  // header
  pageLayout.setHeader("01 Pick your destination", fh, "destination-fh-header");

  // image
  pageLayout.setImage("destination-fh-image", fh);


  // second-half
  const sh = document.createElement("div")
  sh.classList.add("destination-sh")
  desDiv.appendChild(sh)

  // options
  const namesDiv = document.createElement("div");
  namesDiv.classList.add("destination-sh-options");
  const moon = document.createElement("a");
  const mars = document.createElement("a");
  const europa = document.createElement("a");
  const titan = document.createElement("a");

  const clsNames = [moon, mars, europa, titan];

  mars.classList.add("options-inactive");
  europa.classList.add("options-inactive");
  titan.classList.add("options-inactive");
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
  sh.appendChild(namesDiv);

  // title
  pageLayout.setTitle("destination-sh-title", sh);

  // body text
  pageLayout.setPara("destination-sh-para", sh);
  
  //divider
  const divider = document.createElement("span");
  divider.classList.add("destination-sh-divider");
  sh.appendChild(divider);
  
  //footer
  const footer = document.createElement('div')
  sh.appendChild(footer)
  footer.classList.add("destination-sh-footer")

  //footer-text
  const footerDistance = document.createElement('div')
  footer.appendChild(footerDistance)
  footerDistance.classList.add("destination-sh-footer-distance")
  
  // p
  const avgDist = document.createElement("p");
  avgDist.appendChild(aText("AVG. DISTANCE"));
  avgDist.classList.add("destination-sh-footer-distance-text");
  footerDistance.appendChild(avgDist);
  
  // h2
  const km = document.createElement("h2");
  km.classList.add("destination-sh-footer-distance-units");
  footerDistance.appendChild(km);
  
  //footer-text
  const footerTime = document.createElement('div')
  footer.appendChild(footerTime)
  footerTime.classList.add("destination-sh-footer-time")

  //p
  const est = document.createElement("p");
  est.appendChild(aText("EST. Travel Time"));
  est.classList.add("destination-sh-footer-time-text");
  footerTime.appendChild(est);
  
  // h2
  const time = document.createElement("h2");
  time.classList.add("destination-sh-footer-time-units");
  footerTime.appendChild(time);
  

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
  body.classList.add("bg-crew");

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
  pageLayout.setPara("main-body-crew", crewDiv);

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

function techArea() {
  let pageLayout = new PageLayout();
  body.className = "";
  body.classList.add("bg-tech");
  const techDiv = document.createElement("div");
    techDiv.classList.add("main");

  
  dynamicArea.appendChild(techDiv);

  //header
  pageLayout.setHeader("03 SPACE LAUNCH 101", techDiv,  "main-header")

  //image
  pageLayout.setImage('main-image-tech', techDiv)

  //buttons
  const btnDiv = document.createElement('div')
  techDiv.appendChild(btnDiv)
  btnDiv.classList.add('main-tech')

  const btn0 = document.createElement('a')
  const btn1 = document.createElement('a')
  const btn2 = document.createElement('a')

  const btnArr = [btn0, btn1, btn2]

  for (i in btnArr) {
    btnArr[i].href = "#";
    btnDiv.appendChild(btnArr[i]);
    btnArr[i].classList.add("main-tech-btn");
    if(btnArr[i] !== btn0) {
      btnArr[i].classList.add('btn-off')
    } 
  }
  btn0.appendChild(aText('1'))
  btn1.appendChild(aText('2'))
  btn2.appendChild(aText('3'))

  // text
  const txt = document.createElement('p')
  const pText = document.createTextNode('THE TERMINOLOGY...')
  txt.appendChild(pText)
  techDiv.appendChild(txt)

  //sub head
  txt.classList.add('main-subhead-tech')
  //title
  pageLayout.setTitle('main-title-tech', techDiv)
  //para
  pageLayout.setPara('main-body-tech', techDiv)

  // set default
  loadData(
    "tech",
    pageLayout.image,
    pageLayout.title,
    pageLayout.para,
    null,
    null,
    0
  );

  //butons 
  buttonHandle('tech', btnArr, btn0, pageLayout.image, pageLayout.title, pageLayout.para, null, null, 0)
  buttonHandle('tech', btnArr, btn1, pageLayout.image, pageLayout.title, pageLayout.para, null, null, 1)
  buttonHandle('tech', btnArr, btn2, pageLayout.image, pageLayout.title, pageLayout.para, null, null, 2)
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
    
    switch (type) {
      case "dest":
        for (d in clsNames) {
          if (!clsNames[d].classList.contains("options-inactive")) {
            clsNames[d].classList.add("options-inactive");
          }
        }
        btn.classList.remove("options-inactive");
        setTimeout(removeData(title, bodyText, km, time), 100);
        setTimeout(loadData("dest", image, title, bodyText, km, time, i), 300);
        break
      case "crew":
        for (c in clsNames) {
          if (!clsNames[c].classList.contains("inactive")) {
            clsNames[c].classList.add("inactive");
          }
        }
        btn.classList.remove("inactive");
        setTimeout(removeCrew(title, bodyText, time), 100);
        setTimeout(loadData("crew", image, title, bodyText, km, time, i), 300);
        break
        case "tech":
          for (t in clsNames) {
            if (!clsNames[t].classList.contains("btn-off")) {
              clsNames[t].classList.add("btn-off");
            }
          }
          btn.classList.remove("btn-off")
        setTimeout(removeTech(title, bodyText), 100);
        setTimeout(loadData("tech", image, title, bodyText, km, time, i), 300);
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

  setHeader(txt, baseDiv, cls) {
    let text = document.createTextNode(`${txt}`);
    this.header.appendChild(text);
    baseDiv.appendChild(this.header);
    this.header.classList.add(`${cls}`);
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
