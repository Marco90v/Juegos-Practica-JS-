var canvas = document.getElementById('Tabla');
var ctx = canvas.getContext('2d');
ctx.canvas.width = '640';
ctx.canvas.height = '640';
var tama = 80;
var estado = 'iniciando';
var colo = true;
var mouseX, mouseY;
var selec = false;
var imgpn = new Image();
var imgpb = new Image();
var imgtn = new Image();
var imgtb = new Image();
var imgcn = new Image();
var imgcb = new Image();
var imgan = new Image();
var imgab = new Image();
var imgReinaN = new Image();
var imgReinaB = new Image();
var imgReyN = new Image();
var imgReyB = new Image();
var micolor = 'blanco';
var piesas = ['alfil blanco.png',
    'alfil negro.png',
    'caballo blanco.png',
    'caballo negro.png',
    'peon blanco.png',
    'peon negro.png',
    'reina blanca.png',
    'reina negra.png',
    'rey blanco.png',
    'rey negro.png',
    'torre blanca.png',
    'torre negra.png'
];
var alfilB = new Image();
var peonesB = [];
var peonesN = [];
var torresN = [];
var torresB = [];
var torresN = [];
var torresB = [];
var caballosN = [];
var caballosB = [];
var alfilesN = [];
var alfilesB = [];
var reinaN = {
    img: 0,
    x: 0,
    y: 0,
    s: false
};
var reinaB = {
    img: 0,
    x: 0,
    y: 0,
    s: false
};
var reyN = {
    img: 0,
    x: 0,
    y: 0,
    s: false
};
var reyB = {
    img: 0,
    x: 0,
    y: 0,
    s: false
};
/*
ctx.moveTo(0,80);
ctx.lineTo(canvas.width,80);
ctx.stroke();
*/
ctx.strokeStyle = 'grey';
ctx.fillStyle = 'grey';

function cargar() {

    preloader = new PreloadJS();
    preloader.onProgress = progresoCarga;
    of();

}

function of()

{
    while (piesas.length > 0) {
        var piesa = piesas.shift();
        preloader.loadFile(piesa);
    }
}


function progresoCarga() {
    console.log(parseInt(preloader.progress * 100) + "%");
    if (preloader.progress == 1) {
        crear();
    }
}

function crear() {
    if (estado == 'iniciando') {
        estado = 'iniciado';

        //AGREGA PEONES
        imgpn.src = 'peon negro.png'
        imgpb.src = 'peon blanco.png'
        for (i = 0; i < 8; i++) {
            peonesN.push({
                tipo: 'peon', //TIPO DE OBJETO, PEON, TORRE, CABALLO, ETC
                nm: 0, //NUMERO DE MOVIMIENTO
                img: imgpn, //IMAGEN A DIBUJAR
                x: i * 80, //POSICION EN X
                y: 80, //POSICION EN Y
                e: 'vivo', //ESTADO DEL OBJETO, VIVO O MUERTO
                s: false //ESTADO DE SELECCION, TRUE O FALSE (SELECCIONADO O NO)
            })
            peonesB.push({
                tipo: 'peon',
                nm: 0,
                img: imgpb,
                x: i * 80,
                y: 480,
                e: 'vivo',
                s: false
            })
        }

        //AGREGA TORRES
        imgtn.src = 'torre negra.png';
        imgtb.src = 'torre blanca.png';
        for (i = 0; i < 2; i++) {
            torresN.push({
                tipo: 'torre',
                img: imgtn,
                x: i * 560,
                y: 0,
                e: 'vivo',
                s: false
            })
            torresB.push({
                tipo: 'torre',
                img: imgtb,
                x: i * 560,
                y: 560,
                e: 'vivo',
                s: false
            })
        }

        //AGREGA CABALLOS
        imgcn.src = 'caballo negro.png';
        imgcb.src = 'caballo blanco.png';
        for (i = 0; i < 2; i++) {
            caballosN.push({
                tipo: 'caballo',
                img: imgcn,
                x: 80 + (i * 400),
                y: 0,
                e: 'vivo',
                s: false
            })
            caballosB.push({
                tipo: 'caballo',
                img: imgcb,
                x: 80 + (i * 400),
                y: 560,
                e: 'vivo',
                s: false
            })
        }

        //AGREGA ALFIL
        imgan.src = 'alfil negro.png';
        imgab.src = 'alfil blanco.png';
        for (i = 0; i < 2; i++) {
            alfilesN.push({
                tipo: 'alfil',
                img: imgan,
                x: 160 + (i * 240),
                y: 0,
                e: 'vivo',
                s: false
            })
            alfilesB.push({
                tipo: 'alfil',
                img: imgab,
                x: 160 + (i * 240),
                y: 560,
                e: 'vivo',
                s: false
            })
        }

        //AGREGA REINA
        imgReinaN.src = 'reina negra.png';
        imgReinaB.src = 'reina blanca.png';

        reinaN.img = imgReinaN;
        reinaN.x = 240;
        reinaN.y = 0;

        reinaB.img = imgReinaB;
        reinaB.x = 240;
        reinaB.y = 560;

        //AGREGAR REY    
        imgReyN.src = 'rey negro.png';
        imgReyB.src = 'rey blanco.png';

        reyN.img = imgReyN;
        reyN.x = 320;
        reyN.y = 0;

        reyB.img = imgReyB;
        reyB.x = 320;
        reyB.y = 560;

        dibujar();
    }
}

