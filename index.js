// function getImageUrl(id) {
//   return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
// }

// getImageUrl(1);

// function renderPokemon(id, image, name) {
//   div = document.createElement("div");
//   imageTag = document.createElement("img");
//   nameTag = document.createElement("h2");

//   image.src = getImageUrl(id);
//   nameTag.innerText = name;

//   div.appendChild(imageTag);
//   div.appendChild(nameTag);

//   document.body.append(div);
// }
// Hàm lấy URL ảnh từ ID

function getImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

// Hàm render danh sách Pokémon
function renderPokemonList(pokemonData) {
  const fullItems = document.querySelector(".image__items");

  // Duyệt qua danh sách Pokémon và tạo thẻ
  pokemonData.results.forEach(({ name, url }) => {
    // const id = url.split("/").filter(Boolean).pop(); // Lấy ID cuối cùng từ URL

    const item = document.createElement("div");
    item.classList.add("pokemon-card");

    const id = url.split("/").filter(Boolean).pop();

    const idTag = document.createElement("p");
    idTag.innerText = `#${id}`;

    const imageTag = document.createElement("img");
    imageTag.src = getImageUrl(id);

    const nameTag = document.createElement("h2");
    nameTag.innerText = name;

    item.appendChild(idTag);
    item.appendChild(imageTag);
    item.appendChild(nameTag);

    fullItems.appendChild(item);
  });
}

// Gọi hàm để render danh sách
renderPokemonList(data);
