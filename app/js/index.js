const logo = document.querySelector(".navbar-logo")
const menuBtn = document.querySelector(".navbar-menu");
const closeBtn = document.querySelector(".navpanel-close");
const navpanel = document.querySelector(".navpanel");
const exploreBtn = document.querySelector(".home-explore-btn")
const body = document.querySelector("body");
const dynamicArea = document.querySelector(".dynamic-area");
const home = document.querySelector(".navpanel-text-home");
const destination = document.querySelector(".navpanel-text-destination");
const crew = document.querySelector(".navpanel-text-crew");
const technology = document.querySelector(".navpanel-text-technology");

const bodyText = dynamicArea.innerHTML;
const size = window.matchMedia("(min-width: 64em)")
let currentPage = "home";
let currentSlide = 0

const btns = [home, destination, crew, technology]

function logoBtn() {
  logo.addEventListener('click', ()=> {
    dynamicArea.innerHTML = bodyText;
    body.className = "";
    body.classList.add("bg-home");
    panelItems('btn-state')
    home.classList.add('state-active')
    currentPage = "home";
  })
}

logoBtn()
function panelItems(type) {
  switch (type) {
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
      for (i in btns) {
        if (btns[i].classList.contains('state-active')) {
          btns[i].classList.remove('state-active')
        }
      }
  }
}

function explore() {
    const exploreDest = () => {
      dynamicArea.innerHTML = "";
      destinationArea();
      // panelItems('m-close')
      panelItems('btn-state')
      destination.classList.add('state-active')
    }
    const exploreCrew = () =>{
      dynamicArea.innerHTML = "";
      crewArea()
      // panelItems('m-close')
      panelItems('btn-state')
      crew.classList.add('state-active')
    }
    const exploreTech = () =>{
      dynamicArea.innerHTML = "";
      techArea();
      // panelItems('m-close')
      panelItems('btn-state')
      technology.classList.add('state-active')
    }

    
    exploreBtn.addEventListener("click", (e) => {
      let randNum = Math.floor(Math.random() * 3);
      console.log(randNum)
      if(randNum === 0) {exploreDest()}
      if(randNum === 1) {exploreCrew()}
      if(randNum === 2) {exploreTech()}

    })

}

explore()

