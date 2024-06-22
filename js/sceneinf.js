import { game as gController } from "./memoryInf.js";

export class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlaySceneInf');
        this.resources = [];
        this.cards = gController.init(() => null); // Inicializar cartas

        this.timer = gController.initTime(() => null); // Tiempo inicial en segundos
        this.timerText = null; // Variable para almacenar el texto del contador

        
        this.points = gController.initPoints(() => null); // obtener la puntuacion
        this.pointsText = null;
    }

    preload() {
        this.loadCards();
        this.loadTimer();
    }

    loadCards() {
        this.resources = [];
        this.cards.forEach((r) => {
            if (!this.resources.includes(r.front)) {
                this.resources.push(r.front);
            }
        });
        this.resources.push("../resources/back.png");
        this.resources.forEach((r) => this.load.image(r, r)); // Primer parámetro nombre, segundo parámetro dirección
    }

    loadTimer(){
        console.log("Cargamos el contador");
    }

    create() {
        this.cameras.main.setBackgroundColor(0xBFFCFF);
        this.createCards();
/*
        const button = this.add.text(50, 650, 'Save', { fontSize: '32px', fill: '#000' }) // Crear el botón para guardar la partida
            .setInteractive()
            .on('pointerover', () => button.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => button.setStyle({ fill: '#000' }))
            .on('pointerdown', () => this.Save());
*/
        this.timerText = this.add.text(50, 50, `Tiempo: ${this.timer}`, { fontSize: '32px', fill: '#000' });

        this.pointsText = this.add.text(50,500,`Puntos: ${this.points}`, {fontSize: '32px', fill: '#000'});
        console.log(this.points);

        this.timerEvent = this.time.addEvent({
            delay: 1000, // Intervalo en milisegundos (1000ms = 1 segundo)
            callback: this.updateTimer,
            callbackScope: this,
            loop: true // Repetir indefinidamente
        });
    }

    update() {
        this.g_cards.children.iterate((c, i) => c.setTexture(this.cards[i].current));
    }

    updateTimer() {
        this.timer--; // Reducir el tiempo en cada frame
    
        // Actualizar el texto del contador
        this.timerText.setText(`Tiempo: ${this.timer}`);

        
    
        // Si el tiempo llega a cero, puedes manejar el evento de fin de juego aquí
        if (this.timer <= 0) {
            // Por ejemplo, mostrar un mensaje y reiniciar el juego
            alert("¡Tiempo agotado!");
            window.location.assign("../index.html"); // Recargar la página
        }
    }

    Save() {
       // gController.save();
    }

    createCards() {
        this.g_cards = this.physics.add.staticGroup();
        this.cards.forEach((c, i) => this.g_cards.create(50 + 100 * (i % 6), 150 + 100 * Math.floor(i / 6), c.current));

        this.g_cards.children.iterate((c, i) => {
            c.setInteractive();
            c.on('pointerup', () => gController.click(this.cards[i]));
        });
    }
}
