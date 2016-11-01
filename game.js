// (function () {
//                            Y
//         ------------------->
//         |
//         |
//         |
//         |
//         |
//      X  V



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
        for( var x = 0; x < cells; x++ ){
            var line = [];
            for ( var y = 0; y < cells; y++ ){
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

        if( arguments.length === 3 ){
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
    Game.prototype.getBlocksAroundBlock = function ( block, field , cellSize, blocks) {
    for( var x = 0; x < 3; x++ ){
        for( var y = 0; y < 3; y++ ){
            var checkedX = (block.x - 1) + x;
            var checkedY = (block.y - 1) + y;
            if(checkedX >= 0 && checkedX < cellSize && checkedY >= 0 && checkedY < cellSize){
                var checkedBlock = field[checkedX][checkedY];
                blocks.push(checkedBlock);
            }
        }
    }
}

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
            createOptionsOfFieldSize( minField, maxField );
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
        }
        function createOptionsOfFieldSize( minField, maxField ) {
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
            if( this.nodeName === 'DIV' ){
                options.stepCounter++;
                gameField[this.x][this.y].element.innerHTML = turnPlayerStep();
                gameField[this.x][this.y].value = this.innerHTML;
                turnStatusInfo();
                this.onclick = null;
                checkGame();
            }
            function turnPlayerStep() {
                if( options.playerStep === 1 ){
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
                    if( block[i].value === player){
                        count++
                    }
                });
                if( count === +options.startScreen.selectedCells ){
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
                    if( block.value === player ){
                        count++
                    }
                });
                if( count === +options.startScreen.selectedCells ){
                    options.result = player;
                    break;
                }
                count = 0;
            }
        }
        function checkLeftDiagonal( player ) {
            var count = 0;

            for( var i = 0; i <= gameField.length - 1; i++ ){
                if( gameField[i][i].value === player) {
                    count++
                }
                if( count === +options.startScreen.selectedCells ){
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
                if( rightDiagonal[i][i].value === player ){
                    count++
                }
                if( count === +options.startScreen.selectedCells ){
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
            if( ( options.stepCounter === options.startScreen.selectedCells * options.startScreen.selectedCells ) && options.result === '' ){
                alert( 'Friendship WON!' );
                restart();
            }
            if( options.result === 'x' || options.result === 'o' ){
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
        options.possibleShips = [];
        options.lineSize = Math.floor( window.innerWidth / 3 );
        options.shipsStack = {
            deck4: 1,
            deck3: 2,
            deck2: 3,
            deck1: 4
        };
        options.stackQuantity = 1;
        options.ships = [];
        vm = this;
        setStartGameButton();

        function newGame() {
            var target = document.getElementById( 'playerField' );
            getCellSize();
            hideStartScreen();
            vm.createField( options.cellSize, options.lineSize, options.playerField, target );
            genShipsRateByFieldSize( options.cellSize );
            genMarine( options.playerField, options.stackQuantity );
            declareActionOnField( options.playerField );
        }
        function declareActionOnField( field ) {
            field.forEach(function ( line ) {
                line.forEach(function ( block ) {
                  block.element.onclick  = shoot
                })
            })
        }
        function shoot() {
            var target = options.playerField[this.x][this.y];
            if(target.deck){
                destroyDeck(target);
                checkShipsDestruction();
            }
            if(!target.deck){
                target.element.innerHTML = 'o'
            }
            target.element.onclick = null;
        }
        function checkShipsDestruction() {
            options.ships.forEach(function ( ship ) {
                var decksDestroyed = 0;
                ship.forEach(function ( block ) {
                    if( block.deck.isAlive == false ){
                      decksDestroyed++
                    }
                    if( decksDestroyed === ship.length ){
                        deleteShip( ship );
                    }
                })
            })
        }
        function deleteShip( ship ) {
            var shipIndex = options.ships.indexOf( ship );
            ship.forEach(function (deck) {
                deck.element.style.backgroundColor = 'red'
            });
            options.ships.splice( shipIndex, 1 );
        }
        function destroyDeck(block) {
            block.element.innerHTML = 'x';
            block.deck.isAlive = false;
            openSeaAroundDeck(block);

        }
        function openSeaAroundDeck( block ) {
            var blocksAroundDeck = [];
            vm.getBlocksAroundBlock( block, options.playerField, options.cellSize, blocksAroundDeck );
                blocksAroundDeck.forEach(function ( block ) {
                if(!block.deck){
                    block.element.innerHTML = 'o'
                }
            })
        }
        function genMarine( field, stackQuantity ) {
            for( var x = 1; x <= stackQuantity; x++){
                makeShipsBySize( 4, options.shipsStack.deck4, field );
                makeShipsBySize( 3, options.shipsStack.deck3, field );
                makeShipsBySize( 2, options.shipsStack.deck2, field );
                makeShipsBySize( 1, options.shipsStack.deck1, field )
            }
        }
        function genShipsRateByFieldSize(cellSize) {
            var blocksQuantity = cellSize * cellSize;
            var stacksQuantity = 0;
            // ships must use +-20% of field
            var rate = 5;
            var blocksForDecks = 20;

            var result = blocksQuantity / rate / 20;
            result = result.toFixed(0);
            console.log(result);
            options.stackQuantity = result;
        }
        function makeShipsBySize( shipSize, quantity, field ) {
            for( var i = 0; i < quantity; i++){
                makePossibleShip( shipSize, field )
            }
        }
        function makePossibleShip( shipSize, field ) {
            //push possible ships to options.possibleShips
            genPossibleShipsCoords( field, shipSize );
            var ship = getRandomShip();
            putDeadZoneAroundShip( ship, field );
            //push created ship in options.ships
            saveShip( ship );
            //view
            putShip( ship, field );
            options.possibleShips = [];
        }
        function saveShip( ship ) {
            options.ships.push( ship )
        }
        function putDeadZoneAroundShip( ship, field ) {
            ship.forEach(function ( block ) {
                var blocksAroundDeck = [];
                vm.getBlocksAroundBlock( block, field, options.cellSize, blocksAroundDeck );
                blocksAroundDeck.forEach(function ( block ) {
                    if(checkBlock( block )){
                        block.deadZone = true;
                    }
                });
            })
        }

        function putShip( ship, field ) {
            ship.forEach(function ( block ) {
                var deck = {
                    isAlive: true
                };
                field[block.x][block.y].deck = deck;
            })
        }
        function getRandomShip() {
            var position = getRandom( 0, options.possibleShips.length - 1 );
            return options.possibleShips[position];
        }
        function genPossibleShipsCoords( field, shipSize ) {
            for ( var x = 0; x < options.cellSize; x++ ) {
                for ( var y = 0; y < options.cellSize; y++ ) {
                    pushShipByHorizontal( x, y, field, shipSize);
                    pushShipByVertical( x, y, field, shipSize);
                }
            }
        }

        function pushShipByHorizontal( x, y, field, shipSize ) {
            if( y <= options.cellSize - shipSize ){
                var possibleHorizontalShip = genPossibleShipByHorizontal( x, y, field, shipSize );
                if( possibleHorizontalShip ){
                    options.possibleShips.push( possibleHorizontalShip )
                }
            }
        }
        function pushShipByVertical(  x, y, field, shipSize ) {
            if( x <= options.cellSize - shipSize ){
                var possibleVerticalShip = genPossibleShipByVertical( x, y, field, shipSize );
                if( possibleVerticalShip ){
                    options.possibleShips.push( possibleVerticalShip )
                }
            }
        }
        function genPossibleShipByHorizontal( x, y, field, shipSize ) {
            var possibleShip = [];
            for( var step = 0; step < shipSize; step++ ){
                var possibleDeck = field[x][y + step];
                if(checkBlock(possibleDeck)){
                    possibleShip.push(possibleDeck);
                }
            }
            if(possibleShip.length == shipSize){
                return possibleShip
            }
            else {
                return false
            }
        }
        function genPossibleShipByVertical( x, y, field, shipSize ) {
            var possibleShip = [];
            for( var step = 0; step < shipSize; step++ ){
                var possibleDeck = field[x + step][y];
                if(checkBlock(possibleDeck)){
                    possibleShip.push(possibleDeck);
                }
            }
            if(possibleShip.length == shipSize){
                return possibleShip
            }
            else {
                return false
            }
        }

        function checkBlock( block ) {
            if(!block.deck && !block.deadZone){
                return true
            }
        }

        function setStartGameButton() {
            document.getElementById( 'startGame' ).onclick = newGame;
        }
        function hideStartScreen() {
            document.getElementById('startScreen').style.display = 'none';
        }
        function getRandom( min, max ) {
            return min + Math.floor( Math.random() * ( max + 1 - min ) );
        }
        function getCellSize() {
            var target = document.getElementById( 'fieldSizeSelector' );
            options['cellSize'] = target.options[target.selectedIndex].value;
        }
    }
    SeaWarGame.prototype = Object.create( Game.prototype );

    // var xoGame = new XoGame();
    var seaWarGame = new SeaWarGame();

// })();