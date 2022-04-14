// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const submenu = document.querySelector('.submenu');
const notificaciones = document.querySelector('.notificacion-contenedor');
let articulosCarrito = [];

// Listeners
cargarEventListeners();
function cargarEventListeners(){
  document.addEventListener('DOMContentLoaded', obtenerCursos);

  // Cuando agregas un curso presionando el botón "Agregar al Carrito"
  listaCursos.addEventListener('click', agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso);

  // Btn Vaciar Carrito
  vaciarCarrito.addEventListener('click', () => {
    // Primero reseteamos el arreglo del carrito para que quede vacío
    articulosCarrito = [];

    // Segundo, eliminamos todo el HTML
    limpiarHTML();
  });
}

// ------------------- Funciones --------------------------- //
function agregarCurso(e){
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')){
    // Seleccionamos el card contenedor
    const cursoSeleccionado = e.target.parentElement.parentElement;
    
    const existeAlerta = document.querySelector('.container-mensaje');

    if(!existeAlerta){

      const mensajeContainer =document.createElement('div');
      mensajeContainer.classList.add('container-mensaje');

      const divMensaje = document.createElement('div');
      divMensaje.classList.add('mensaje');
      divMensaje.textContent = 'Curso agregado con éxito al carrito';

      mensajeContainer.appendChild(divMensaje);
      document.querySelector('body').appendChild(mensajeContainer);

      setTimeout(() => {
        mensajeContainer.remove();
      }, 5000);
    }

    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(e){

  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');

    // const existe = articulosCarrito.some( curso => curso.cantidad > 1 && curso.cantidad > 0);
    // if(existe){
    //   // Actualizamos la cantidad
    //   const cursos = articulosCarrito.map( curso => {
    //   if(curso.id === cursoId){
    //     curso.cantidad--;
    //     return curso; // Retorna el objeto actualizado
    //   }else{
    //     return curso; // Retorna los objetos que no son duplicados
    //   }
    // });
    // }else{
    //   // Eliminar del arreglo articuloCarrito por el data-id
    //   articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
    //   console.log(articulosCarrito);
    // }

    // Eliminar del arreglo articuloCarrito por el data-id
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
    // console.log(articulosCarrito);

    // Llamar la función que itera sobre el carrito original para que muestre el carrito actualizado
    carritoHTML();
  }
}

// Leer el contenido del HTML al que le dimos click y extrae información del curso
function leerDatosCurso(curso){

  // Crear un objeto con el contenido del curso seleccionado
  const infoCurso = {
    image: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  // Comprobar si el curso ya existe en el carrito:
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
  if(existe){
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map( curso => {
      if(curso.id === infoCurso.id){
        curso.cantidad++;
        return curso; // Retorna el objeto actualizado
      }else{
        return curso; // Retorna los objetos que no son duplicados
      }
    } );
    articulosCarrito = [...cursos];
  }else{
    // Agregamos al carrito
    // Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  // console.log(articulosCarrito);
  carritoHTML();
}


// Muestra el carrito de compras en el HTML
function carritoHTML(){

  // Limpiar el HTML
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach( curso => {
    // Desestructuro el objeto
    const { image, precio, titulo, cantidad, id } = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${image}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos del tbody
function limpiarHTML(){
  // Forma lenta:
  // contenedorCarrito.innerHTML = '';

  // Forma más rápida para mejorar el performance:
  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

// Obtener los cursos del json
function obtenerCursos(){
  mostrarCursos(cursos);
}

// Mostrar los Cursos en el DOM
function mostrarCursos(cursos){
  const row1 = document.querySelector('#row-1');
  const row2 = document.querySelector('#row-2');
  const row3 = document.querySelector('#row-3');
  const row4 = document.querySelector('#row-4');

  cursos.forEach(curso => {
    const {nombre, precio, tutor, valoracion, oferta, id} = curso;

    const div = document.createElement('div');
    div.classList.add('four', 'columns');

    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('imagen-curso', 'u-full-width');
    img.src = `img/curso${id}.jpg`;

    const infoCard = document.createElement('div');
    infoCard.classList.add('info-card');

    const nombreCurso = document.createElement('h4');
    nombreCurso.textContent = nombre;
    const tutorCurso = document.createElement('p');
    tutorCurso.textContent = tutor;
    const imgValoracion = document.createElement('img');
    imgValoracion.src = 'img/estrellas.png';
    const valoracionCurso = document.createElement('span');
    valoracionCurso.textContent = ` ${valoracion}`;
    const precioCurso = document.createElement('p');
    precioCurso.classList.add('precio');
    precioCurso.innerHTML = `
      $${precio}
      <span class="u-pull-right">$${oferta}</span>
    `;
    const boton = document.createElement('a');
    boton.href = '#';
    boton.classList.add('u-full-width', 'button-primary', 'button', 'input', 'agregar-carrito');
    boton.dataset.id = id;
    boton.textContent = 'Agregar Al Carrito';

    // Agregar información del curso al infoCard
    infoCard.appendChild(nombreCurso);
    infoCard.appendChild(tutorCurso);
    infoCard.appendChild(imgValoracion);
    infoCard.appendChild(valoracionCurso);
    infoCard.appendChild(precioCurso);
    infoCard.appendChild(boton);

    // Agregar elementos a la tarjeta
    divCard.appendChild(img);
    divCard.appendChild(infoCard);

    // Agregar la tarjeta al contenedor principal
    div.appendChild(divCard);

    // Agregar el div a la fila
    if(id === 1 || id === 2 || id === 3){
      row1.appendChild(div);
    }else if(id === 4 || id === 5 || id === 6){
      row2.appendChild(div);
    }else if(id === 7 || id === 8 || id === 9){
      row3.appendChild(div);
    }else if(id === 10 || id === 11 || id === 12){
      row4.appendChild(div);
    }
  });
}