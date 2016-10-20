// (function () {
    function Game() {
            this.gameField = [];
        }
        Game.prototype.createField = function (cells,action) {
            var container = Game.prototype.elementFactory(document.body,'div');
            container.style.width = cells * 80 + 'px';
            container.style.height = cells * 80 + 'px';
            container.style.margin = 'auto';
            for( var j = 0; j <= cells - 1; j++ ){
                var line = [];
                for ( var i = 0; i <= cells - 1; i++ ){
                    var block = {
                        element: Game.prototype.elementFactory(container, 'div'),
                        position: j.toString() + i.toString(),
                        value:''
                    };
                    block.element.id = j.toString() + i.toString();
                    block.element.onclick = action;
                    block.element.innerHTML = '&nbsp;';
                    line.push(block);
                }
                this.gameField.push(line);
            }
            return container
        };
        Game.prototype.elementFactory = function(parent,tag) {
        var element = document.createElement(tag);
        parent.appendChild(element);
        return element;
    };
        Game.prototype.setStyleForBlock = function (cells,array) {
            array.forEach(function (item) {
                item.forEach(function (item) {
                    item.element.style.border = 'solid';
                    item.element.style.borderColor = 'gray';
                    item.element.style.width = cells* 69 / cells + 'px';
                    item.element.style.height = cells* 69 / cells + 'px';
                    item.element.style.border = 'solid';
                    item.element.style.borderColor = 'gray';
                    item.element.style.display = 'inline-block';
                    item.element.style.fontSize = cells* 50 / cells + 'px';
        });
    });
};


    function XoGame() {
        Game.call(this);
        var vm = this;
        var options = {
            startScreen: {}
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
             console.log(options);
         };
        createStartScreen(10,30);
         function start() {
            options['playerStep'] = 1;
            var target = document.getElementById("numberOfCellsId");
            options.startScreen['selectedCells'] =  target.options[target.selectedIndex].value;
            document.body.innerHTML = '';
            vm.createField(options.startScreen.selectedCells)
            vm.setStyleForBlock(options.startScreen.selectedCells,vm.gameField)

        };

        // this.checkVertical = function (player) {
        //     var count = 0;
        //     for(var i = 0; i <=vm.options.startScreen.selectedCells - 1; i++){
        //         vm.gameField.forEach(function (item) {
        //             if(item[i].value == player){
        //                 count++
        //             }
        //         });
        //         if(count == vm.options.startScreen.selectedCells){
        //
        //             vm.result = player;
        //             break;
        //         }
        //         count = 0;
        //     }
        //
        //
        // };
        // this.checkHorizontal = function (player) {
        //     var count = 0;
        //     for(var i = 0; i <= vm.gameField.length - 1; i++){
        //         vm.gameField[i].forEach(function (item,i,arr) {
        //             if(item.value == player){
        //                 count++
        //             }
        //         });
        //         if(count == vm.options.startScreen.selectedCells){
        //
        //             vm.result = player;
        //             break;
        //         }
        //         count = 0;
        //     }
        //
        // };
        // this.checkRightDiagonal = function (player) {
        //     var rightDiagonalCount = 0;
        //     var rightDiagonal =[];
        //     for(var i = 0;i<=vm.gameField.length - 1; i++){
        //         rightDiagonal.push(vm.gameField[i].slice());
        //         rightDiagonal[i].reverse();
        //         if(rightDiagonal[i][i].value == player){
        //             rightDiagonalCount++
        //         }
        //         if(rightDiagonalCount == vm.options.startScreen.selectedCells){
        //
        //             vm.result = player;
        //             rightDiagonalCount = 0;
        //             break;
        //         }
        //     }
        // };
        // this.checkLeftDiagonal = function (player) {
        //     var leftDiagonalCount = 0;
        //     var leftDiagonal = vm.gameField;
        //
        //     for(var i = 0; i <= leftDiagonal.length - 1; i++){
        //         if(leftDiagonal[i][i].value == player){
        //             leftDiagonalCount++
        //         }
        //         if(leftDiagonalCount == vm.options.startScreen.selectedCells){
        //
        //             vm.result = player;
        //             leftDiagonalCount = 0;
        //             break;
        //         }
        //     }
        // };
        // this.showResult = function (winner) {
        //     alert(winner+"-Player WON!");
        //     this.restart();
        // };
        // this.checkGame = function () {
        //     if(this.options.stepCounter >= this.options.startScreen.selectedCells){
        //         this.checkHorizontal('x');
        //         this.checkHorizontal('o');
        //         this.checkVertical('x');
        //         this.checkVertical('o');
        //         this.checkLeftDiagonal('x');
        //         this.checkLeftDiagonal('o');
        //         this.checkRightDiagonal('x');
        //         this.checkRightDiagonal('o');
        //     }
        //     if( (this.options.stepCounter == this.options.startScreen.selectedCells * this.options.startScreen.selectedCells) && vm.result == '' ){
        //         alert('friendship WON!');
        //         vm.restart();
        //     }
        //     if(this.result == 'x'|| this.result == 'o'){
        //         this.showResult(vm.result)
        //     }
        //
        // };
        // function action() {
        //     if(this.nodeName == 'DIV'){
        //         vm.options.stepCounter++;
        //         vm.changeTurnStatusInfo();
        //         var blockPositionX = this.id[0];
        //         var blockPositionY = this.id[1];
        //         vm.gameField[blockPositionX][blockPositionY].element.innerHTML = step();
        //         vm.gameField[blockPositionX][blockPositionY].value = this.innerHTML;
        //         this.onclick = null;
        //         vm.checkGame();
        //
        //     }
        //     function step() {
        //         if(vm.options.playerStep == 1){
        //             vm.options.playerStep = 2;
        //             vm.options.turnStatusInfo.style.color = 'blue';
        //             return 'x';
        //         }else {
        //             vm.options.playerStep = 1;
        //             vm.options.turnStatusInfo.style.color = 'red';
        //             return 'o';
        //         }
        //     };
        //
        // }
        // this.changeTurnStatusInfo = function () {
        //     this.options.turnStatusInfo.innerHTML = 'Player ' + vm.options.playerStep + ' turn'
        //
        // }
        // this.restart = function () {
        //     document.body.innerHTML = '';
        //     createGameOptions();
        //     vm.createStartScreen();
        // };

    }
    XoGame.prototype = Object.create(Game.prototype);
    var xoGame = new XoGame();
    console.log(xoGame);
// })();









