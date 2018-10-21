let age = document.getElementById('age');
function showUser (name) {
    alert(`Пользователь ${name[0]} ${name[1]}, его возраст: ${this.value}`);
}
showUser.call(age, ['Иванов', 'Иван']);