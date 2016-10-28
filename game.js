(function () {
    function Game() {}
    Game.prototype.createContainer = function ( lineSize ) {
        var container = document.createElement( 'div' );
        var sizeInPx = lineSize + 'px';
        container.style.width = sizeInPx;
        container.style.height = sizeInPx;
        container.style.margin = 'auto';
        return container
    };
    Game.prototype.createFieldBlocks = function ( cells, lineSize, fieldBlocks ) {
        for( var y = 0; y <= cells - 1; y++ ){
            var line = [];
            for ( var x = 0; x <= cells - 1; x++ ){
                var block = {
                    element: document.createElement( 'div' ),
                    y: y,
                    x: x,
                    value: ''
                };
                block.element.y = y;
                block.element.x = x;
                Game.prototype.setStyleForBlocks( cells, lineSize, block );
                line.push( block );
            }
            fieldBlocks.push( line );
        }
    };
    Game.prototype.setStyleForBlocks = function ( cells, lineSize, block ) {
        var borderSize = 1;
        var blockStyle = block.element.style;
        var size = ( lineSize / cells ) - borderSize * 2 + 'px';
        blockStyle.border = 'solid ' + borderSize + 'px';
        blockStyle.borderColor = 'gray';
        blockStyle.width = size;
        blockStyle.height = size;
        blockStyle.float = 'left';
        blockStyle.fontSize = lineSize/cells + 'px';
    };
    Game.prototype.createField = function ( cells, lineSize, fieldBlocks, target ) {
        var container = Game.prototype.createContainer( lineSize );

        if( arguments.length == 3 ){
            target = document.body;
        }
        Game.prototype.createFieldBlocks( cells, lineSize, fieldBlocks );
        for( var y = 0; y <= fieldBlocks.length - 1; y++ ){
            for( var x = 0; x <= fieldBlocks.length - 1; x++ ){
                container.appendChild( fieldBlocks[y][x].element )
            }
        }
        target.appendChild( container );
    };
    Game.prototype.setActionOnFieldBlocks = function ( fieldBlocks, action ) {
        for( var y = 0; y <= fieldBlocks.length - 1; y++ ){
            for( var x = 0; x <= fieldBlocks.length - 1; x++ ){
               fieldBlocks[y][x].element.onclick = action
            }
        }
    };
    Game.prototype.clearDocumentBody = function () {
        document.body.innerHTML = '';
    };

    function XoGame() {
        this.clearDocumentBody();
            var gameField, vm, options;
            vm = this;
            gameField = [];
            options = {
                startScreen: {},
                stepCounter: 0,
                result: '',
                playerStep: 1,
                lineSize: Math.floor( window.innerWidth / 3 )
            };
        createStartScreen( 3, 10 );
        function createStartScreen( minField, maxField ){
            createTopic();
            createSelectorOfFieldSize( minField, maxField );
            createStartButton()
        }
        function start() {
            takeValueOfFieldSizeSelector();
            vm.clearDocumentBody();
            vm.createField( options.startScreen.selectedCells, options.lineSize, gameField );
            vm.setActionOnFieldBlocks( gameField, action );
            createStatusBar()
        }

        function createTopic() {
            document.body.style.textAlign = 'center';
            document.body.style.marginTop = '80px';
            options.startScreen.topic = document.createElement( 'h1' );
            document.body.appendChild( options.startScreen.topic );
            options.startScreen.topic.innerHTML = 'Select size of field';
        }
        function createSelectorOfFieldSize( minField, maxField ) {
            options.startScreen.numberOfCells = document.createElement('select');
            options.startScreen.numberOfCells.style.marginRight = '10px';
            options.startScreen.numberOfCells.id = 'numberOfCellsId';

            for( var i = minField; i <= maxField; i++ ){
                var optionElement = document.createElement( 'option' );
                options.startScreen.numberOfCells.appendChild( optionElement );
                optionElement.value = i;
                optionElement.text = i + 'x' + i;
            }
            document.body.appendChild( options.startScreen.numberOfCells );
        }
        function createStartButton() {
            options.startScreen.startButton = document.createElement( 'button' );
            document.body.appendChild( options.startScreen.startButton );
            options.startScreen.startButton.innerHTML = 'Start game';
            options.startScreen.startButton.onclick = start;
        }

        function takeValueOfFieldSizeSelector() {
            var target = document.getElementById("numberOfCellsId");
            options.startScreen.selectedCells =  target.options[target.selectedIndex].value;
        }
        function createStatusBar() {
            options.bar = document.createElement( 'h1' );
            document.body.appendChild( options.bar );
            turnStatusInfo();
            options.bar.style.color = 'red'
        }
        function action() {
            if( this.nodeName == 'DIV' ){
                options.stepCounter++;
                gameField[this.y][this.x].element.innerHTML = turnPlayerStep();
                gameField[this.y][this.x].value = this.innerHTML;
                turnStatusInfo();
                this.onclick = null;
                checkGame();
            }
            function turnPlayerStep() {
                if( options.playerStep == 1 ){
                    options.playerStep = 2;
                    options.bar.style.color = 'blue';
                    return 'x';
                }else {
                    options.playerStep = 1;
                    options.bar.style.color = 'red';
                    return 'o';
                }
            }
        }
        function turnStatusInfo () {
            options.bar.innerHTML = 'Player ' + options.playerStep + ' turn'
        }
        function checkVertical ( player ) {
            var count = 0;
            for( var i = 0; i <= options.startScreen.selectedCells - 1; i++ ){
                gameField.forEach( function (block) {
                    if( block[i].value == player){
                        count++
                    }
                });
                if( count == options.startScreen.selectedCells ){
                    options.result = player;
                    break;
                }
                count = 0;
            }
        }
        function checkHorizontal( player ) {
            var count = 0;
            for( var i = 0; i <= gameField.length - 1; i++ ){
                gameField[i].forEach( function (block) {
                    if( block.value == player ){
                        count++
                    }
                });
                if( count == options.startScreen.selectedCells ){
                    options.result = player;
                    break;
                }
                count = 0;
            }
        }
        function checkLeftDiagonal( player ) {
            var count = 0;

            for( var i = 0; i <= gameField.length - 1; i++ ){
                if( gameField[i][i].value == player) {
                    count++
                }
                if( count == options.startScreen.selectedCells ){
                    options.result = player;
                    count = 0;
                    break;
                }
            }
        }
        function checkRightDiagonal( player ) {
            var count = 0;
            var rightDiagonal =[];
            for( var i = 0; i <= gameField.length - 1; i++ ){
                rightDiagonal.push( gameField[i].slice() );
                rightDiagonal[i].reverse();
                if( rightDiagonal[i][i].value == player ){
                    count++
                }
                if( count == options.startScreen.selectedCells ){
                    options.result = player;
                    count = 0;
                    break;
                }
            }
        }
        function showResult( winner ) {
            alert( winner+"-Player WON!" );
            restart();
        }
        function checkGame() {
            if( options.stepCounter >= options.startScreen.selectedCells ){
                checkHorizontal('x');
                checkHorizontal('o');
                checkVertical('x');
                checkVertical('o');
                checkLeftDiagonal('x');
                checkLeftDiagonal('o');
                checkRightDiagonal('x');
                checkRightDiagonal('o');
            }
            if( ( options.stepCounter == options.startScreen.selectedCells * options.startScreen.selectedCells ) && options.result == '' ){
                alert( 'Friendship WON!' );
                restart();
            }
            if( options.result == 'x' || options.result == 'o' ){
                showResult( options.result )
            }
        }
        function restart() {
            vm.clearDocumentBody();
            createStartScreen( 3, 10 );
            options = {};
            gameField = [];
            options = {
                startScreen: {},
                stepCounter: 0,
                result: '',
                playerStep: 1,
                lineSize: Math.floor( window.innerWidth / 3 )
            };
        }
    }
    XoGame.prototype = Object.create( Game.prototype );

    function SeaWarGame() {
        var options, vm;
        options = {};
        options.playerField = [];
        options.markingStep = 1;
        options.ships = [];
        options.possibleShips = [];
        options.lineSize = Math.floor(window.innerWidth / 3);
        vm = this;
        setStartGameButton();
        function newGame() {
            var target = document.getElementById( 'playerField' );
            getCellSize();
            hideStartScreen();
            addMarkingLinesToField();
            vm.createField( options.cellSize, options.lineSize, options.playerField, target );
            markField( options.playerField );
            // cutField( options.playerField );
        }

        function setStartGameButton() {
            document.getElementById( 'startGame' ).onclick = newGame;
        }
        function hideStartScreen() {
            document.getElementById('startScreen').style.display = 'none';
        }
        function addMarkingLinesToField() {
            options.cellSize = +options.cellSize + options.markingStep;
        }

        function getRandom( min, max ) {
            return min + Math.floor(Math.random() * (max + 1 - min));
        }
        function genAlphabet(cellSize) {
            var start = 'А'.charCodeAt();
            var end = 'Я'.charCodeAt();
            var alphabet = [];
            for( start; start <= end; start++ ){
                alphabet.push( String.fromCharCode( start ) );
                if( alphabet.length == cellSize - 2 ){
                    break;
                }
            }
            alphabet.splice( 6, 0, 'Ё' );
            return alphabet;
        }
        function markField(field) {
            var alphabet = genAlphabet(options.cellSize);
            alphabet.unshift( 'for[0][0] element' );
            field.forEach(function( block, index ){
                field[index][0].element.innerHTML = index;
                field[index][0].element.style.borderColor = 'white';
                field[0][index].element.innerHTML = alphabet[index];
                field[0][index].element.style.borderColor = 'white';
                field[0][0].element.innerHTML = '';
            })
        }
        function getCellSize() {
            var target = document.getElementById( 'fieldSizeSelector' );
            options['cellSize'] = target.options[target.selectedIndex].value;
        }
    }
    SeaWarGame.prototype = Object.create( Game.prototype );

    // var xoGame = new XoGame();
    var seaWarGame = new SeaWarGame();

})();