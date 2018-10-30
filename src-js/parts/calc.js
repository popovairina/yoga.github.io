function calc() {
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
        }
        total = (daysSum + personsSum) * 4000;
        if (restDays.value == '' || personsSum == '' || daysSum == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * place.options[place.selectedIndex].value;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        if (Number.isInteger(daysSum) == false) {
            this.value = '';
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
}

export default calc;