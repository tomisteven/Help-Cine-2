import {
    ajax
} from "./SelectoresGenero.js"



ajax({
    url: "./JSON/Series.json",
    success: (datos) => {
        document.addEventListener("click", (e) => {
            if (e.target.matches(".showArticle")) {
                
                let articulo = e.target.getAttribute("data-articulo")
                
                //console.log(e.target.getAttribute("data-articulo"))
                //console.log(datos.Peliculas[articulo])
                function findCategorias(art) {
                    return art.Nombre == articulo
                }
                let artSeleccionada = datos.Series.filter(findCategorias)

                localStorage.setItem("articulo", artSeleccionada[0].Nombre)
                
            }
            
        })





    }
})