//EVENTO DE RATON
//canvas.mousedown()
canvas.onmousedown = function(e) {
    var mX, mY;
    if (e.offsetX) {
        mX = e.offsetX;
        mY = e.offsetY;
    } else if (e.layerX) {
        mX = e.layerX;
        mY = e.layerY;
    }

    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (mX >= i * 80 && mX <= (i + 1) * 80) {
                if (mY >= j * 80 && mY <= (j + 1) * 80) {
                    //console.log('x: ' + i*80 + ' y: ' + j*80);
                    if (veriSelec(i * 80, j * 80)) {
                        mouseX = i * 80;
                        mouseY = j * 80;
                        canvas.width = canvas.width;
                        limpEnem();
                        dibujar();
                        ctx.save();
                        ctx.strokeStyle = 'red';
                        ctx.strokeRect(i * 80, j * 80, tama, tama);
                        ctx.restore();
                    } else if (selec) {
                        mover(i * 80, j * 80);
                        mouseX = i * 80;
                        mouseY = j * 80;
                        canvas.width = canvas.width;
                        limpEnem();
                        dibujar();
                    } else {
                        canvas.width = canvas.width;
                        limpEnem();
                        dibujar();
                    }
                }
            }
        }
    }
};


function qui(objLimp) {
    for (var i in objLimp) {
        var oL = objLimp[i];
        oL.s = false;
    }
}

function quiSele() {
    qui(peonesB);
    qui(peonesN);
    qui(torresB);
    qui(torresN);
    qui(caballosB);
    qui(caballosN);
    qui(alfilesB);
    qui(alfilesN);
}


function veri(objReco, x, y) {
    for (var i in objReco) {
        var oR = objReco[i];
        if (oR.x == x && oR.y == y && oR.s == false) {
            if (!selec) {
                quiSele();
                oR.s = true;
                selec = true;
                return true;
            } else {
                quiSele();
                oR.s = true;
                selec = true;
                return true;
            }
        } else if (oR.x == x && oR.y == y && oR.s == true) {
            quiSele();
            selec = false;
            oR.s = false;
            return false;
        }
        //selec=false;
        //console.log(oR.x + ' '+ oR.y + ' '+ oR.s);
    }
}

function veriSelec(x, y) {
    if (micolor == 'blanco') {
        if (veri(peonesB, x, y)) return true;
        if (veri(torresB, x, y)) return true;
        if (veri(caballosB, x, y)) return true;
        if (veri(alfilesB, x, y)) return true;
    } else {
        if (veri(peonesN, x, y)) return true;
        if (veri(torresN, x, y)) return true;
        if (veri(caballosN, x, y)) return true;
        if (veri(alfilesN, x, y)) return true;
    }
}


function objSelec(objReco, x, y) {
    for (var i in objReco) {
        var oR = objReco[i];
        if (oR.s) {
            if (oR.tipo == 'peon') {
                if (oR.nm == 0) {
                    if (y >= oR.y - 160 && y < oR.y && x == oR.x) {
                        oR.x = x;
                        oR.y = y;
                        oR.nm = 1;
                        oR.s = false;
                        selec = false;
                    } else if ((y >= oR.y - 80 && y < oR.y) && ((x >= oR.x && x <= oR.x + 80) || (x <= oR.x && x >= oR.x - 80))) {
                        if (contEnem(x, y)) {
                            oR.x = x;
                            oR.y = y;
                            oR.s = false;
                            selec = false;
                        }
                    }
                } else {
                    if (y >= oR.y - 80 && y < oR.y && x == oR.x) {
                        oR.x = x;
                        oR.y = y;
                        oR.s = false;
                        selec = false;
                    } else if ((y >= oR.y - 80 && y < oR.y) && ((x >= oR.x && x <= oR.x + 80) || (x <= oR.x && x >= oR.x - 80))) {
                        /*selec=false;
                        oR.s=false;  */
                        if (contEnem(x, y)) {
                            oR.x = x;
                            oR.y = y;
                            oR.s = false;
                            selec = false;
                        }

                    }
                }
            }
            if (oR.tipo == 'torre') {
                if ((y != oR.y && x == oR.x) || (y == oR.y && x != oR.x)) {
                    if (!contEnem(x, y)) {
                        if (!veriContYo(oR.x, oR.y, x, y)) {
                            oR.x = x;
                            oR.y = y;
                            oR.s = false;
                            selec = false;
                        }
                    } else {
                        oR.x = x;
                        oR.y = y;
                        oR.s = false;
                        selec = false;
                    }
                }
            }
        }
    }
}

