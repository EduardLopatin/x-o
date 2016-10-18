var game = new Game();
console.log(game);


function Game() {
    var vm = this;
    function createGameOptions() {
        vm.options = [];
        vm.options.stepCounter = 0;
        vm.options.restartButton = {};
        vm.options.field = [];
        vm.options.turnStatusInfo = {};
        vm.options.container = {};
    }
    createGameOptions();
    this.startScreenOptions = {};
    this.changeTurnStatusInfo = function () {
    this.options.turnStatusInfo.innerHTML = 'Player ' + vm.options.playerStep + ' turn'

}
    this.restart = function () {
        document.body.innerHTML = '';
        vm.startScreenOptions = {};
        createGameOptions();
        vm.startScreenCreator();
    };
    this.startGame = function() {
        vm.options.playerStep = 1;
        var target = document.getElementById("numberOfCellsId");
        vm.startScreenOptions.selectedCells =  target.options[target.selectedIndex].value;
        console.log(vm.startScreenOptions.selectedCells);
        document.body.innerHTML = '';
        vm.fieldCreate();
        console.log(game);
    };
    this.fieldCreate = function () {
        var Cells = this.startScreenOptions.selectedCells;
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
        this.options.turnStatusInfo.id = 'turnStatusInfo';
        this.options.turnStatusInfo.innerHTML = 'Player ' + vm.options.playerStep + ' turn'
    };
    
    this.elementFactory = function(parent,tag) {
        var element = document.createElement(tag);
        parent.appendChild(element);
        return element;
    };
    this.startScreenCreator = function(){
        document.body.style.textAlign = 'center';
        document.body.style.marginTop = '80px';
        this.startScreenOptions.topic = this.elementFactory(document.body,'h1');
        this.startScreenOptions.topic.innerHTML = 'Select size of field';
        this.startScreenOptions.numberOfCells  = document.createElement('select');
        this.startScreenOptions.numberOfCells.style.marginRight = '10px';
        this.startScreenOptions.numberOfCells.id = 'numberOfCellsId';
        for( var i = 3; i <= 10; i++){
            var optionElement = this.elementFactory(this.startScreenOptions.numberOfCells,'option');
            optionElement.value = i;
            optionElement.text = i + 'x' + i;
        }
        document.body.appendChild(this.startScreenOptions.numberOfCells);
        var startButton = this.elementFactory(document.body,'button');
        startButton.innerHTML = 'Start game';
        startButton.onclick = this.startGame;
    };
    this.setStyleForBlock = function (block, cells) {
        block.style.width = cells* 69 / cells + 'px';
        block.style.height = cells* 69 / cells + 'px';
        block.style.border = 'solid';
        block.style.borderColor = 'gray';
        block.style.display = 'inline-block';
        block.style.fontSize = cells* 50 / cells + 'px';
    };

    this.startScreenCreator();
    this.checkXorY = function (xOrY) {
        var xOrYturn = 0;
        for(var i = 0; i <= vm.options.field.length - 1; i++){
            vm.options.field[i].forEach(function (item,i,arr) {
                if(item.value == xOrY){
                    xOrYturn++
                }
            })
            if(xOrYturn == vm.startScreenOptions.selectedCells){
                return console.log(xOrY + ' won!')
            }
            xOrYturn = 0;
        }

    };
    this.checkGame = function () {
if(this.options.stepCounter >= this.startScreenOptions.selectedCells){
    this.checkXorY('x');
    this.checkXorY('o');
}



    };

    this.step = function () {
         if(this.options.playerStep == 1){
             this.options.playerStep = 2;
             return 'x';
         }else {
             this.options.playerStep = 1;
             return 'o';
         }
    };
    this.action = function() {
        if(this.nodeName == 'DIV'){
            this.innerHTML = vm.step();
            vm.options.stepCounter++;
            vm.changeTurnStatusInfo();
            var blockPositionX = this.id[0];
            var blockPositionY = this.id[1];
            vm.options.field[blockPositionX][blockPositionY].value = this.innerHTML;
            vm.checkGame();
            this.onclick = null;
        }

    }


}







