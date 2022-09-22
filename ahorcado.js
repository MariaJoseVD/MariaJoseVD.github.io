let palabras = ['ANGEL','BOLETA','DESTINO','PAN','HTML','COSTUMBRE', 'ELEGANTE','FENOMENO','GLORIA','JUVENTUD','MODERNO', 'OMBLIGO','PEDESTAL','RUMEANTE','SOLTAR','PROGRAMA','VAQUERO','ZEBRA','MODAL','ESPIRITU','FRACCION','ZOMBIE'];
let palabraSecreta = "";
let nuevaPalabra = "";
let numeroErrores = 0; 
let numeroAciertos = 0;
 
document.getElementById("imagen").style.display = 'none';
document.getElementById('voler_a_jugar').style.display = 'none';
document.getElementById('el-teclado').style.display = 'none';
document.getElementById('palabra_a_adivinar').style.display = 'none';

// por fin resultó 
function restaurar(){ 
    for( let i = 0; i < btnLetras.length ; i++ ){
        btnLetras[ i ].disabled = false;
    }
    const source = `images/img${numeroErrores}.png`;
    imagen.src = source;
    btnLetras.innerHTML = '';
    numeroErrores = 0; 
    numeroAciertos = 0;
}

function id(str){
    return document.getElementById(str);
}

function guiones(){
    const parrafo = id ('palabra_a_adivinar'); 
    parrafo.innerHTML = '';
    const cant_palabras = palabras.length;
    const cantidad_de_letras = palabraSecreta.length;

    for( let i = 0; i< cantidad_de_letras; i++){
    const span = document.createElement('span');
    parrafo.appendChild(span); 
    }
}

// el random de palabras
function escojerPalabraSecreta(){
    let palabra = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase(); // Math.floor rendondea hacia abajo
    palabraSecreta = palabra
    console.log(palabraSecreta)
}

function anhadir(){
    const agregado = document.getElementById('nueva-palabra').value;
    if(agregado.length >= 3){
        palabras.push(agregado.toUpperCase());
    }if(agregado.length == 0){
        //alert("ESCRIBE UNA PALABRA"); // esto no quiere
    }
    console.log(agregado)
}

function push(){
    anhadir()
    alert("PALABRA GUARDADA"); 
}

function botonAgregar(){
    document.getElementById('nueva-palabra').style.display = 'initial';
    document.getElementById('insertar').style.display = 'none';
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('push-palabra').style.display = 'initial'; 
}

function desistir(){
    document.getElementById('iniciar').style.display = 'block';
    document.getElementById('insertar').style.display = 'block';
    document.getElementById('imagen').style.display = 'none';
    document.getElementById('voler_a_jugar').style.display = 'none';
    document.getElementById('el-teclado').style.display = 'none';
    document.getElementById('palabra_a_adivinar').style.display = 'none';
}

function nuevoJuejo(){
    restaurar()
    iniciarJuego()
}

function iniciarJuego(){
    document.getElementById('iniciar').style.display = 'none';
    document.getElementById('insertar').style.display = 'none';
    document.getElementById('imagen').style.display = 'initial';
    document.getElementById('voler_a_jugar').style.display = 'initial';
    document.getElementById('el-teclado').style.display = 'initial';
    document.getElementById('palabra_a_adivinar').style.display = 'initial';
    numeroErrores = 0; 
    numeroAciertos = 0;
    
    escojerPalabraSecreta()
    guiones()
    restaurar()

} 

// teclado y sus letritas
const btnLetras = document.querySelectorAll("#letras button");
for( let i = 0; i < btnLetras.length ; i ++){
    btnLetras[ i ].addEventListener( 'click', click_letras);  
}

function click_letras(event){
    const spans = document.querySelectorAll('#palabra_a_adivinar span');
    const button = event.target; //cual button toca
    button.disabled = true; 

    const letra = button.innerHTML.toLocaleUpperCase(); 
    const palabra = palabraSecreta.toLocaleUpperCase();

    let acerto = false;
    for (let i =0; i < palabra.length; i++){
        if(letra == palabra[i]){ 
            spans[i].innerHTML = letra;
            numeroAciertos++;
            acerto = true;
        }
    }  
    if( acerto == false ){
        numeroErrores++;
        const source = `images/img${numeroErrores}.png`;
        imagen.src = source;
    };
    if( numeroErrores == 9 ){
        alert('Perdiste, la palabra era ' + palabraSecreta);
        game_over();
    }else if( numeroAciertos == palabraSecreta.length ){
        alert("Felicitaciones GANASTE");
    }
    //console.log('la letra' + letra + 'en la palabra' + palabra + 'existe?:' + acerto)
}  

function game_over(){
    for( let i = 0; i < btnLetras.length ; i++ ){
        btnLetras[ i ].disabled = true;
    }
}
// almost die in the process, pero se logró