function mover(x, y) {
    if (micolor == 'blanco') {
        objSelec(peonesB, x, y);
        objSelec(torresB, x, y);
    } else {
        objSelec(peonesN, x, y);
    }
}

function contEnem(x, y) {
    if (recEnem(peonesN, x, y)) return true;
}

function veriContYo(Xx, Yy, x, y) {
    if (contYo(peonesB, x, y, Xx, Yy)) return true;
    if (contYo(torresB, x, y, Xx, Yy)) return true;
}

function contYo(objRec, x, y, Xx, Yy) {
    for (var i in objRec) {
        var oR = objRec[i];
        if (((y < oR.y && Yy > oR.y) || (y > oR.y && Yy < oR.y)) && ((x == oR.x) || (Xx == oR.x))) return true;
        if (((x > oR.x && Xx < oR.x) || (x < oR.x && Xx > oR.x)) && ((y == oR.y) || (Yy == oR.y))) return true;
    }
}

function recEnem(objRec, x, y) {
    for (var i in objRec) {
        var oR = objRec[i];
        if (x == oR.x && y == oR.y) {
            oR.e = 'muerto';
            return true;
        }
    }
}


function limpEnem() {
    peonesN = peonesN.filter(function(peones) {
        if (peones && peones.e != 'muerto') return true;
        return false;
    });
}


//DIBUJAR TODOS LOS ELEMENTOS
function dibujar() {
    //DIBUJAR TABLA
    for (var j = 0; j < 8; j++) {
        for (var i = 0; i < 8; i++) {
            if (colo) {
                ctx.save();
                ctx.strokeStyle = 'grey';
                ctx.strokeRect(i * 80, j * 80, tama, tama);
                ctx.restore();
                if (i < 7) colo = false;
            } else {
                ctx.save();
                ctx.fillStyle = 'grey';
                ctx.fillRect(i * 80, j * 80, tama, tama);
                ctx.restore();
                if (i < 7) colo = true;
            }
        }
    }

    //DIBUJAR PEONES
    for (var i in peonesN) {
        var pn = peonesN[i];
        ctx.drawImage(pn.img, pn.x, pn.y, 80, 80);
    }
    for (var i in peonesB) {
        var pb = peonesB[i];
        ctx.drawImage(pb.img, pb.x, pb.y, 80, 80);
    }

    //DIBUJA TORRES
    for (var i in torresN) {
        var tn = torresN[i];
        ctx.drawImage(tn.img, tn.x, tn.y, 80, 80);
    }
    for (var i in torresB) {
        var tb = torresB[i];
        ctx.drawImage(tb.img, tb.x, tb.y, 80, 80);
    }

    //DIBUJA CABALLOS
    for (var i in caballosN) {
        var cn = caballosN[i];
        ctx.drawImage(cn.img, cn.x, cn.y, 80, 80);
    }
    for (var i in caballosB) {
        var cb = caballosB[i];
        ctx.drawImage(cb.img, cb.x, cb.y, 80, 80);
    }

    //DIBUJA ALFIL
    for (var i in alfilesN) {
        var an = alfilesN[i];
        ctx.drawImage(an.img, an.x, an.y, 80, 80);
    }
    for (var i in alfilesB) {
        var ab = alfilesB[i];
        ctx.drawImage(ab.img, ab.x, ab.y, 80, 80);
    }

    //DIBUJA REINA
    ctx.drawImage(reinaN.img, reinaN.x, reinaN.y, 80, 80);
    ctx.drawImage(reinaB.img, reinaB.x, reinaB.y, 80, 80);

    //DIBUJA REY
    ctx.drawImage(reyN.img, reyN.x, reyN.y, 80, 80);
    ctx.drawImage(reyB.img, reyB.x, reyB.y, 80, 80);
}



window.addEventListener('load', init);

function init() {
    crear();
    //cargar();
    //progresoCarga();
}