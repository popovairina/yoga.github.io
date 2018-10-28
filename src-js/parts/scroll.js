function scroll() {
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
}

export default scroll;