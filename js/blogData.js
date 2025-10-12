document.addEventListener("DOMContentLoaded", function () {
  // Leer parámetro ID de la URL
  const params = new URLSearchParams(window.location.search);
  const articuloId = parseInt(params.get("id"));

  // Si no hay id en la URL, mostrar error o redirigir
  if (!articuloId) {
    document.getElementById("blog-container").innerHTML = "<p>Artículo no encontrado</p>";
    return;
  }

  // Cargar artículos desde JSON
  fetch("assets/json/articulos.json")
    .then(response => response.json())
    .then(data => {
      // Buscar el artículo por ID
      const articulo = data.find(a => a.id === articuloId);

      if (!articulo) {
        document.getElementById("blog-container").innerHTML = "<p>Artículo no encontrado</p>";
        return;
      }

      // Renderizar contenido
      let html = `
        <article class="mb-5">
          <h3 class="text-secondary">${articulo.titulo}</h3>
          <p class="text-muted"><small>Publicado el ${articulo.fecha}</small></p>
          <img src="${articulo.imagen}" alt="${articulo.titulo}" class="img-fluid rounded mb-4">
      `;

      articulo.contenido.forEach(parrafo => {
        html += `<p>${parrafo}</p>`;
      });

      html += "</article>";

      document.getElementById("blog-container").innerHTML = html;
    })
    .catch(error => {
      console.error("Error cargando el JSON", error);
      document.getElementById("blog-container").innerHTML = "<p>Error cargando el artículo</p>";
    });
});
