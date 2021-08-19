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

const $sectionArticle = document.getElementById("section-articulo")
const $fragment = document.createDocumentFragment()
const $template = document.getElementById("template-articulo-peliculas").content



ajax({
    url: "./JSON/Peliculas.json",
    success: (datos) => {
        //console.log(datos.Peliculas);

        let articulo = localStorage.getItem("articulo");
        console.log(articulo);

        let Catseleccionada = datos.Peliculas.filter(item => item.Nombre.toLowerCase().includes(localStorage.getItem("articulo").toLowerCase()))

        Catseleccionada.forEach(item => {
            //console.log(item);
            $template.querySelector(".img-articulo").src = item.img
            $template.querySelector(".titulo-articulo").textContent = item.Nombre
            $template.querySelector(".categoria-articulo").textContent = `Categoria: ${item.categoria}`
            $template.querySelector(".director-articulo").textContent = `Director: ${item.director}`
            $template.querySelector(".reseña-articulo").textContent = `Descripcion: ${item.reseña}`
            $template.querySelector(".actores-articulo").textContent = `Actores: ${item.actores}`
            $template.querySelector(".puntos").textContent = item.puntos
            
            //clonamos todos los posts
            let $clone = document.importNode($template, true);
            //los agregamos al fragmento
            $fragment.appendChild($clone);
        })
        $sectionArticle.appendChild($fragment)

        const $btn_cerrar = document.getElementById("btn-cerrar")
        $btn_cerrar.addEventListener("click", () => {
            localStorage.removeItem("articulo")
            window.close()
        })


    }
})