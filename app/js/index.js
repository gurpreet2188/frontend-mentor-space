const menuBtn = document.querySelector('.navbar-menu')
const closeBtn = document.querySelector('.navpanel-close')
const navpanel = document.querySelector('.navpanel')
const body = document.querySelector('body')
const dynamicArea = document.querySelector('.dynamic-area')
const home = document.querySelector('.navpanel-home')
const destination = document.querySelector('.navpanel-destination')
const crew = document.querySelector('.navpanel-crew')
const technology = document.querySelector('.navpanel-technology')


let bodyText = ''
bodyText = dynamicArea.innerHTML

let currentPage = 'home'

let jsonData

let destinationArray = []
let crewArray = []
let technologyArray= []

function panel() {
    menuBtn.addEventListener('click', e => {
        navpanel.style.visibility = 'visible'
    })

    closeBtn.addEventListener('click', e => {
        navpanel.style.visibility = 'hidden'
    })

    home.addEventListener('click', e => {
        dynamicArea.innerHTML = bodyText
        body.className = ''
        body.classList.add('background')
        navpanel.style.visibility = 'hidden'
        currentPage = 'home'
    })

    destination.addEventListener('click', e => {
        dynamicArea.innerHTML = ''
        destinationArea()
        navpanel.style.visibility = 'hidden'
    })
}

panel()


function loadData(type,image,title,body,km,time,i) {

    fetch("../../assets/data.json")
    .then(response => {
        return response.json()
    })
    .then(data => {
       switch(type) {
           case 'dest':
               image.style.backgroundImage = `url('.${data.destinations[i].images.webp}')`
               let tText = aText(`${data.destinations[i].name}`)
               title.appendChild(tText)
               let bText = aText(`${data.destinations[i].description}`)
                body.appendChild(bText)
                let avgDist = aText(`${data.destinations[i].distance}`)
                km.appendChild(avgDist)
                let est = aText(`${data.destinations[i].travel}`)
                time.appendChild(est)
       }
    })
    
}

function removeData (title,bodyText,km,time) {
    title.innerHTML = ''
    bodyText.innerHTML = ''
    km.innerHTML = ''
    time.innerHTML = ''
}

function destinationArea() {
   body.className = ''
   body.classList.add('destination-bg')
   currentPage = 'destination'
   

   // main div
    const mainDiv = document.createElement('div')
    mainDiv.classList.add('main')
    dynamicArea.appendChild(mainDiv)
   
   // header
   const headerText = document.createElement('p')
   let text = document.createTextNode('01 Pick your destination')
   headerText.appendChild(text)
   mainDiv.appendChild(headerText)
   headerText.classList.add('main-header')

   // image
   const image = document.createElement('div')
   
   image.classList.add('main-image')
   mainDiv.appendChild(image)

   // names
   const namesDiv = document.createElement('div')
   namesDiv.classList.add('main-names')
   const moon = document.createElement('a')
   const mars = document.createElement('a')
   const europa = document.createElement('a')
   const titan = document.createElement('a')
   let clsNames = [moon, mars, europa, titan]
//    moon.classList.add('inactive')
   mars.classList.add('inactive')
   europa.classList.add('inactive')
   titan.classList.add('inactive')
   moon.href = '#'
   mars.href = '#'
   europa.href = '#'
   titan.href = '#'

   moon.appendChild(aText('Moon'))
   mars.appendChild(aText('mars'))
   europa.appendChild(aText('europa'))
   titan.appendChild(aText('titan'))
   namesDiv.appendChild(moon)
   namesDiv.appendChild(mars)
   namesDiv.appendChild(europa)
   namesDiv.appendChild(titan)
   mainDiv.appendChild(namesDiv)

   // title
   const title = document.createElement('h1')
   title.classList.add('main-title')
   mainDiv.appendChild(title)
   // body text
   const bodyText = document.createElement('p')
   bodyText.classList.add('main-body')
   mainDiv.appendChild(bodyText)
   //divider
   const divider = document.createElement('span')
   divider.classList.add('main-divider')
   mainDiv.appendChild(divider)
   // p
   const avgDist = document.createElement('p')
    avgDist.appendChild(aText('AVG. DISTANCE'))
    avgDist.classList.add('main-avg')
   mainDiv.appendChild(avgDist)
   // h2
   const km = document.createElement('h2')
   km.classList.add('main-km')
   mainDiv.appendChild(km)

   //p
   const est = document.createElement('p')
   est.appendChild(aText('EST. Travel Time'))
   est.classList.add('main-est')
    mainDiv.appendChild(est)
   // h2
   const time = document.createElement('h2')
   time.classList.add('main-time')
   mainDiv.appendChild(time)

//    moon.classList.add('active')
   loadData('dest', image, title, bodyText, km, time, 0)

   // button handling
   moon.addEventListener('click', e => {
    for(i in clsNames) {
        if(!clsNames[i].classList.contains('inactive')) {
            clsNames[i].classList.add('inactive')
        }
    }
    moon.classList.remove('inactive')
    removeData(title,bodyText,km,time)
    loadData('dest', image, title, bodyText, km, time, 0)
   })
   mars.addEventListener('click', e => {
    for(i in clsNames) {
        if(!clsNames[i].classList.contains('inactive')) {
            clsNames[i].classList.add('inactive')
        }
    }
    mars.classList.remove('inactive')
    removeData(title,bodyText,km,time)
    loadData('dest', image, title, bodyText, km, time, 1)
   })
  europa.addEventListener('click', e => {
    for(i in clsNames) {
        if(!clsNames[i].classList.contains('inactive')) {
            clsNames[i].classList.add('inactive')
        }
    }
    europa.classList.remove('inactive')
    removeData(title,bodyText,km,time)
    loadData('dest', image, title, bodyText, km, time, 2)
   })
   titan.addEventListener('click', e => {
    for(i in clsNames) {
        if(!clsNames[i].classList.contains('inactive')) {
            clsNames[i].classList.add('inactive')
        }
    }
    titan.classList.remove('inactive')
    removeData(title,bodyText,km,time)
    loadData('dest', image, title, bodyText, km, time, 3)
   })
}

function aText (tx) {
    let aT = document.createTextNode(`${tx}`)
    return aT
}






