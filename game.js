var game = new Game();
console.log(game);


function Game() {
    var vm = this;

    this.createGameOptions = function() {
        vm.options = {};
        vm.result = '';
        vm.options.startScreen = {};
        vm.options.stepCounter = 0;
        vm.options.restartButton = {};
        vm.options.field = [];
        vm.options.turnStatusInfo = {};
        vm.options.container = {};
    };
    this.createGameOptions();
    this.changeTurnStatusInfo = function () {
        this.options.turnStatusInfo.innerHTML = 'Player ' + vm.options.playerStep + ' turn'

    }
    this.restart = function () {
        document.body.innerHTML = '';
        vm.createGameOptions();
        vm.createStartScreen();
    };
    this.start = function() {
        vm.options.playerStep = 1;
        var target = document.getElementById("numberOfCellsId");
        vm.options.startScreen.selectedCells =  target.options[target.selectedIndex].value;
        document.body.innerHTML = '';
        vm.fieldCreate();
        console.log(game);
    };
    this.fieldCreate = function () {
        var Cells = this.options.startScreen.selectedCells;
        this.options.container = this.elementFactory(document.body,'div');

        this.options.container.style.width = Cells * 80 + 'px';
        this.options.container.style.height = Cells * 80 + 'px';
        this.options.container.style.margin = 'auto';
        for( var j = 0; j <= Cells - 1; j++ ){
            var line = [];
            for ( var i = 0; i <= Cells - 1; i++ ){
                var block =
                {
                    element: vm.elementFactory(this.options.container, 'div'),
                    position: j.toString() + i.toString(),
                    value:''
                };
                block.element.id = j.toString() + i.toString();
                block.element.onclick = vm.action;
                block.element.innerHTML = '&nbsp;';
                this.setStyleForBlock(block.element, Cells);
                line.push(block);
            }
            this.options.field.push(line);
        }
        this.options.restartButton = this.elementFactory(document.body,'button');
        this.options.restartButton.innerHTML = 'Restart';
        this.options.restartButton.onclick = this.restart;

        this.options.turnStatusInfo = this.elementFactory(document.body,'h3');
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
    this.checkHorizontal = function (palyer) {
        var count = 0;
        for(var i = 0; i <= vm.options.field.length - 1; i++){
            vm.options.field[i].forEach(function (item,i,arr) {
                if(item.value == palyer){
                    count++
                }
            });
            if(count == vm.options.startScreen.selectedCells){
                console.log(palyer + ' won!');
                vm.result = palyer;
                break;
            }
            count = 0;
        }

    };
    this.checkDiagonal = function (palyer) {
        var count = 0;
        for(var i = 0;i<=vm.options.field.length - 1; i++){
            console.log(vm.options.field[i][i].position);
        }
    };
    this.checkVertical = function (palyer) {
        var count = 0;
          for(var i = 0; i <=vm.options.startScreen.selectedCells - 1; i++){
              vm.options.field.forEach(function (item) {
                  if(item[i].value == palyer){
                      count++
                  }
              });
              if(count == vm.options.startScreen.selectedCells){
                  console.log(palyer + ' won!');
                  vm.result = palyer;
                  break;
              }
                count = 0;
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
        }
        if(this.result == 'x'|| this.result == 'o'){
            this.showResult(vm.result);
        }

    };
    this.action = function() {
        if(this.nodeName == 'DIV'){
            this.innerHTML = step();
            vm.options.stepCounter++;
            vm.changeTurnStatusInfo();
            var blockPositionX = this.id[0];
            var blockPositionY = this.id[1];
            vm.options.field[blockPositionX][blockPositionY].value = this.innerHTML;
            this.onclick = null;
            vm.checkGame();
        }
        function step() {
            if(vm.options.playerStep == 1){
                vm.options.playerStep = 2;
                return 'x';
            }else {
                vm.options.playerStep = 1;
                return 'o';
            }
        };

    }
}







