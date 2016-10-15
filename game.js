var game = new Game();

function Game() {
    createField();
}

function createField() {
    document.body.style.textAlign = 'center';
    document.body.style.marginTop = '100px';
    createElement('h1','x/o game');
    createElement('br','');

    for ( var i = 1; i <= 9; i++ ){

        if ( i == 4 || i == 7 ) {
            document.write('<br>')
        }
        var element = createElement('div', '&nbsp;');
        getStyle(element);
    }
}

function createElement(tag, text) {
    var element = document.createElement(tag);
    element.innerHTML = text;
    document.body.appendChild(element);
    return element;
}
function getStyle(block) {
    block.style.width = '100px';
    block.style.height = '100px';
    block.style.border = 'solid';
    block.style.borderColor = 'gray';
    block.style.display = 'inline-block';
}