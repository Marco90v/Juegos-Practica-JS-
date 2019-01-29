var canva = document.getElementById('ventana');
var contx = canva.getContext('2d');
var imagenes = 'space.jpg';
var fondo;
var naveIMG = 'nave.png';
var n;
var teclado = {};
var juego = {
    estado: 'iniciando'
};
//array para los disparos
var disparos = [];

//arary disparos enemigos
var disparosEnemigos = [];

fondo = new Image();
fondo.src = imagenes;

n = new Image();
n.src = naveIMG;

//areglo que almacena los enemigos
var enemigos = [];
//mi nave
var nave = {
        x: (canva.width / 2) - 25,
        y: canva.height - 60,
        width: 50,
        height: 50,
        contador: 0,
        img: 'nave.png'
    }
    //cargar fondo
function cargar_fondo() {
    contx.drawImage(fondo, 0, 0, 1000, 500);
    //canva.width = canva.width;
}

//cargar nave
function cargar_nave() {
    // contx.save()
    // contx.fillStyle="white";
    // contx.fillRect(nave.x,nave.y,nave.width,nave.height);
    // contx.restore()
    contx.drawImage(n, nave.x, nave.y, nave.width, nave.height);
}
//cargar eventos de teclados
function event_teclado() {
    agregarEvento(document, "keydown", function(e) {
        //Ponemos en true la tecla presionada
        teclado[e.keyCode] = true;
        //console.log(e.keyCode);
    });
    agregarEvento(document, "keyup", function(e) {
        //Ponemos en false la tecla que dejo de ser presionado
        teclado[e.keyCode] = false;
    });


    function agregarEvento(elemento, nombreEvento, funcion) {
        if (elemento.addEventListener) {
            //Navegadores de verdad
            elemento.addEventListener(nombreEvento, funcion, false);
        } else if (elemento.attchEvent) {
            //intenet explorer
            elemento.attchEvent(nombreEvento, funcion);
        }

    }

}

//mover nave
function moverNave() {
    if (teclado[37]) {
        //movimiento a la izquierda
        nave.x -= 6;
        if (nave.x <= 0) nave.x = 0;
    }
    if (teclado[39]) {
        //movimiento a la derecha
        var limite = canva.width - nave.width;
        nave.x += 6;
        if (nave.x > limite) nave.x = limite;
    }
    if (teclado[32]) {
        //Disparos
        if (!teclado.fire) {
            fire();
            teclado.fire = true;
        }
    } else teclado.fire = false;

    if (nave.estado == 'hit') {
        nave.contador++;
        if (nave.contador >= 20) {
            nave.contador = 0,
                nave.estado = 'muerto';
            juego.estado = 'perdido';
        }
    }
}


//disparo mi nave
function fire() {
    disparos.push({
        x: nave.x + 20,
        y: nave.y - 10,
        width: 10,
        height: 30,
        estad: 0
    });
}
//mover disparos
function moverDisparos() {
    for (var i in disparos) {
        var disparo = disparos[i];
        disparo.y -= 2;
    }
    disparos = disparos.filter(function(disparo) {
        return disparo.y > 0;
    });
}
//dibujar mis disparos
function dibujarDisparos() {
    contx.save();
    contx.fillStyle = 'white';
    for (var i in disparos) {
        var disparo = disparos[i];
        //ctx.drawImage(imgDisparo,disparo.x, disparo.y,disparo.width,disparo.height);
        contx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height);
    }
    contx.restore();
}

