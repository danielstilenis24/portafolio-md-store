const grid = new Muuri('.grid', {
    layout: {   
        rounding: false
      }
});

window.addEventListener('load', () =>
{
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');


    //-----------------AGREGAMOS LA CATEGORIA POR ENLACE----------------
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach( (elemento) =>
     {
           //console.log(elemento)  //ME TRAE TODOS LOS ELEMENTOS
           //ME TRE LOS ELEMENTOS AL QUE LE DOY CLICK
            elemento.addEventListener('click', (evento) =>
         {
                evento.preventDefault();
                //console.log(evento.target); ESTO ME MUESTRA QUE AL HACERLE CLICK ME TRAE LOS ATRIBUTOS
                enlaces.forEach((enlace) => enlace.classList.remove('activo'));
                //console.log(evento.target)
               evento.target.classList.add('activo');

                const categoria = evento.target.innerHTML; //.toLowerCase();
                console.log(categoria);
                categoria === 'Todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`); 
        });        
    });

    //------------AGREAMOS CATEGORIA PARA LA BARRA DE BUSQUEDAD--------------
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        console.log(busqueda)
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda));
    });

    //AGREGAMOS LISTENES PARA IMAGENES
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( (elemento) => {
        elemento.addEventListener('click', () => {
                 const ruta =elemento.getAttribute('src');
                 const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
                 overlay.classList.add('activo');
                 document.querySelector('#overlay img').src =ruta;
                 document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        })
    });

    //boton de cerrar

    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });
});
