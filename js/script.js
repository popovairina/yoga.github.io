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
   let deadline = '2018-10-23';

   function getTimeRemaining(endTime) {
       let t = Date.parse(endTime) - Date.parse(new Date()),
           seconds = Math.floor((t/1000) % 60),
           minutes = Math.floor((t/1000/60) % 60),
           hours = Math.floor((t/1000/60/60));
       if (hours.toString().length == 1) { // Это как-то можно оптимизировать,
           hours = '0' + hours;            // чтоб не писать 3 условия?
       }
       if (minutes.toString().length == 1) {
           minutes = '0' + minutes;
       }
       if (seconds.toString().length == 1) {
           seconds = '0' + seconds;
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
        if (target && target.tagName == 'A') { // кликаем на a ?

            let count = 0;
            let speed = 100;

            let id = target.getAttribute('href');
            let section = document.querySelector(id);
            let top = section.offsetTop;
            let scrollBy = (top - window.scrollY - headerHeight) / speed;

            requestAnimationFrame(function scrollWindow(){
                if (count++ < speed) {
                    window.scrollBy(0, scrollBy);
                    requestAnimationFrame(scrollWindow);
                }
            });
        }
    });


});