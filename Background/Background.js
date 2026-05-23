let circles = [];
let totalWebHeight = 0;

function setup() {
    // Creamos el canvas al tamaño de la ventana visible
    let canvas = createCanvas(windowWidth, windowHeight);
    
    // Lo clavamos de fondo
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');

    // Calculamos el alto total real de TODA tu página web (incluyendo el scroll)
    // Usamos una pequeña tolerancia por si la página tarda un milisegundo en cargar el HTML
    setTimeout(() => {
        actualizarDimensionesEstructurales();
    }, 100);
}

function actualizarDimensionesEstructurales() {
    // Captura la altura total del body con todos tus proyectos renderizados
    totalWebHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    
    // Limpiamos si había círculos antes
    circles = []; 
    
    // Generamos 15 círculos únicos y diferentes repartidos por TODA la altura de la web
    for (let i = 0; i < 40; i++) {
        circles.push(new BouncingCircle(totalWebHeight));
    }
}

function draw() {
    background(30, 30, 36); 

    // CAPTURA DIRECTA (Sin Lerp ni Delay): El valor es exactamente el mismo que el del navegador
    let scrollYActual = window.scrollY;

    // Dibujamos la grilla y los círculos pasando el scroll directo
    drawGrid(scrollYActual);

    for (let c of circles) {
        c.update(totalWebHeight);
        c.display(scrollYActual);
    }
}

// Si el usuario cambia el tamaño de la ventana, recalculamos todo el mapa de la web
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    actualizarDimensionesEstructurales();
}

// Grilla técnica continua
function drawGrid(offsetY) {
    stroke(255, 255, 255, 5); 
    strokeWeight(1);
    
    for (let i = 0; i < width; i += 32) {
        line(i, 0, i, height);
    }
    
    // Desplazamiento matemático directo para que las líneas sigan el scroll 1:1
    let desplazamientoY = offsetY % 32;
    
    for (let j = -32; j < height + 32; j += 32) {
        line(0, j - desplazamientoY, width, j - desplazamientoY);
    }
}

// Clase de Círculos distribuidos por todo el mapa de la página web
class BouncingCircle {
    constructor(altoMaximoWeb) {
        this.pos = createVector(random(width), random(altoMaximoWeb));
        this.vel = createVector(random(-0.4, 0.4), random(-0.4, 0.4));
        this.radius = random(150, 350);
    }

    update(altoMaximoWeb) {
        this.pos.add(this.vel);

        // Rebote en los bordes laterales de la pantalla
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }
        
        // Rebote en el techo real de la web (0) y en el fondo real de toda tu página (altoMaximoWeb)
        if (this.pos.y < 0 || this.pos.y > altoMaximoWeb) {
            this.vel.y *= -1;
        }
    }

    display(offsetY) {
        // Dibujamos restando el scroll directo. 
        // Si el círculo está en la sección de "Animación 3D", solo se va a pintar cuando su Y coincida con el scroll de esa sección.
        noStroke();
        fill(255, 255, 255, 4); 
        ellipse(this.pos.x, this.pos.y - offsetY, this.radius);
    }
}