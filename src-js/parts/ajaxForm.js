function ajaxForm() {
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
}

export default ajaxForm;