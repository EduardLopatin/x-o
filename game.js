(function () {
        function Game() {
            var vm = this;
            function createGameOptions() {
                vm.options = {};
                vm.result = '';
                vm.options.startScreen = {};
                vm.options.stepCounter = 0;
                vm.options.restartButton = {};
                vm.gameField = [];
                vm.options.turnStatusInfo = {};
                vm.options.container = {};
            };
            createGameOptions();
            this.changeTurnStatusInfo = function () {
                this.options.turnStatusInfo.innerHTML = 'Player ' + vm.options.playerStep + ' turn'

            }
            this.restart = function () {
                document.body.innerHTML = '';
                createGameOptions();
                vm.createStartScreen();
            };
            this.start = function() {
                vm.options.playerStep = 1;
                var target = document.getElementById("numberOfCellsId");
                vm.options.startScreen.selectedCells =  target.options[target.selectedIndex].value;
                document.body.innerHTML = '';
                vm.fieldCreate();

            };
            this.fieldCreate = function () {
                var Cells = this.options.startScreen.selectedCells;
                var container = this.elementFactory(document.body,'div');
                container.style.width = Cells * 80 + 'px';
                container.style.height = Cells * 80 + 'px';
                container.style.margin = 'auto';
                for( var j = 0; j <= Cells - 1; j++ ){
                    var line = [];
                    for ( var i = 0; i <= Cells - 1; i++ ){
                        var block = {
                            element: vm.elementFactory(container, 'div'),
                            position: j.toString() + i.toString(),
                            value:''
                        };
                        block.element.id = j.toString() + i.toString();
                        block.element.onclick = action;
                        block.element.innerHTML = '&nbsp;';
                        this.setStyleForBlock(block.element, Cells);
                        line.push(block);
                    }
                    this.gameField.push(line);
                }
                var restartButton = this.elementFactory(document.body,'button');
                restartButton.innerHTML = 'Restart';
                restartButton.onclick = this.restart;

                this.options.turnStatusInfo = this.elementFactory(document.body,'h3');
                this.options.turnStatusInfo.style.color = 'red';
                this.options.turnStatusInfo.innerHTML = 'Player ' + vm.options.playerStep + ' turn'
            };
            this.elementFactory = function(parent,tag) {
                var element = document.createElement(tag);
                parent.appendChild(element);
                return element;
            };
            this.createStartScreen = function(){
                document.body.style.textAlign = 'center';
                document.body.style.marginTop = '80px';
                this.options.startScreen.topic = this.elementFactory(document.body,'h1');
                this.options.startScreen.topic.innerHTML = 'Select size of field';
                this.options.startScreen.numberOfCells  = document.createElement('select');
                this.options.startScreen.numberOfCells.style.marginRight = '10px';
                this.options.startScreen.numberOfCells.id = 'numberOfCellsId';
                for( var i = 3; i <= 10; i++){
                    var optionElement = this.elementFactory(this.options.startScreen.numberOfCells,'option');
                    optionElement.value = i;
                    optionElement.text = i + 'x' + i;
                }
                document.body.appendChild(this.options.startScreen.numberOfCells);
                var startButton = this.elementFactory(document.body,'button');
                startButton.innerHTML = 'Start game';
                startButton.onclick = this.start;
            };
            this.setStyleForBlock = function (block, cells) {

                block.style.width = cells* 69 / cells + 'px';
                block.style.height = cells* 69 / cells + 'px';
                block.style.border = 'solid';
                block.style.borderColor = 'gray';
                block.style.display = 'inline-block';
                block.style.fontSize = cells* 50 / cells + 'px';
            };
            this.createStartScreen();
            this.checkVertical = function (player) {
                var count = 0;
                for(var i = 0; i <=vm.options.startScreen.selectedCells - 1; i++){
                    vm.gameField.forEach(function (item) {
                        if(item[i].value == player){
                            count++
                        }
                    });
                    if(count == vm.options.startScreen.selectedCells){

                        vm.result = player;
                        break;
                    }
                    count = 0;
                }


            };
            this.checkHorizontal = function (player) {
                var count = 0;
                for(var i = 0; i <= vm.gameField.length - 1; i++){
                    vm.gameField[i].forEach(function (item,i,arr) {
                        if(item.value == player){
                            count++
                        }
                    });
                    if(count == vm.options.startScreen.selectedCells){

                        vm.result = player;
                        break;
                    }
                    count = 0;
                }

            };
            this.checkRightDiagonal = function (player) {
                var rightDiagonalCount = 0;
                var rightDiagonal =[];
                for(var i = 0;i<=vm.gameField.length - 1; i++){
                    rightDiagonal.push(vm.gameField[i].slice());
                    rightDiagonal[i].reverse();
                    if(rightDiagonal[i][i].value == player){
                        rightDiagonalCount++
                    }
                    if(rightDiagonalCount == vm.options.startScreen.selectedCells){

                        vm.result = player;
                        rightDiagonalCount = 0;
                        break;
                    }
                }
            };
            this.checkLeftDiagonal = function (player) {
                var leftDiagonalCount = 0;
                var leftDiagonal = vm.gameField;

                for(var i = 0; i <= leftDiagonal.length - 1; i++){
                    if(leftDiagonal[i][i].value == player){
                        leftDiagonalCount++
                    }
                    if(leftDiagonalCount == vm.options.startScreen.selectedCells){

                        vm.result = player;
                        leftDiagonalCount = 0;
                        break;
                    }
                }
            };
            this.showResult = function (winner) {
                alert(winner+"-Player WON!");
                this.restart();
            };
            this.checkGame = function () {
                if(this.options.stepCounter >= this.options.startScreen.selectedCells){
                    this.checkHorizontal('x');
                    this.checkHorizontal('o');
                    this.checkVertical('x');
                    this.checkVertical('o');
                    this.checkLeftDiagonal('x');
                    this.checkLeftDiagonal('o');
                    this.checkRightDiagonal('x');
                    this.checkRightDiagonal('o');
                }
                if( (this.options.stepCounter == this.options.startScreen.selectedCells * this.options.startScreen.selectedCells) && vm.result == '' ){
                    alert('friendship WON!');
                    vm.restart();
                }
                if(this.result == 'x'|| this.result == 'o'){
                    this.showResult(vm.result)
                }

            };
            function action() {
                if(this.nodeName == 'DIV'){
                    vm.options.stepCounter++;
                    vm.changeTurnStatusInfo();
                    var blockPositionX = this.id[0];
                    var blockPositionY = this.id[1];
                    vm.gameField[blockPositionX][blockPositionY].element.innerHTML = step();
                    vm.gameField[blockPositionX][blockPositionY].value = this.innerHTML;
                    this.onclick = null;
                    vm.checkGame();

                }
                function step() {
                    if(vm.options.playerStep == 1){
                        vm.options.playerStep = 2;
                        vm.options.turnStatusInfo.style.color = 'blue';
                        return 'x';
                    }else {
                        vm.options.playerStep = 1;
                        vm.options.turnStatusInfo.style.color = 'red';
                        return 'o';
                    }
                };

            }
        }
        var game = new Game();
})();









