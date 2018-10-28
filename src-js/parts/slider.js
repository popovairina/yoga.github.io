function slider() {
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.arrow-left'),
        next = document.querySelector('.arrow-right'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function switchSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        switchSlides(-1);
    });

    next.addEventListener('click', function () {
        switchSlides(1);
    });

    dotsWrap.addEventListener('click', function (e) {
        let target = e.target;
        for (let i = 1; i < dots.length + 1; i++) {
            if (target.classList.contains('dot') && target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });
}

export default slider;