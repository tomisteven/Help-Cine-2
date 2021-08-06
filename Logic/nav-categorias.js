import {
    ajax
} from "./SelectoresGenero.js";

const $navSelectores = document.querySelectorAll(".nav-selectores")
let $pelicula = document.querySelector(".pelicula")
const $imagen = document.querySelector(".imagen")
const $titulo = document.querySelector(".titulo")
const $descripcion = document.querySelector(".descripcion")
const $categoria = document.querySelector(".categoria")

const $$template = document.getElementById("Cartelera-pelicula").content
const $fragment = document.createDocumentFragment();
const $posts = document.getElementById("posts")
const $postElegidos = document.getElementById("posts-elegido")



ajax({
    url: "./JSON/Peliculas.json",
    success: (data) => {
        //console.log(data)

        $navSelectores.forEach(function (navSelectores) {
            navSelectores.addEventListener("click", function (e) {
                //e.preventDefault()

                //$postElegidos.innerHTML = ""
                function findCategorias(cat) {
                    return cat.categoria == e.target.textContent
                }
                let Catseleccionada = data.Peliculas.filter(findCategorias)
                console.log(Catseleccionada)

                if (Catseleccionada.length == 0) {
                    alert("No hay peliculas con ese genero")
                    //si hay pelicula que coincida con el selector la imprime en pantalla
                  } else {
                    
                    Catseleccionada.forEach((el) => {
                      
                      $$template.querySelector(".titulo").textContent = el.Nombre
                      $$template.querySelector(".imagen").src = el.img
                      $$template.querySelector(".categoria").innerHTML = `<i class="fas fa-hand-point-right"></i> &nbsp; Categoria: &nbsp;${el.categoria}`
                      $$template.querySelector("time").textContent = el.Estreno
                      //clonamos todos los posts
                      let $clone = document.importNode($$template, true);
                      //los agregamos al fragmento
                      $fragment.appendChild($clone);
                      
                    })
                    //imprimimos el fragmento
                    
                    $postElegidos.appendChild($fragment)
                    //ocultamos todos los posts
                    $postElegidos.style.display = "flex"
                    $posts.style.display = "none"
                    
                    
                    
                    
                  }






            })
        })



    }
})
ajax({
    url: "./JSON/Series.json",
    success: (data) => {
        //console.log(data)

        $navSelectores.forEach(function (navSelectores) {
            navSelectores.addEventListener("click", function (e) {
                //e.preventDefault()

                //$postElegidos.innerHTML = ""
                function findCategorias(cat) {
                    return cat.categoria == e.target.textContent
                }
                let Catseleccionada = data.Series.filter(findCategorias)
                console.log(Catseleccionada)

                if (Catseleccionada.length == 0) {
                    alert("No hay peliculas con ese genero")
                    //si hay pelicula que coincida con el selector la imprime en pantalla
                  } else {
                    
                    Catseleccionada.forEach((el) => {
                      
                      $$templateSeries.querySelector(".titulo").textContent = el.Nombre
                      $$templateSeries.querySelector(".imagen").src = el.img
                      $$templateSeries.querySelector(".categoria").innerHTML = `<i class="fas fa-hand-point-right"></i> &nbsp; Categoria: &nbsp;${el.categoria}`
                      $$templateSeries.querySelector("time").textContent = el.Estreno
                      //clonamos todos los posts
                      let $clone = document.importNode($$templateSeries, true);
                      //los agregamos al fragmento
                      $fragment.appendChild($clone);
                      
                    })
                    //imprimimos el fragmento
                    
                    $postElegidoSeries.appendChild($fragment)
                    //ocultamos todos los posts
                    $postElegidoSeries.style.display = "flex"
                    $postSeries.style.display = "none"
                  }
            })
        })
    }
})