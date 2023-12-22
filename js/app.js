// ------------------- grinchen del -------------------

const grinchenFeature = document.querySelector('.grinch-containter');
const grinchenimg = document.querySelector('.grinch');

grinchenFeature.addEventListener('click', () => {
    grinchenimg.classList.remove('display-none');
    grinchenimg.classList.add('start-animation');
    setTimeout(greeting, 4000);
    console.log('click');
})

document.addEventListener('keydown', (e) => {
    //clickGrinch = document.addEventListener('click', )
    if (e.key === 'Escape') {
        console.log('esc')
        grinchenimg.classList.add('display-none');
        document.querySelector('.greeting1').classList.add('display-none');
    }
});

function greeting() {
    document.querySelector('.greeting1').classList.remove('display-none');
}

// ------------------- grinchen slut -------------------