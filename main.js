let $pelicula = document.querySelector(".pelicula")
const $imagen = document.querySelector(".imagen")
const $titulo = document.querySelector(".titulo")
const $descripcion = document.querySelector(".descripcion")
const $categoria = document.querySelector(".categoria")
//template peliculas
const $$template = document.getElementById("Cartelera-pelicula").content
//template serie
const $$templateSeries = document.getElementById("Cartelera-series").content
const $fragment = document.createDocumentFragment();
//post peliculas
const $posts = document.getElementById("posts")
//post series
const $postSeries = document.getElementById("posts-series")
//elegidos serie
const $postElegidos = document.getElementById("posts-elegido")
const $postElegidoSeries = document.getElementById("posts-elegido-series")
//template articulos

const $btnVolver = document.getElementById("btn-volver")

const ajax = (options) => {
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
//function ajax
//base de datos de las peliculas con Json
const getAll = () => {
  ajax({
    url: "./JSON/Peliculas.json",
    success: (res) => {
      const $btnInicio = document.getElementById("btn-inicio")
      $btnInicio.addEventListener("click", () => {
        location.reload()
      })

      const fecha = new Date().toLocaleDateString()
      //console.log(res)

      let Max = res.Peliculas.length

      let pel_arr = []
      pel_arr.push(res.Peliculas)
      let reverse = pel_arr[0].reverse()

      reverse.forEach(el => {
        $$template.querySelector(".showArticle").setAttribute("data-articulo", el.Nombre)

        $$template.querySelector(".titulo").textContent = el.Nombre
        $$template.querySelector(".imagen").src = el.img
        $$template.querySelector(".puntos").textContent = `${el.puntos}/10`

        if(el.puntos > 6){
          $$template.querySelector(".puntos").style.backgroundColor = "green"
        }
        else{
          $$template.querySelector(".puntos").style.backgroundColor = "red"
        }

        $$template.querySelector(".categoria").innerHTML = `<i class="fas fa-hand-point-right"></i> Categoria:${el.categoria}`
        $$template.querySelector("time").textContent = fecha

        let $clone = document.importNode($$template, true);
        $fragment.appendChild($clone);
        //console.log(el.Nombre)
      })

      $postElegidos.style.display = "none"
      $posts.appendChild($fragment)


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
    },
    //configuramos el mensaje de error
    error: (err) => {
      console.log(err);
      const $error = document.createElement("h1")
      const $carrousel = document.querySelector(".carousel")
      $carrousel.style.visibility = "hidden"
      $error.textContent = "Error en conexion de base de datos "
      $error.style.backgroundColor = "red"
      $error.style.textAlign = "center"
      $error.style.marginTop = "15px"
      $error.style.fontFamily = "gagalin"
      document.querySelector(".bloque").insertAdjacentElement("afterend", $error)

      let $clone = document.importNode($error, true);
      $fragment.appendChild($clone);
      $posts.appendChild($fragment)
    }
  })
  ajax({
    url: "./JSON/Series.json",
    success: (res) => {
      const fecha = new Date().toLocaleDateString()
      //console.log(res)

      let Max = res.Series.length 
      let ser_arr = []
      ser_arr.push(res.Series)
      let reverse = ser_arr[0].reverse()

      reverse.forEach(el => {
        $$template.querySelector(".showArticle").setAttribute("data-articulo", el.Nombre)

        $$template.querySelector(".titulo").textContent = el.Nombre
        $$template.querySelector(".imagen").src = el.img
        $$template.querySelector(".puntos").textContent = `${el.puntos}/10`

        if(el.puntos > 6){
          $$template.querySelector(".puntos").style.backgroundColor = "green"
        }
        else{
          $$template.querySelector(".puntos").style.backgroundColor = "red"
        }
        $$template.querySelector(".categoria").innerHTML = `<i class="fas fa-hand-point-right"></i> Categoria:${el.categoria}`
        $$template.querySelector("time").textContent = fecha

        let $clone = document.importNode($$template, true);
        $fragment.appendChild($clone);
        //console.log(el.Nombre)
      })
      /* for (let i = 0; i < Max; i++) {
        $$templateSeries.querySelector(".showArticle").setAttribute("data-articulo", res.Series[i].Nombre)
        $$templateSeries.querySelector(".titulo").textContent = res.Series[i].Nombre
        $$templateSeries.querySelector(".imagen").src = res.Series[i].img
        $$templateSeries.querySelector(".categoria").innerHTML = `<i class="fas fa-hand-point-right"></i> Categoria:${res.Series[i].categoria}`
        $$templateSeries.querySelector("time").textContent = fecha

        let $clone = document.importNode($$templateSeries, true);
        $fragment.appendChild($clone);

      } */
      $postElegidoSeries.style.display = "none"
      $postSeries.appendChild($fragment)

    },
    //configuramos el mensaje de error
    error: (err) => {
      console.log(err);
      const $error = document.createElement("h1")
      const $carrousel = document.querySelector(".carousel")
      $carrousel.style.visibility = "hidden"
      $error.textContent = "Error en conexion de base de datos "
      $error.style.backgroundColor = "red"
      $error.style.textAlign = "center"
      $error.style.marginTop = "15px"
      $error.style.fontFamily = "gagalin"
      document.querySelector(".bloque").insertAdjacentElement("afterend", $error)

      let $clone = document.importNode($error, true);
      $fragment.appendChild($clone);
      $posts.appendChild($fragment)
    }
  })
  //destacado-mes-pelicula
  ajax({
    url: "./JSON/Destacados_mes_peliculas.json",
    success: (res) => {
      //console.log(res)


      const $root = document.querySelector(".root-carousel-peliculas")

      $root.innerHTML = `
            <div class="titulo1">Peliculas destacadas</div>
            <div id="carouselExampleDark" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="2900">
                <img src="${res.DestacadosMesPeliculas[0].img}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h2>${res.DestacadosMesPeliculas[0].nombre}</h2>
                  
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="2900">
                <img src="${res.DestacadosMesPeliculas[1].img}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h2>${res.DestacadosMesPeliculas[0].nombre}</h2>
                  
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="2900">
                <img src="${res.DestacadosMesPeliculas[2].img}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h2>${res.DestacadosMesPeliculas[2].nombre}</h2>
                  
                </div>
              </div>
            </div>
            
          </div>`

    }
  })
  //destacado-mes-serie
  ajax({
    url: "./JSON/Destacados_mes_series.json",
    success: (res) => {
      //console.log(res)
      const $root = document.querySelector(".root-carousel-series")

      $root.innerHTML = `
            <div class="titulo1">Series destacadas</div>
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="2800">
                <img src="${res.DestacadoMesSeries[0].img}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h2>${res.DestacadoMesSeries[0].nombre}</h2>
                  
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="2800">
                <img src="${res.DestacadoMesSeries[1].img}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h2>${res.DestacadoMesSeries[1].nombre}</h2>
                  
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="2800">
                <img src="${res.DestacadoMesSeries[2].img}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h2>${res.DestacadoMesSeries[2].nombre}</h2>
                  
                </div>
              </div>
            </div>
            
          </div>`
    }
  })
  //destacado-mes-infaltil
  ajax({
    url: "./JSON/Destacado_mes_infantil.json",
    success: (res) => {
      //console.log(res)
      const $root = document.querySelector(".root-carousel-infaltil")

      $root.innerHTML = `
            <div class="titulo1">Peliculas Infantiles destacadas</div>
            <div id="carouselExampleDark" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="3000">
                <img src="${res.DestacadoMesInfantil[0].img}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h2>${res.DestacadoMesInfantil[0].nombre}</h2>
                  
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <img src="${res.DestacadoMesInfantil[1].img}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h2>${res.DestacadoMesInfantil[1].nombre}</h2>
                  
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <img src="${res.DestacadoMesInfantil[2].img}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h2>${res.DestacadoMesInfantil[2].nombre}</h2>
                  
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>`

    }
  })


}

//a la carga del dom ejecutamos las
document.addEventListener("DOMContentLoaded", getAll);