// function getImageUrl(id) {
//   return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
// }

// // Hàm render danh sách Pokémon
// function renderPokemonList(pokemonData) {
//   const fullItems = document.querySelector(".image__items");

//   // Duyệt qua danh sách Pokémon và tạo thẻ
//   pokemonData.results.forEach(({ name, url }) => {
//     const item = document.createElement("div");
//     item.classList.add("pokemon-card");

//     const id = url.split("/").filter(Boolean).pop();

//     const idTag = document.createElement("p");
//     idTag.innerText = `#${id}`;

//     const imageTag = document.createElement("img");
//     imageTag.src = getImageUrl(id);

//     const nameTag = document.createElement("h2");
//     nameTag.innerText = name;

//     item.appendChild(idTag);
//     item.appendChild(imageTag);
//     item.appendChild(nameTag);

//     fullItems.appendChild(item);
//   });
// }

// // Gọi hàm để render danh sách
// renderPokemonList(data);
const app = document.querySelector(".app");
const button = document.querySelector("button");
const input = document.querySelector("input");

function fetchPromise(URL) {
  return new Promise(function (resolve) {
    fetch(URL)
      .then(function (response) {
        const promise = response.json();
        resolve(promise);
      })
      .catch(function (error) {
        console.log(error);
        app.innerHTML = "Oh no! Something went wrong.";
      });
  });
}

let offset = 0;
const limit = 5;
let pokemons = JSON.parse(localStorage.getItem("pokemonsData"));
let filteredPokemon = pokemons;
let pokemonType = [];

if (pokemons && Array.isArray(pokemons) && pokemons.length) {
  render();
} else {
  fetchPromise("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898")
    .then(function (value) {
      app.innerHTML = "";
      pokemons = value.results;
      filteredPokemon = value.results;

      localStorage.setItem("pokemonsData", JSON.stringify(pokemons));

      return Promise.all(pokemonType);
    })
    .then((results) => {
      render();
    });
}

function render() {
  const renderLimit = offset + limit;
  for (; offset < renderLimit; offset++) {
    const pokemon = filteredPokemon[offset];
    if (!pokemon) {
      button.style.display = "none";
      break;
    } else {
      button.style.display = "block";
    }
    pokemonType.push(fetchPromise(pokemon.url));

    const div = document.createElement("div");
    div.innerText = pokemon.name;

    // display id
    const pokemonId = pokemon.url.split("/")[6];
    const idDiv = document.createElement("span");
    idDiv.innerText = `#${pokemonId}`;
    app.appendChild(idDiv);
    app.innerText += ` `;

    // Fetch and display types
    fetchPromise(pokemon.url).then((pokemonData) => {
      const typesDiv = document.createElement("div");
      typesDiv.innerText = ` ${pokemonData.types
        .map((type) => type.type.name)
        .join(", ")}`;
      div.appendChild(typesDiv);
    });

    app.appendChild(div);
  }
}

button.addEventListener("click", render);

input.addEventListener("input", function () {
  offset = 0;
  app.innerHTML = "";
  filteredPokemon = pokemons.filter(function (pokemon) {
    return pokemon.name.toLowerCase().includes(input.value.toLowerCase());
  });
  render();
});

Promise.all(pokemonType).then((results) => {
  console.log(results);
  results.forEach((pokemon) => {
    console.log(pokemon.types);
  });
});
