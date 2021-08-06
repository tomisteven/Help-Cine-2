export default function categorias(props){
    let {Nombre, categoria, img, estreno} = props

    return `<section id="posts-elegido" class="posts">
    <template id="Cartelera-pelicula" class="cartelera">
        <article class="post-card-elegido">
            <h2 class="titulo">${Nombre}</h2>
            <img class="imagen" src="${img}" alt="">
            <p>
                <time datetime="">${estreno}</time>
            </p>
            <h2 class="categoria">${categoria}</h2>
            <p class="descripcion">Descripcion</p>
            <a href="">Ver Articulo</a>
        </article>
    </template>
</section>`
}
