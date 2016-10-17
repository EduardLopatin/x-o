var game = new Game();
console.log(game);


function Game() {
    var vm = this;
    this.startScreenOptions = {};
    this.gameOptions = [];
    this.restart = function () {
        document.body.innerHTML = '';
        this.startScreenOptions = {};
        vm.gameOptions = [];
        vm.startScreenCreator();
    };
    this.startGame = function() {
        vm.gameOptions.playerStep = 1;
        var target = document.getElementById("numberOfCellsId");
        vm.startScreenOptions.selectedCells =  target.options[target.selectedIndex].value;
        console.log(vm.startScreenOptions.selectedCells);
        document.body.innerHTML = '';
        vm.fieldCreate();
        console.log(game);
    };
    this.fieldCreate = function () {
        var Cells = this.startScreenOptions.selectedCells;
        var container = this.elementFactory(document.body,'div');
        container.style.width = Cells * 80 + 'px';
        container.style.height = Cells * 80 + 'px';
        container.style.margin = 'auto';
        for(var j = 0; j <= Cells -1; j++){
            var line = [];
            for (var i = 1; i <= Cells; i++ ){
                var block = vm.elementFactory(container, 'div');
                block.id = i;
                block.onclick = vm.action;
                block.innerHTML = '&nbsp;';
                this.setStyleForBlock(block, Cells);
                line.push(block);
            }
            this.gameOptions.push(line);
        }
        var restartButton = this.elementFactory(document.body,'button');
        restartButton.innerHTML = 'Restart';
        restartButton.onclick = this.restart;
        this.gameOptions.restart = restartButton;
    };
    
    this.elementFactory = function(parent,tag) {
        var element = document.createElement(tag);
        parent.appendChild(element);
        return element;
    };
    this.startScreenCreator = function(){
        document.body.style.textAlign = 'center';
        document.body.style.marginTop = '100px';
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
    this.gameOptions.playerStep = 1;
    this.step = function () {
         if(this.gameOptions.playerStep == 1){
             this.gameOptions.playerStep = 2;
             return 'x';
         }else {
             this.gameOptions.playerStep = 1;
             return 'o';
         }
    };
    this.action = function() {
        if(this.nodeName == 'DIV'){

         this.innerHTML = vm.step();
            this.onclick = null;

        }
    }


}







