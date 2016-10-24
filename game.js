(function () {
    function Game() {}
    Game.prototype.createField = function (cells, lineSize, action, array, parentElement) {
        var container = Game.prototype.elementFactory(parentElement,'div');
        container.style.width = lineSize + 'px';
        container.style.height = lineSize + 'px';
        container.style.margin = 'auto';
        for( var j = 0; j <= cells - 1; j++ ){
            var line = [];
            for ( var i = 0; i <= cells - 1; i++ ){
                var block = {
                    element: Game.prototype.elementFactory(container, 'div'),
                    position: i.toString() + j.toString(),
                    x: i,
                    y: j,
                    value:''
                };
                block.element.id = j.toString() + i.toString();
                block.element.onclick = action;
                // block.element.innerHTML = '&nbsp;';
                line.push(block);
            }
            array.push(line);
        }
        return container
    };
    Game.prototype.setStyleForBlock = function (cells, lineSize, array) {
        array.forEach(function (item) {
            item.forEach(function (item) {
                var borderSize = 1;
                item.element.style.border = 'solid ' + borderSize + 'px';
                item.element.style.width = (lineSize / cells) - borderSize*2 + 'px';
                item.element.style.height = (lineSize / cells) - borderSize*2 + 'px';
                item.element.style.borderColor = 'gray';
                item.element.style.float = 'left';
                item.element.style.fontSize = lineSize/cells +  'px';
            });
        });
    };
    Game.prototype.elementFactory = function(parent,tag) {
        var element = document.createElement(tag);
        parent.appendChild(element);
        return element;
    };

    function XoGame() {
        document.body.innerHTML = '';
        var gameField = [];
        var vm = this;
        var options = {
            startScreen: {},
            stepCounter: 0,
            result: ''
        };
        function createStartScreen(minField,maxField){
            document.body.style.textAlign = 'center';
            document.body.style.marginTop = '80px';
            options.startScreen['topic'] = vm.elementFactory(document.body,'h1');
            options.startScreen.topic.innerHTML = 'Select size of field';
            options.startScreen['numberOfCells']  = document.createElement('select');
            options.startScreen.numberOfCells.style.marginRight = '10px';
            options.startScreen.numberOfCells.id = 'numberOfCellsId';
            for( var i = minField; i <= maxField; i++){
                var optionElement = vm.elementFactory(options.startScreen.numberOfCells,'option');
                optionElement.value = i;
                optionElement.text = i + 'x' + i;
            }
            document.body.appendChild(options.startScreen.numberOfCells);
            var startButton = vm.elementFactory(document.body,'button');
            startButton.innerHTML = 'Start game';
            startButton.onclick = start;
        };
        createStartScreen(3,10);
        function start() {
            options['playerStep'] = 1;
            var target = document.getElementById("numberOfCellsId");
            options.startScreen['selectedCells'] =  target.options[target.selectedIndex].value;
            document.body.innerHTML = '';
            options['lineSize'] = Math.floor( window.innerWidth / 3 );
            vm.createField(options.startScreen.selectedCells, options.lineSize, action, gameField,document.body);
            vm.setStyleForBlock(options.startScreen.selectedCells,options.lineSize, gameField);
            options['bar'] = vm.elementFactory(document.body,'h1');
            TurnStatusInfo();
            options.bar.style.color = 'red'
        };
        function action() {
            if(this.nodeName == 'DIV'){
                options.stepCounter++;
                var blockPositionX = this.id[0];
                var blockPositionY = this.id[1];
                gameField[blockPositionX][blockPositionY].element.innerHTML = step();
                gameField[blockPositionX][blockPositionY].value = this.innerHTML;
                TurnStatusInfo();
                this.onclick = null;
                checkGame();

            }
            function step() {
                if(options.playerStep == 1){
                    options.playerStep = 2;
                    options.bar.style.color = 'blue';
                    return 'x';
                }else {
                    options.playerStep = 1;
                    options.bar.style.color = 'red';
                    return 'o';
                }
            };
        }
        function TurnStatusInfo () {
            options.bar.innerHTML = 'Player ' + options.playerStep + ' turn'
        }

        function checkVertical (player) {
            var count = 0;
            for(var i = 0; i <= options.startScreen.selectedCells - 1; i++){
                gameField.forEach(function (item) {
                    if(item[i].value == player){
                        count++
                    }
                });
                if(count == options.startScreen.selectedCells){

                    options.result = player;
                    break;
                }
                count = 0;
            }


        };
        function checkHorizontal(player) {
            var count = 0;
            for(var i = 0; i <= gameField.length - 1; i++){
                gameField[i].forEach(function (item,i,arr) {
                    if(item.value == player){
                        count++
                    }
                });
                if(count == options.startScreen.selectedCells){

                    options.result = player;
                    break;
                }
                count = 0;
            }

        };
        function checkRightDiagonal(player) {
            var rightDiagonalCount = 0;
            var rightDiagonal =[];
            for(var i = 0;i<=gameField.length - 1; i++){
                rightDiagonal.push(gameField[i].slice());
                rightDiagonal[i].reverse();
                if(rightDiagonal[i][i].value == player){
                    rightDiagonalCount++
                }
                if(rightDiagonalCount == options.startScreen.selectedCells){

                    options.result = player;
                    rightDiagonalCount = 0;
                    break;
                }
            }
        };
        function checkLeftDiagonal(player) {
            var leftDiagonalCount = 0;
            var leftDiagonal = gameField;

            for(var i = 0; i <= leftDiagonal.length - 1; i++){
                if(leftDiagonal[i][i].value == player){
                    leftDiagonalCount++
                }
                if(leftDiagonalCount == options.startScreen.selectedCells){

                    options.result = player;
                    leftDiagonalCount = 0;
                    break;
                }
            }
        };
        function showResult(winner) {
            alert(winner+"-Player WON!");
            restart();
        };
        function checkGame() {
            if(options.stepCounter >= options.startScreen.selectedCells){
                checkHorizontal('x');
                checkHorizontal('o');
                checkVertical('x');
                checkVertical('o');
                checkLeftDiagonal('x');
                checkLeftDiagonal('o');
                checkRightDiagonal('x');
                checkRightDiagonal('o');
            }
            if( (options.stepCounter == options.startScreen.selectedCells * options.startScreen.selectedCells) && options.result == '' ){
                alert('friendship WON!');
                restart();
            }
            if(options.result == 'x'|| options.result == 'o'){
                showResult(options.result)
            }

        };
        function restart() {
            document.body.innerHTML = '';
            createStartScreen(3,10);
            options = {};
            gameField = [];
            options = {
                startScreen: {},
                stepCounter: 0,
                result: ''
            };
        };

    }
    XoGame.prototype = Object.create(Game.prototype);

    function SeaWarGame() {
        var playerField = [];
        var enemyField = [];
        var options = {};
        options.markingStep = 1;
        options.ships = {
            decks4ship: 1,
            decks3ship: 2,
            decks2ship: 3,
            decks1ship: 4
        }
        var vm = this;
        function startGame() {
            document.getElementById('startGame').onclick = newGame;
        }
        startGame();
        function newGame() {
            getCellSize();
            //hide start Screen
            document.getElementById('startScreen').style.display = 'none';
            //add marking lines
            options.cellSize = +options.cellSize + options.markingStep;
            generateField(playerField,'playerField');
            generateField(enemyField,'enemyField');
            markField(enemyField);
            markField(playerField);
            options.button = vm.elementFactory(document.getElementById('enemyField'),'button');
            options.button.innerHTML = 'gen';
            options.button.onclick = genShips
        }

        function dropRandomShip(field, shipSize, quantity) {
            var positiveLine = field.length - shipSize;
            var randomX = getRandom(1, field.length);
            var randomY = getRandom(1, field.length);

            field[randomX][randomY];
        }
        function genShips() {
            dropRandomShip(playerField,4)
        }
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function genAlphabet(cellSize) {
            var start = 'А'.charCodeAt();
            var end = 'Я'.charCodeAt();
            var array = [];
            for(start; start <= end; start++){
                array.push(String.fromCharCode(start));
                if(array.length == cellSize - 2){
                    break;
                }
            }
            array.splice(6,0,'Ё');
            return array;
        }
        function markField(field) {
            var alphabetArray = genAlphabet(options.cellSize);
            alphabetArray.unshift('for[0][0] element');
            field.forEach(function(item,index,array){
                array[index][0].element.innerHTML = index;
                array[index][0].element.style.borderColor = 'white';
                array[0][index].element.innerHTML = alphabetArray[index];
                array[0][index].element.style.borderColor = 'white';
                array[0][0].element.innerHTML = '';
            })
        }
        function generateField(array,parentElementID) {
            var lineWidth = Math.floor(window.innerWidth / 3);
            vm.createField(
                options.cellSize,
                lineWidth,
                '',
                array,
                document.getElementById(parentElementID));
            vm.setStyleForBlock(options.cellSize, lineWidth, array);


        }
        function getCellSize() {
            var target = document.getElementById('fieldSizeSelector');
            options['cellSize'] = target.options[target.selectedIndex].value;
        }
    }
    SeaWarGame.prototype = Object.create(Game.prototype);
    // var xoGame = new XoGame();
    var seaWarGame = new SeaWarGame();

})();