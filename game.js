var game = new Game();

game.createField();

function Game() {
    this.log = [];
    this.PlayerTurn = 1;
    this.status = 0;
    this.createField = function() {

        document.body.style.textAlign = 'center';
        document.body.style.marginTop = '100px';
        createElement('h1','x/o game');
        createElement('br');

        for ( var i = 0; i <= 8; i++ ){

            if ( i == 3 || i == 6 ) {
                createElement('br');
            }
            var element = createElement('div', '&nbsp;', i);
            getStyle(element);
        }
        function createElement(tag, text, i) {

            var element = document.createElement(tag);
            element.setAttribute('id', i);
            element.innerHTML = text;
            element.onclick = action;
            document.body.appendChild(element);
            return element;
        }
        function getStyle(block) {
            block.style.width = '100px';
            block.style.height = '100px';
            block.style.border = 'solid';
            block.style.borderColor = 'gray';
            block.style.display = 'inline-block';
            block.style.fontSize = '80px';
        }
    };
}
function action() {
    if(this.nodeName == 'DIV'){
        var turn = step(this);
        this.innerHTML = turn;
        var toLog = {
            id: this.id,
            value: turn
        };
        game.log.push(toLog);
        console.log(game);
        game.status++;
        checkIt()
    }
}
function step(element) {
    if (game.PlayerTurn == 1){
        game.PlayerTurn = 2;
        element.onclick = null;
        return 'x'
    }
    game.PlayerTurn = 1;
    element.onclick = null;
    return 'o'
}
function checkIt() {
    if(
        (document.getElementById('0').innerHTML == 'x' && document.getElementById('1').innerHTML == 'x' && document.getElementById('2').innerHTML == 'x')||
        (document.getElementById('3').innerHTML == 'x' && document.getElementById('4').innerHTML == 'x' && document.getElementById('5').innerHTML == 'x')||
        (document.getElementById('6').innerHTML == 'x' && document.getElementById('7').innerHTML == 'x' && document.getElementById('8').innerHTML == 'x')||
        (document.getElementById('0').innerHTML == 'x' && document.getElementById('4').innerHTML == 'x' && document.getElementById('8').innerHTML == 'x')||
        (document.getElementById('2').innerHTML == 'x' && document.getElementById('4').innerHTML == 'x' && document.getElementById('6').innerHTML == 'x')||
        (document.getElementById('0').innerHTML == 'x' && document.getElementById('3').innerHTML == 'x' && document.getElementById('6').innerHTML == 'x')||
        (document.getElementById('1').innerHTML == 'x' && document.getElementById('4').innerHTML == 'x' && document.getElementById('7').innerHTML == 'x')||
        (document.getElementById('2').innerHTML == 'x' && document.getElementById('5').innerHTML == 'x' && document.getElementById('8').innerHTML == 'x')
    ){
        alert('Player 1 WIN!');

    }if(
        (document.getElementById('0').innerHTML == 'o' && document.getElementById('1').innerHTML == 'o' && document.getElementById('2').innerHTML == 'o')||
        (document.getElementById('3').innerHTML == 'o' && document.getElementById('4').innerHTML == 'o' && document.getElementById('5').innerHTML == 'o')||
        (document.getElementById('6').innerHTML == 'o' && document.getElementById('7').innerHTML == 'o' && document.getElementById('8').innerHTML == 'o')||
        (document.getElementById('0').innerHTML == 'o' && document.getElementById('4').innerHTML == 'o' && document.getElementById('8').innerHTML == 'o')||
        (document.getElementById('2').innerHTML == 'o' && document.getElementById('4').innerHTML == 'o' && document.getElementById('6').innerHTML == 'o')||
        (document.getElementById('0').innerHTML == 'o' && document.getElementById('3').innerHTML == 'o' && document.getElementById('6').innerHTML == 'x')||
        (document.getElementById('1').innerHTML == 'o' && document.getElementById('4').innerHTML == 'o' && document.getElementById('7').innerHTML == 'x')||
        (document.getElementById('2').innerHTML == 'o' && document.getElementById('5').innerHTML == 'o' && document.getElementById('8').innerHTML == 'x')
    ){
        alert('Player 2 WIN!');

    }
    if(game.status == 9){
        alert('Friendship WIN!');

    }
}






