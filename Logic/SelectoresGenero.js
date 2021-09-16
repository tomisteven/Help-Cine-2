const $$template = document.getElementById("Cartelera-pelicula").content
const $$templateSeries = document.getElementById("Cartelera-series").content
const $fragment = document.createDocumentFragment();
const $posts = document.getElementById("posts")
const $postSeries = document.getElementById("posts-series")

const $postElegidos = document.getElementById("posts-elegido")
const $postElegidoSeries = document.getElementById("posts-elegido-series")

const $btnVolver = document.getElementById("btnVolver")

const $sectionArticulos = document.getElementById("section-articulo")
export const ajax = (options) => {
  let {
    url,
    method,
    success,
    error,
    data
  } = options;

  //creamos nueva peticion
  const xhr = new XMLHttpRequest();

  //verificamos si el status es correcto
  xhr.addEventListener("readystatechange", e => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      success(json);
    } else {
      //mensaje de error si encuentra uno
      let message = xhr.statusText || "Ocurrió un error";
      error(`Error ${xhr.status}: ${message}`);
    }
  });

  xhr.open(method || "GET", url);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8"); //cabecera 
  xhr.send(JSON.stringify(data));

}
ajax({
  url: "./JSON/Peliculas.json",
  success: (res) => {
    //console.log(res);
    //console.log(res.Peliculas);

    const $selector = document.querySelectorAll(".selectores")
    //const genero_Arr = []
    //guardamos el genero de los selectores
    //console.log(genero_Arr)
    $selector.forEach(el => {
      //al arreglo le introducimos los selectores
      //genero_Arr.push(el.textContent)
      //por cada selector creamos un boton click
      el.addEventListener("click", e => {
        e.preventDefault()
        //limpia el array que contiene las categorias elegidas en los selectores
        $postElegidos.innerHTML = ""
        //console.log(res)
        //funcion que depende el selector que clickeamos busca su pareja en las categorias
        function findCategorias(cat) {
          return cat.categoria == e.target.textContent
        }
        //guarda las coincidencias de los selectores y categorias
        let Catseleccionada = res.Peliculas.filter(findCategorias)
        console.log(Catseleccionada)
        //sino manda una alerta que no encontro la pelicula
        if (Catseleccionada.length == 0) {
          $postElegidos.innerHTML = ""
          $posts.style.display = "flex"
          
          //si hay pelicula que coincida con el selector la imprime en pantalla
        } else {
          
          Catseleccionada.forEach((el) => {

            $$template.querySelector(".showArticle").setAttribute("data-articulo", el.Nombre)

            $$template.querySelector(".titulo").textContent = el.Nombre
            $$template.querySelector(".imagen").src = el.img
            $$template.querySelector(".puntos").textContent =  `${el.puntos}/10`
            if(el.puntos > 6){
              $$template.querySelector(".puntos").style.backgroundColor = "green"
            }
            else{
              $$template.querySelector(".puntos").style.backgroundColor = "red"
            }

            $$template.querySelector(".categoria").innerHTML = `<i class="fas fa-hand-point-right"></i> &nbsp; Categoria: &nbsp;${el.categoria}`
            $$template.querySelector("time").textContent = el.Estreno
            
            //clonamos todos los posts
            let $clone = document.importNode($$template, true);
            //los agregamos al fragmento
            $fragment.appendChild($clone);
          })
          //imprimimos el fragmento
          $postElegidos.style.display = "flex"
          $postElegidos.appendChild($fragment)
          //ocultamos todos los posts
          $posts.style.display = "none"
          $postElegidos.classList.add("select")
        }
        
        //siguiente paso: IMPRIMIR LOS POST : HECHO -CORREGIR BUG DE IMPRESION DE POSTS --HECHO
        //FUNCION DE CARGAR MAS PELICULAS
      })
      $btnVolver.addEventListener("click", () => {
          
        //peliculas
        $postElegidos.innerHTML = ""
        $postElegidos.style.display = "none"
        $posts.style.display = "flex"
        //series
        $postElegidoSeries.innerHTML = ""
        $postElegidoSeries.style.display = "none"
        $postSeries.style.display = "flex"
       })
    })
  }
})
ajax({
  url: "./JSON/Series.json",
  success: (res) => {
    //console.log(res);
    //console.log(res.Peliculas);

    const $selector = document.querySelectorAll(".selectores")
    const genero_Arr = []
    //guardamos el genero de los selectores
    //console.log(genero_Arr)
    $selector.forEach(el => {
      //al arreglo le introducimos los selectores
      genero_Arr.push(el.textContent)
      //por cada selector creamos un boton click
      el.addEventListener("click", e => {
        e.preventDefault()
        //limpia el array que contiene las categorias elegidas en los selectores
        $postElegidoSeries.innerHTML = ""
        //console.log(res)
        //funcion que depende el selector que clickeamos busca su pareja en las categorias
        function findCategorias(cat) {
          return cat.categoria == e.target.textContent
        }
        //guarda las coincidencias de los selectores y categorias
        let Catseleccionada = res.Series.filter(findCategorias)
        console.log(Catseleccionada)
        //sino manda una alerta que no encontro la pelicula
        if (Catseleccionada.length == 0) {
          $postSeries.style.display = "flex"
          $postElegidoSeries.innerHTML = ""
          
          
        } else {
          Catseleccionada.forEach((el) => {
            $$templateSeries.querySelector(".showArticle").setAttribute("data-articulo", el.Nombre)

            $$templateSeries.querySelector(".titulo").textContent = el.Nombre
            $$templateSeries.querySelector(".imagen").src = el.img
            $$templateSeries.querySelector(".categoria").innerHTML = `<i class="fas fa-hand-point-right"></i> &nbsp; Categoria: &nbsp;${el.categoria}`
            $$templateSeries.querySelector("time").textContent = el.Estreno

            $$templateSeries.querySelector(".puntos").textContent =  `${el.puntos}/10`
            if(el.puntos > 6){
              $$template.querySelector(".puntos").style.backgroundColor = "green"
            }
            else{
              $$template.querySelector(".puntos").style.backgroundColor = "red"
            }



            //clonamos todos los posts
            let $clone = document.importNode($$templateSeries, true);
            //los agregamos al fragmento
            $fragment.appendChild($clone);
          })
          //imprimimos el fragmento
          $postElegidoSeries.style.display = "flex"
          $postElegidoSeries.appendChild($fragment)
          //ocultamos todos los posts
          $postSeries.style.display = "none"
          $postElegidoSeries.classList.add("select")
          //articulo
          
        }
        //voton de volver
         $btnVolver.addEventListener("click", () => {
          
          //peliculas
          $postElegidos.innerHTML = ""
          $postElegidos.style.display = "none"
          $posts.style.display = "flex"
          //series
          $postElegidoSeries.innerHTML = ""
          $postElegidoSeries.style.display = "none"
          $postSeries.style.display = "flex"
         })
          
         
        //siguiente paso: IMPRIMIR LOS POST : HECHO -CORREGIR BUG DE IMPRESION DE POSTS --HECHO
        //FUNCION DE CARGAR MAS PELICULAS
      })
    })
  }
})