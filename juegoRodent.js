var canvas;
var ctx;
var FPS = 50;

var anchoF = 25;
var altoF = 25;

var muro = '#044f14'
var puerta = '#3a1700';
var tierra = '#c6892f';
var llave = '#c6bc00';

var tileMap;

var protagonista;

var cambioBaldosa = false;


var escenario = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5],
    [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5],
    [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 5],
    [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5],
    [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5],
    [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
];

function dibujaEscenario(){

    for(y=0; y<20; y++) {
        for(x=0; x<20; x++) {
        
            var tile = escenario[y][x];
            ctx.drawImage(tileMap, tile*32, 0, 32, 32, anchoF*x, altoF*y, anchoF, altoF);

            if (escenario[y][x] == 5){ 
                ctx.drawImage(tileMap, 64, 32, 32, 32, anchoF*x, altoF*y, anchoF, altoF);
            }
        }
    }
}

//CLASE JUGADOR
class Jugador {
    constructor() {
        this.x = 9;
        this.y = 9;
        
        this.color = '#820c01';

        this.llave = false;
    }

    dibuja() {
        ctx.drawImage(tileMap, 32, 32, 32, 32, this.x*anchoF,this.y*altoF,anchoF,altoF);
    }

    colisionaEnemigo(x,y){
        if(this.x == x && this.y == y){
            this.muerte();
        }
    }
    
    margenes(x, y) {
        var colision = false;
        if(escenario[y][x] == 5) {
            colision = true;
        }

        return(colision);
    }

    arriba() {
        if(this.margenes(this.x, this.y-1) == false){
        this.y--;
        this.logicaObjetos();
        this.logicaObjetosDos();
        this.logicaObjetosTresArriba();
        }
    }

    abajo() {
        if(this.margenes(this.x, this.y+1) == false){
        this.y++;
        this.logicaObjetos();
        this.logicaObjetosDos();
        this.logicaObjetosTresAbajo();
        }
    }

    izquierda() {
        if(this.margenes(this.x-1, this.y) == false){
        this.x--;
        this.logicaObjetos();
        this.logicaObjetosDos();
        this.logicaObjetosTresIzquierda();
        }
    }

    derecha() {
        if(this.margenes(this.x+1, this.y) == false){
        this.x++;
        this.logicaObjetos();
        this.logicaObjetosDos();
        this.logicaObjetosTresDerecha();
        }
    }

    victoria(){
        console.log('Has ganado!');

        this.x = 1;
        this.y = 1;
        
        this.llave = false;
        escenario[8][3] = 3;
    }

    muerte(){
        console.log('Has perdido!');

        this.x = 1;
        this.y = 1;
        
        this.llave = false;
        escenario[8][3] = 3;
    }

    logicaObjetos() {
        var objeto = escenario[this.y][this.x];
        //OBTIENE LLAVE
        if(objeto == 3){
            this.llave = true;
            escenario[this.y][this.x] = 2;
            console.log('Has obtenido la llave!');
        }

        //ABRIMOS PUERTA
        if(objeto == 1 && this.llave == true){
            this.victoria();
        }
    }

    logicaObjetosDos(){
        var objeto = escenario[this.y][this.x];

        if(objeto == 0){
            escenario[this.y][this.x] = 2;
            cambioBaldosa = true;
        }
    }

    logicaObjetosTresDerecha(){
        var objeto = escenario[this.y][this.x];

        if(cambioBaldosa == true && objeto == 2 && escenario[this.y][this.x + 3] == 2 || escenario[this.y][this.x + 3] == 5){
            cambioBaldosa = false;
            escenario[this.y][this.x + 2] = 0;
        }
        if(cambioBaldosa == true && objeto == 2 && escenario[this.y][this.x + 4] == 2){
            cambioBaldosa = false;
            escenario[this.y][this.x + 3] = 0;
        }

    }
    logicaObjetosTresIzquierda(){
        var objeto = escenario[this.y][this.x];

        if(cambioBaldosa == true && objeto == 2){
            cambioBaldosa = false;
            escenario[this.y][this.x - 4] = 0;

            console.log('hola');
        }
    }
    logicaObjetosTresArriba(){
        var objeto = escenario[this.y][this.x];

        if(cambioBaldosa == true && objeto == 2){
            cambioBaldosa = false;
            escenario[this.y - 4][this.x] = 0;

            console.log('hola');
        }
    }
    logicaObjetosTresAbajo(){
        var objeto = escenario[this.y][this.x];

        if(cambioBaldosa == true && objeto == 2){
            cambioBaldosa = false;
            escenario[this.y + 4][this.x] = 0;

            console.log('hola');
        }
    }
};


function inicializa(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    setInterval(function(){
        principal();
    }, 1000/FPS);

    tileMap = new Image();
    tileMap.src = 'img/tilemap.png';

    //CREAR JUGADOR
    protagonista = new Jugador();

    //LECTURA DEL TECLADO
    document.addEventListener('keydown', function(tecla){
        if(tecla.keyCode == 38) {
            protagonista.arriba();
        }

        if(tecla.keyCode == 40) {
            protagonista.abajo();
        }

        if(tecla.keyCode == 37) {
            protagonista.izquierda();
        }

        if(tecla.keyCode == 39) {
            protagonista.derecha();
        }
    });

}

function borraCanvas(){
    canvas.width=500;
    canvas.height=500;
}

function principal(){
    borraCanvas();
    dibujaEscenario();

    protagonista.dibuja();

}