function panel() {

  menuBtn.addEventListener("click", (e) => {
    if (!menuBtn.classList.contains('menu-close') && !menuBtn.classList.contains('menu-open')) {
      panelItems('none')
    } else if (menuBtn.classList.contains('menu-close')) {
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
    home.classList.add('state-active')
    currentPage = "home";
  });

  destination.addEventListener("click", (e) => {
    dynamicArea.innerHTML = "";
    destinationArea();
    panelItems('m-close')
    panelItems('btn-state')
    destination.classList.add('state-active')
  });

  crew.addEventListener("click", (e) => {
    dynamicArea.innerHTML = "";
    crewArea()
    panelItems('m-close')
    panelItems('btn-state')
    crew.classList.add('state-active')
  });

  technology.addEventListener("click", (e) => {
    dynamicArea.innerHTML = "";
    techArea();
    panelItems('m-close')
    panelItems('btn-state')
    technology.classList.add('state-active')
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

  dynamicArea.style.position = "relative"
  dynamicArea.style.bottom = "auto"

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

  moon.classList.add("options-active", "options-hover");
  mars.classList.add("options-inactive","options-hover");
  europa.classList.add("options-inactive", "options-hover");
  titan.classList.add("options-inactive", "options-hover");
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

  const sizeM = window.matchMedia("(min-width: 40em)")

  const crewDiv = document.createElement("div");
  crewDiv.classList.add("crew");
  dynamicArea.appendChild(crewDiv);

  const fh = document.createElement("div")
  fh.classList.add("crew-fh")
  crewDiv.appendChild(fh)

  const sh = document.createElement("div")
  sh.classList.add("crew-sh")
  crewDiv.appendChild(sh)

  //header
  pageLayout.setHeader("02 MEET YOUR CREW", fh, "crew-fh-header");

  //image & divider

  if (size.matches) {
    pageLayout.setImage("crew-sh-image", sh);
  } else {
    pageLayout.setImage("crew-fh-image", fh);
  }

  // slider
  const sliderDiv = document.createElement("div");
  fh.appendChild(sliderDiv);
  sliderDiv.classList.add("crew-fh-options");

  const sc0 = document.createElement("a");
  const sc1 = document.createElement("a");
  const sc2 = document.createElement("a");
  const sc3 = document.createElement("a");
  const scArr = [sc0, sc1, sc2, sc3];

  for (i in scArr) {
    scArr[i].href = "#";
    sliderDiv.appendChild(scArr[i]);
    scArr[i].classList.add("crew-fh-options-circle");
    if (scArr[i] !== sc0) {
      scArr[i].classList.add("dots-hover", "dots-inactive");
    }else {scArr[i].classList.add("dots-hover", "dots-active");}
  }

  //subhead
  pageLayout.setSubhead("crew-fh-subheader", fh);
  //title
  pageLayout.setTitle("crew-fh-title", fh);
  //para
  pageLayout.setPara("crew-fh-para", fh);

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
  swipe(pageLayout.image, pageLayout.title, pageLayout.para, pageLayout.subhead, scArr)

  // currentSlide = 0
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

  // console.log(currentSlide)
}

function techArea() {
  let pageLayout = new PageLayout();
  body.className = "";
  body.classList.add("bg-tech");
  const techDiv = document.createElement("div");
  techDiv.classList.add("technology");

  dynamicArea.style.position = "relative"
  dynamicArea.style.bottom = "auto"
  dynamicArea.appendChild(techDiv);

  const fh = document.createElement('div')
  techDiv.appendChild(fh)
  fh.classList.add('technology-fh')

  const sh = document.createElement('div')
  techDiv.appendChild(sh)
  sh.classList.add('technology-sh')

  //header
  pageLayout.setHeader("03 SPACE LAUNCH 101", fh, "technology-fh-header")

  //image
  if(size.matches) {
    pageLayout.setImage('technology-sh-image', sh)
  } else {
    pageLayout.setImage('technology-fh-image', fh)
  }

  const ot = document.createElement('div')
  fh.appendChild(ot)
  ot.classList.add('technology-fh-ot')

  //buttons
  const btnDiv = document.createElement('div')
  ot.appendChild(btnDiv)
  btnDiv.classList.add('technology-fh-ot-options')

  const btn0 = document.createElement('a')
  const btn1 = document.createElement('a')
  const btn2 = document.createElement('a')

  const btnArr = [btn0, btn1, btn2]

  for (i in btnArr) {
    btnArr[i].href = "#";
    btnDiv.appendChild(btnArr[i]);
    btnArr[i].classList.add("technology-fh-ot-options-btn");
    if (btnArr[i] !== btn0) {
      btnArr[i].classList.add('btnoff')
    }else {
      btnArr[i].classList.add('btnon')
    }
  }
  btn0.appendChild(aText('1'))
  btn1.appendChild(aText('2'))
  btn2.appendChild(aText('3'))

  const text = document.createElement('div')
  ot.appendChild(text)
  text.classList.add('technology-fh-ot-text')

  // text
  const txt = document.createElement('p')
  const pText = document.createTextNode('THE TERMINOLOGY')
  txt.appendChild(pText)
  text.appendChild(txt)

  //sub head
  txt.classList.add('technology-fh-ot-text-subheader')
  //title
  pageLayout.setTitle('technology-fh-ot-text-title', text)
  //para
  pageLayout.setPara('technology-fh-ot-text-para', text)

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
  i) {

  btn.addEventListener("click", (e) => {

    switch (type) {
      case "dest":
        for (d in clsNames) {
          if (clsNames[d].classList.contains("options-active")) {
            clsNames[d].classList.replace("options-active", "options-inactive");
          }
        }
        btn.classList.replace("options-inactive", "options-active")
        removeData(title, bodyText, km, time)
        loadData("dest", image, title, bodyText, km, time, i);
        break
      case "crew":
        // console.log(currentSlide)
        for (c in clsNames) {
          if (!clsNames[c].classList.contains("inactive")) {
            clsNames[c].classList.add("inactive");
          }
        }
        btn.classList.remove("inactive");
        currentSlide = i
        removeAnimation(time, image, title, bodyText)
        removeCrew(title, bodyText, time);
        loadData("crew", image, title, bodyText, km, time, i);
        addAnimation(time, image, title, bodyText)
        console.log(currentSlide)
        setTimeout(() => { removeCls(time, image, title, bodyText) }, 400)
        break
      case "tech":
        for (t in clsNames) {
          if (clsNames[t].classList.contains("btnon")) {
            clsNames[t].classList.replace("btnon", "btnoff");
          }
        }
        btn.classList.replace("btnoff", "btnon")
        removeTech(title, bodyText)
        loadData("tech", image, title, bodyText, km, time, i)
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

function swipe(elm, title, bodyText, time, arr) {
  let tStartX
  // let tStartY
  let tEndX
  // let tEndY
  console.log(currentSlide)
  elm.addEventListener('touchstart', (e) => {
    tStartX = e.changedTouches[0].screenX
    tStartY = e.changedTouches[0].screenY
  })

  elm.addEventListener('touchend', (e) => {
    tEndX = e.changedTouches[0].screenX;
    tEndY = e.changedTouches[0].screenY;

    console.log(Math.abs(tStartX))
    console.log(Math.abs(tEndY))

    dX = tEndX - tStartX
    dY = tEndY - tStartY

    if (Math.abs(dX) > Math.abs(dY)) {
      console.log(currentSlide)

      if (dX < 0) {
        if (currentSlide >= 0 && currentSlide <= 2) {
          currentSlide++
        } else {
          currentSlide = 0
        }
        for (c in arr) {
          if (!arr[c].classList.contains("inactive")) {
            arr[c].classList.add("inactive");
          }
        }
        arr[currentSlide].classList.remove("inactive");

        removeAnimation(time, elm, title, bodyText)
        removeCrew(title, bodyText, time);
        loadData("crew", elm, title, bodyText, null, time, currentSlide);
        addAnimation(time, elm, title, bodyText)
        setTimeout(() => { removeCls(time, elm, title, bodyText) }, 320)
      } else {

        if (currentSlide >= 1 && currentSlide <= 3) {
          currentSlide--
        } else {
          currentSlide = 3
        }
        for (c in arr) {
          if (!arr[c].classList.contains("inactive")) {
            arr[c].classList.add("inactive");
          }
        }
        arr[currentSlide].classList.remove("inactive");

        removeAnimation(time, elm, title, bodyText)
        removeCrew(title, bodyText, time);
        loadData("crew", elm, title, bodyText, null, time, currentSlide);
        addAnimation(time, elm, title, bodyText)
        setTimeout(() => { removeCls(time, elm, title, bodyText) }, 320)
      }
    }
  })

}

function removeAnimation(header, image, title, para) {
  arr = [header, image, title, para]

  for (i in arr) {
    if (arr[i].classList.contains("item-add")) {
      arr[i].classList.remove("item-add")
    }
    arr[i].classList.add("item-remove")
  }

}

function addAnimation(header, image, title, para) {
  arr = [header, image, title, para]

  for (i in arr) {
    if (arr[i].classList.contains("item-remove")) {
      arr[i].classList.remove("item-remove")
    }
    arr[i].classList.add("item-add")
  }
}

function removeCls(header, image, title, para) {
  arr = [header, image, title, para]

  for (i in arr) {
    // arr[i].classList.remove("item-remove")
    arr[i].classList.remove("item-add")
    arr[i].classList.remove("swipe-right-add")
    arr[i].classList.remove("swipe-left-add")

  }

}
