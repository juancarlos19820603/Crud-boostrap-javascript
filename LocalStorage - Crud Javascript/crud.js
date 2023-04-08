//Validar los datos ingresados en el formulario
function validarFormulario(){

    let id = document.querySelector("#id").value;
    //querySelector devueleve el elemento que coincide con el identificador llamado, en este caso su id, por eso el simbolo #
    let nombre = document.querySelector("#name").value;
    let direccion = document.querySelector("#direccion").value;
    let email = document.querySelector("#email").value;

    //Validar que ningun campo este vacio y ssi esta vacio enviar una alerta
    if (id === ""  || nombre === "" || direccion === "" || email ==="")
    {
        alert("Todos los datos son requeridos para guardar la información");
        return false;
    }
        return true;   
}

//Crear una funcion para mostrar los datos enviados a traves del formulario
function mostrarDatos(){
    let listaDatos;
    /* Pequeña concexión a la base de datos local proporcionada por los navegadores 
        esta base de datos se llama localStorage  */
    if ( localStorage.getItem("listaDatos")==null) 
    {
        listaDatos = []; /* si esta vacio */
    }   
    else /* si no esta vacio se guardan en formato JSON */
    {
        listaDatos=JSON.parse(localStorage.getItem("listaDatos"));
        /* JSON es un formato de intercambio de Datos, va a mostrar los datos con su campo y valor */
    }
    let html = "";
    listaDatos.forEach( function ( element, index ){
        html += "<tr>"; /* +=  se denomina commo un operador de asigancion compuesta y sirve para sumarle cantidad al validarFormulario
                           de una variable, -= en vez de sumaar lo que hace es restar */

        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.direccion + "</td>";
        html += "<td>" + element.email + "</td>";

        html += '<td> <button class = "btn btn-warning m-2" onclick="updateData('+index+')">Editar</button>'
        html += '<td> <button class = "btn btn-danger m-2"  onclick="deleteData('+index+')">Eliminar</button>'
        html += "</tr>"
    });
    document.querySelector("#TablaDatos tbody").innerHTML = html;
}

 /* cargar todos los datos cuando el documento o la pagina se recargue */
 document.onload = mostrarDatos();

/* Crear la funcion para guardar los datos del formulario */
function GuardarDatos()
{
    if ( validarFormulario() == true)
    {
       
    let id = document.querySelector("#id").value;
    let nombre = document.querySelector("#name").value;
    let direccion = document.querySelector("#direccion").value;
    let email = document.querySelector("#email").value;
    let listaDatos;
    if ( localStorage.getItem("listaDatos")==null){
        listaDatos = [];
    }
    else
    {
        listaDatos = JSON.parse(localStorage.getItem("listaDatos"));
       /*  JSON.parse analiza una caadena de texto como JSON, transformando el valor 
        parsear un valor o un objeto es sinonimo de leer las partes que componen una estructura
        para asi recorrerla en cualquier lugar del codigo */
    }
    listaDatos.push({
        "id":id,
        "nombre":nombre,
        "direccion":direccion,
        "email":email
    });
    localStorage.setItem("listaDatos", JSON.stringify(listaDatos));
    /* JSON.stringify convierte un objeto o valor en una cadena JSON */
    mostrarDatos();
    document.querySelector("#id").value="";
    document.querySelector("#name").value="";
    document.querySelector("#direccion").value="";
    document.querySelector("#email").value="";
  }
}
//Crear funcion para eliminar los datos del local storage
function deleteData(index)
{
    let listaDatos;
    if ( localStorage.getItem ("listaDatos") == null)
    {
        listaDatos = [];
    }
    else 
    {
        listaDatos=JSON.parse(localStorage.getItem('listaDatos'));
    }
    listaDatos.splice(index, 1);
    localStorage.setItem("listaDatos", JSON.stringify(listaDatos));
    mostrarDatos();
}

//Crear funcion editar datos
function updateData(index)
{
    //1.Vamos a esconder el boton de guardar y el boton de actualizar aparece para actualizar los datos del local storage
    document.getElementById('Submit').style.display='none';
    document.getElementById('Update').style.display='block';
    let listaDatos;
    if ( localStorage.getItem ("listaDatos") == null)
    {
        listaDatos = [];
    }
    else 
    {
        listaDatos=JSON.parse(localStorage.getItem('listaDatos'));
    }
    //2. Llamamos a los datos almacenados y los mostramos en el formulario para editarlos
    document.querySelector("#id").value=listaDatos[index].id;
    document.querySelector("#name").value=listaDatos[index].nombre;
    document.querySelector("#direccion").value=listaDatos[index].direccion;
    document.querySelector("#email").value=listaDatos[index].email;

    document.querySelector("#Update").onclick=function()
    {
        if(validarFormulario()==true)
        {
            listaDatos[index].id = document.querySelector("#id").value;
            listaDatos[index].name = document.querySelector("#name").value;
            listaDatos[index].direccion = document.querySelector("#direccion").value;
            listaDatos[index].email = document.querySelector("#email").value;
            localStorage.setItem("listaDatos", JSON.stringify(listaDatos));
            mostrarDatos();

            //Vaciar los input
            document.querySelector("#id").value="";
            document.querySelector("#name").value="";
            document.querySelector("#direccion").value="";
            document.querySelector("#email").value="";

            //Ya cuando se hace todo el proceso de actualizar vamos a mostrar de nuevo el boton
            //de guardar y ese de actualizar se debe ocultar
            document.getElementById('Submit').style.display='block';
            document.getElementById('Update').style.display='none';
          }
        }
    }
 
      function filtrarTabla() {
        // Obtener el input del filtro y la tabla
        const input = document.getElementById("busqueda");
        const tabla = document.getElementById("TablaDatos");
      
        // Obtener las filas de la tabla
        const filas = tabla.getElementsByTagName("tr");
      
        // Recorrer las filas de la tabla y ocultar las que no coincidan con el filtro
        for (let i = 0; i < filas.length; i++) {
          const celdas = filas[i].getElementsByTagName("td");
          let coincide = false;
          for (let j = 0; j < celdas.length; j++) {
            const celda = celdas[j];
            if (celda) {
              const texto = celda.textContent || celda.innerText;
              if (texto.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                coincide = true;
                break;
              }
            }
          }
          filas[i].style.display = coincide ? "" : "none";
        }
      }
      
      // Agregar el evento keyup al input del filtro
      const inputFiltro = document.getElementById("busqueda");
      inputFiltro.addEventListener("keyup", filtrarTabla);
      