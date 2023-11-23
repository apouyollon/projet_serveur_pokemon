let g_list_pokemon = [];
let g_list_gen = [];
let g_list_type = [];

async function get_pokemon() {
    const response = await fetch("https://tyradex.vercel.app/api/v1/pokemon", {
    method: "GET"
    });
    let result = await response.json();
    g_list_pokemon = result;
    console.log(g_list_pokemon);
    }

function get_list_gen() {
    for(let i=1; i<g_list_pokemon.lenght; i++);
    


}

function get_list_type() {
    
}

get_pokemon();