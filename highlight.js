function highlight(cells) {
    cells.forEach(([y, x]) => {
        document.getElementById(`${y}-${x}`)
            .firstElementChild
            .classList
            .add('won');
    })
}