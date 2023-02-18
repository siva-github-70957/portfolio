const ulist = document.querySelector('.unorderlist');
const aboutpage = document.querySelector('.about-page');
const workpage = document.querySelector('.work-page');
const homepage = document.querySelector('.navbar');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const presshere = document.querySelector('.presshere');

////////// stoping Wiggle effect /////////////////

presshere.addEventListener('click', () => {
    document.querySelector('.presshere').innerHTML = 'Pressed';
    document.querySelector('.make-wiggler').classList.remove('make-wiggler');
    document.querySelector('.make-wigglel').classList.remove('make-wigglel');
    document.querySelectorAll('.slide').forEach((e) => {
        e.classList.remove('make-blur');
    })
})

//////////////////////////////////////////////////

//////////////// godown button implementation //////////
document.querySelector('.godown1').addEventListener('click', () => {
    aboutpage.scrollIntoView({ behavior: 'smooth' });
})

document.querySelector('.godown2').addEventListener('click', () => {
    workpage.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.gototop1').addEventListener('click', () => {
    homepage.scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.gototop2').addEventListener('click', () => {
    homepage.scrollIntoView({ behavior: 'smooth' });
});


ulist.addEventListener('click', (e) => {
    const value = e.target.innerHTML;
    if (value === 'About') {
        aboutpage.scrollIntoView({ behavior: 'smooth' });
    }
    else if (value === 'Work') {
        workpage.scrollIntoView({ behavior: 'smooth' });
    }
});



tabsContainer.addEventListener('click',
    function (e) {
        const clicked = e.target.closest('.operations__tab');
        // console.log(clicked);

        // Guard clause
        if (!clicked) return;

        // Remove Active Classes
        tabs.forEach(t => t.classList.remove('operations__tab--active'));
        tabsContent.forEach(t => t.classList.remove('operations__content--active'));

        // Activate tab
        clicked.classList.add('operations__tab--active');

        //Activate content area
        document.querySelector(`.operations__content--${clicked.dataset.tab}`)
            .classList.add('operations__content--active');
    });


/////////// Slider


const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));

        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    // Next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();

        activateDot(0);
    };
    init();

    // Event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();