//datos de enemigo
function dat_enemi() {
    //agregar disparos enemigos
    function agregarDisparosEnemigos(enemigo) {
        return {
            x: enemigo.x,
            y: enemigo.y,
            width: 10,
            height: 33,
            contador: 0
        }
    }

    //carga posicion de los enemigos
    if (juego.estado == 'iniciando') {
        for (var i = 0; i < 10; i++) {
            enemigos.push({
                x: 10 + (i * 50),
                y: 10,
                height: 40,
                width: 40,
                estado: 'vivo',
                contador: 0
            });
        }
        juego.estado = 'jugando';
    }


    //movimiento de enemigos
    for (var i in enemigos) {
        var enemigo = enemigos[i];
        if (!enemigo) continue;
        if (enemigo && enemigo.estado == 'vivo') {
            enemigo.contador++;
            enemigo.x += Math.sin(enemigo.contador * Math.PI / 90) * 8;
            /*if(enemigo.x >= canva.width)
            {vel_enemi.mov = -6;}
            else if (enemigo.x <= canva.width)
            {vel_enemi.mov=6;}
            enemigo.x += parseInt(Math.random()* vel_enemi.mov)*/

            if (aleatorio(0, enemigos.length * 10) == 4) {
                disparosEnemigos.push(agregarDisparosEnemigos(enemigo));
            }
        }
    }
    enemigos = enemigos.filter(function(enemigo) {
        if (enemigo && enemigo.estado != 'muerto') return true;
        return false;
    });

}

function aleatorio(inferior, superior) {
    var posibilidades = superior - inferior;
    var a = Math.random() * posibilidades;
    a = Math.floor(a);
    return parseInt(inferior) + a;
}

//dibujar disparos enemigos
function dibujarDisparosEnemigos() {
    for (i in disparosEnemigos) {
        var disparo = disparosEnemigos[i];
        contx.save();
        contx.fillStyle = 'red';
        contx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height)
        contx.restore();
    }
}

//mover disparos enemigos
function moverDisparosEnemigos() {
    for (i in disparosEnemigos) {
        var disparo = disparosEnemigos[i];
        disparo.y += 4;
    }
    disparosEnemigos = disparosEnemigos.filter(function(disparo) {
        return disparo.y < canva.height
    });
}

//dibujar enemigo
function dibujarEnemigos() {
    for (var i in enemigos) {
        var enemigo = enemigos[i];


        if (enemigo.estado == 'vivo') contx.fillStyle = 'red';
        //if(enemigo.estado == 'muerto') contx.fillStyle = 'black';
        //ctx.drawImage(imgEnemigo,enemigo.x,enemigo.y,enemigo.width,enemigo.height);
        contx.save();
        contx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height);
        contx.restore()
    }
}


//calculo del golpe
function hit(a, b) {
    var hit = false;
    if (b.x + b.width >= a.x && b.x < a.x + a.width) {
        if (b.y + b.height >= a.y && b.y < a.y + a.height) {
            hit = true;
        }
    }
    if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
        if (b.y <= a.y && b.y + b.height >= a.y + a.height) {
            hit = true;
        }
    }
    if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
        if (a.y <= b.y && a.y + a.height >= b.y + b.height) {
            hit = true;
        }
    }
    return hit;
}

//verificar contacto
function verificarContacto() {
    for (var i in disparos) {
        var disparo = disparos[i];
        for (j in enemigos) {
            var enemigo = enemigos[j];
            if (hit(disparo, enemigo)) {
                enemigo.estado = 'muerto';
                enemigo.contador = 0;
                disparo.estad = 1;
            }
        }
    }
    disparos = disparos.filter(function(disparo) {
        return disparo.estad < 1;
    });

    if (nave.estado == 'hit' || nave.estado == 'muerto') return;
    for (var i in disparosEnemigos) {
        var disparo = disparosEnemigos[i];
        if (hit(disparo, nave)) {
            nave.estado = 'hit';
            console.log('contacto');
        }
    }
}







//ejecutar una ves carge el navegar
window.addEventListener('load', init);

function init() {
    event_teclado();
    var interval = window.setInterval(cargar, 1000 / 60);
    //cargar();
}

//funcion a ejecutar
function cargar() {
    //requestAnimationFrame(cargar);
    cargar_fondo();
    moverNave();
    dat_enemi();
    moverDisparos();
    moverDisparosEnemigos();
    verificarContacto();
    dibujarDisparosEnemigos();
    cargar_nave();
    dibujarDisparos();
    dibujarEnemigos();
}


//cargar_nave();