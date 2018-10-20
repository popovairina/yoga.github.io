document.addEventListener('DOMContentLoaded', function() {
   'use strict';

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
});