const menuBtn = document.querySelector('.navbar-menu')
const closeBtn = document.querySelector('.navpanel-close')
const navpanel = document.querySelector('.navpanel')

menuBtn.addEventListener('click', e => {
    navpanel.style.visibility = 'visible';
})

closeBtn.addEventListener('click', e => {
    navpanel.style.visibility = 'hidden';
})
