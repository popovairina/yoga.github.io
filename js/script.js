document.addEventListener('DOMContentLoaded', function() {
   'use strict';

   // Tabs
   workTabs('.info-header-tab', '.info-header', '.info-tabcontent');

   function workTabs (tabSelector, tabWrapSelector, tabContentSelector) {
       let tab = document.querySelectorAll(tabSelector),
           tabWrap = document.querySelector(tabWrapSelector),
           tabContent = document.querySelectorAll(tabContentSelector);

       hideTabContent(1);

       tabWrap.addEventListener('click', function(e) {
           let target = e.target;
           if (target && target.matches(tabSelector)) {
               for (let i = 0; i < tab.length; i++) {
                   if (target == tab[i]) {
                       hideTabContent(0);
                       showTabContent(i);
                       break;
                   }
               }
           }
       });

       function hideTabContent(a) {
           for (let i = a; i < tabContent.length; i++) {
               tabContent[i].classList.remove('show');
               tabContent[i].classList.add('hide');
           }
       }

       function showTabContent(b) {
           if (tabContent[b].classList.contains('hide')) {
               tabContent[b].classList.remove('hide');
               tabContent[b].classList.add('show');
           }
       }
   }

   // Timer
   let deadline = '2018-10-27';

   function getTimeRemaining(endTime) {
       let t = Date.parse(endTime) - Date.parse(new Date()),
           seconds = Math.floor((t/1000) % 60),
           minutes = Math.floor((t/1000/60) % 60),
           hours = Math.floor((t/1000/60/60));
       if (hours.toString().length == 1) {
           hours = `0${hours}`;
       }
       if (minutes.toString().length == 1) {
           minutes = `0${minutes}`;
       }
       if (seconds.toString().length == 1) {
           seconds = `0${seconds}`;
       }
       return {
         'total' : t,
         'hours' : hours,
         'minutes' : minutes,
         'seconds' : seconds
       };
   }

   setClock('timer', deadline);

   function setClock(id, endTime) {
       let timer = document.getElementById(id),
           hours = timer.querySelector('.hours'),
           minutes = timer.querySelector('.minutes'),
           seconds = timer.querySelector('.seconds'),
           timeInterval = setInterval(updateClock, 1000);

       function updateClock() {
           let t = getTimeRemaining(endTime);
           hours.textContent = t.hours;
           minutes.textContent = t.minutes;
           seconds.textContent = t.seconds;

           if (t.total <= 0) {
               clearInterval(timeInterval);
               hours.textContent = '00';
               minutes.textContent = '00';
               seconds.textContent = '00';
           }
       }
   }

   // Scroll

   let nav = document.querySelector('header ul'),
       headerHeight = document.querySelector('header').offsetHeight;

   nav.addEventListener('click', function(e) {
       e.preventDefault();
       let target = e.target;
       if (target && target.tagName == 'A') {
           let id = target.getAttribute('href'),
               section = document.querySelector(id),
               top = section.offsetTop;
           window.scrollTo(0, top - headerHeight);
       }
   });

    // Modal

   let moreBtn = document.querySelector('.more'),
       overlay = document.querySelector('.overlay'),
       close = document.querySelector('.popup-close'),
       tabBtn = document.querySelectorAll('.description-btn');

   moreBtn.addEventListener('click', function() {
       overlay.style.display = 'block';
       this.classList.add('more-splash');
       document.body.style.overflow = 'hidden';
   });

   close.addEventListener('click', function() {
       overlay.style.display = 'none';
       moreBtn.classList.remove('more-splash');
       document.body.style.overflow = '';
   });

   tabBtn.forEach(function(item) {
       item.addEventListener('click', function() {
           overlay.style.display = 'block';
           this.classList.add('more-splash');
       });
   });

   // Form

    let message = {
      loading: 'Загрузка...',
      success: 'Спасибо, с вами скоро свяжутся!',
      failure: 'Что-то пошло не так'
    };

    let formModal = document.querySelector('.main-form'),
        formContact = document.getElementById('form'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    sendForm(formModal);
    sendForm(formContact);

    function sendForm (form) {
        let input = form.querySelectorAll('input');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            form.appendChild(statusMessage);
            let formData = new FormData(form);

            function postData(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                    let obj = {};
                    data.forEach(function(value, key) {
                        obj[key] = value;
                    });

                    let json = JSON.stringify(obj);
                    request.send(json);

                    request.onreadystatechange = function() {
                        if (request.readyState < 4) {
                            resolve()
                        } else if (request.readyState === 4) {
                            if (request.status === 200) {
                                resolve()
                            } else {
                                reject()
                            }
                        }
                    }
                });
            }

            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput);

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }
        });
    }

    // Slider

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

    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function(e) {
       personsSum = +this.value;
       if (Number.isInteger(personsSum) == false) {
           this.value = '';
           alert('Введите целое значение');
       }
       total = (daysSum + personsSum) * 4000;
       if (restDays.value == '' || personsSum == '' || daysSum == '') {
           totalValue.innerHTML = 0;
       } else {
           let a = total;
           totalValue.innerHTML = a * this.options[this.selectedIndex].value;
       }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        if (Number.isInteger(daysSum) == false) {
            this.value = '';
            alert('Введите целое значение');
        }
        total = (daysSum + personsSum) * 4000;

        if (persons.value == '' || daysSum == '' || personsSum == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * place.options[place.selectedIndex].value;
        }
    });

    place.addEventListener('change', function () {
       if (restDays.value == 0 || persons.value == 0 || restDays.value == '' || persons.value == '') {
           totalValue.innerHTML = 0;
       } else {
           let a = total;
           totalValue.innerHTML = a * place.options[place.selectedIndex].value;
       }
    });


});