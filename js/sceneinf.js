import { game as gController } from "./memoryInf.js";

var game = $('#game');

export class PlayScene extends Phaser.Scene{
    constructor (){
        super('PlaySceneInf');
        this.resources = [];
        this.cards = gController.init(()=>null); // Inicialitzar cartes
    }

    preload() {  
        this.cards.forEach((r)=>{
            if (!this.resources.includes(r.front))
                this.resources.push(r.front);
        });
        this.resources.push("../resources/back.png");
        this.resources.forEach((r)=>this.load.image(r,r)); // Primer paràmetre nom Segon paràmetre direcció
    }

    create() {
        this.cameras.main.setBackgroundColor(0xBFFCFF);

        this.g_cards = this.physics.add.staticGroup();
        this.cards.forEach((c, i)=> this.g_cards.create(50 + 100*i, 150, c.current));

        this.g_cards.children.iterate((c, i) => {
            c.setInteractive();
            c.on('pointerup', ()=> gController.click(this.cards[i]));
        });

        const button = this.add.text(50, 300, 'Save', { fontSize: '32px', fill: '#000' }) //Creem el boto per guardar la partida
        .setInteractive()
        .on('pointerover', () => button.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => button.setStyle({ fill: '#000' }))
        .on('pointerdown', () => this.Save());
    }

    update() {
        this.g_cards.children.iterate((c, i) => c.setTexture(this.cards[i].current));
    }

    Save(){ //Apliquem el que teniem a game.js a guardar la partida

        gController.save();

        gController.init(updateSRC).forEach(function(card, indx){
            
            game.append('<img id="c'+indx+'" class="card" title="card">');
            card.pointer = $('#c'+indx);
            card.pointer.on('click', () => gController.click(card));
            card.pointer.attr("src", card.current);
        });

        function updateSRC(){
            this.pointer.attr("src", this.current);
        }

       

        console.log("Guardar partida")

    }
}