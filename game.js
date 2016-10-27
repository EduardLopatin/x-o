(function () {
    function Game() {}
    Game.prototype.createContainer = function (lineSize) {
        var container = document.createElement('div');
        var sizeInPx = lineSize + 'px';
        container.style.width = sizeInPx;
        container.style.height = sizeInPx;
        container.style.margin = 'auto';
        return container
    };
    Game.prototype.createFieldBlocks = function (cells, lineSize, fieldBlocks) {
        for( var y = 0; y <= cells - 1; y++ ){
            var line = [];
            for ( var x = 0; x <= cells - 1; x++ ){
                var block = {
                    element: document.createElement('div'),
                    y: y,
                    x: x,
                    value: ''
                };
                block.element.y = y;
                block.element.x = x;
                Game.prototype.setStyleForBlocks(cells,lineSize,block);
                line.push(block);
            }
            fieldBlocks.push(line);
        }
    };
    Game.prototype.setStyleForBlocks = function (cells, lineSize, block) {
        var borderSize = 1;
        var item = block.element.style;
        var size = (lineSize / cells) - borderSize*2 + 'px';
        item.border = 'solid ' + borderSize + 'px';
        item.borderColor = 'gray';
        item.width = size;
        item.height = size;
        item.float = 'left';
        item.fontSize = lineSize/cells + 'px';
    };
    Game.prototype.createField = function (cells, lineSize, fieldBlocks, target) {
        if(arguments.length == 3){
            target = document.body;
        }
        var container = Game.prototype.createContainer(lineSize);

        Game.prototype.createFieldBlocks(cells, lineSize, fieldBlocks);
        for(var y = 0; y<= fieldBlocks.length - 1; y++){
            for(var x = 0; x <= fieldBlocks.length - 1; x++){
                container.appendChild(fieldBlocks[y][x].element)
            }
        }
        target.appendChild(container);
    };
    Game.prototype.setActionOnFieldBlocks = function (fieldBlocks, action) {
        for(var y = 0; y<= fieldBlocks.length - 1; y++){
            for(var x = 0; x <= fieldBlocks.length - 1; x++){
               fieldBlocks[y][x].element.onclick = action
            }
        }
    }
    Game.prototype.clearDocumentBody = function () {
        document.body.innerHTML = '';
    };

    function XoGame() {
        this.clearDocumentBody();
        var gameField = [], vm = this, options = {
            startScreen: {},
            stepCounter: 0,
            result: '',
            playerStep: 1,
            lineSize: Math.floor( window.innerWidth / 3 )
        };

        createStartScreen(3,10);
        function createStartScreen(minField, maxField){
            createTopic()
            createSelectorOfFieldSize(minField, maxField)
            createStartButton()
        }
        function start() {
            takeValueOfFieldSizeSelector();
            vm.clearDocumentBody();
            vm.createField(options.startScreen.selectedCells, options.lineSize, gameField);
            vm.setActionOnFieldBlocks(gameField, action);
            createStatusBar()
        };

        function createTopic() {
            document.body.style.textAlign = 'center';
            document.body.style.marginTop = '80px';
            options.startScreen.topic = document.createElement('h1');
            document.body.appendChild(options.startScreen.topic);
            options.startScreen.topic.innerHTML = 'Select size of field';
        }
        function createSelectorOfFieldSize(minField, maxField) {
            options.startScreen.numberOfCells = document.createElement('select');
            options.startScreen.numberOfCells.style.marginRight = '10px';
            options.startScreen.numberOfCells.id = 'numberOfCellsId';

            for( var i = minField; i <= maxField; i++){
                var optionElement = document.createElement('option');
                options.startScreen.numberOfCells.appendChild(optionElement);
                optionElement.value = i;
                optionElement.text = i + 'x' + i;
            }
            document.body.appendChild(options.startScreen.numberOfCells);
        }
        function createStartButton() {
            options.startScreen.startButton = document.createElement('button');
            document.body.appendChild(options.startScreen.startButton);
            options.startScreen.startButton.innerHTML = 'Start game';
            options.startScreen.startButton.onclick = start;
        }

        function takeValueOfFieldSizeSelector() {
            var target = document.getElementById("numberOfCellsId");
            options.startScreen.selectedCells =  target.options[target.selectedIndex].value;
        }
        function createStatusBar() {
            options.bar = document.createElement('h1');
            document.body.appendChild(options.bar);
            TurnStatusInfo();
            options.bar.style.color = 'red'
        }
        function action() {
            if(this.nodeName == 'DIV'){
                options.stepCounter++;
                gameField[this.y][this.x].element.innerHTML = step();
                gameField[this.y][this.x].value = this.innerHTML;
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
            vm.clearDocumentBody();
            createStartScreen(3,10);
            options = {};
            gameField = [];
            options = {
                startScreen: {},
                stepCounter: 0,
                result: '',
                playerStep: 1,
                lineSize: Math.floor( window.innerWidth / 3 )
            };
        };

    }
    XoGame.prototype = Object.create(Game.prototype);

    function SeaWarGame() {
        var options = {};
        options.playerField = [];
        options.markingStep = 1;
        options.ships = [];
        options.possibleShips = [];
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
            generateField(options.playerField,'playerField');
            markField(options.playerField);
            cutField(options.playerField);
        }
        function cutField(field, step) {
            for(var y = 1; y <= field.length -1; y++){
                for(var x = 1; x <= field.length -1; x++){
                    console.log(field[y][x].position);
                }
            }
        }
        function getRandom(min, max) {
            return min + Math.floor(Math.random() * (max + 1 - min));
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
    var xoGame = new XoGame();
    // var seaWarGame = new SeaWarGame();

})();