let g_list_pokemon = [];
// après requete fetch à l'ouverture de la page, g_list_pokemon contient la liste de tous les pokemons
let g_list_gen = [];
let g_list_type = [];

async function get_pokemon() {
    const response = await fetch("https://tyradex.vercel.app/api/v1/pokemon", {
        // fetch permet d'aller chercher la liste de tous les pokemons
    method: "GET"
    });
    let result = await response.json();
    g_list_pokemon = result;
    // on stocke la liste des pokémons dans le tableau g_list_pokemon
    console.log(g_list_pokemon);
    }

function get_list_gen() {

}

function get_list_type() {
    for (let i=1; i<=g_list_pokemon.lenght; i++) {

    } 
    
}

function remove_duplicates_in_tab(tab){
    var tab_no_duplicates = tab.reduce(function (acc, value) {
        if (acc.indexOf(value) === -1) {
          acc.push(value);
        };
        return acc;
    }, []);
    console.log('tab no duplicates' + tab_no_duplicates);
    return tab_no_duplicates;
}

/* function remove_duplicates_in_tab(element,tab){
    // vérifie si l'élément recherché existe dans le tableau
    let is_not_in_tab = true;
    for (let i=0; i<=tab.lenght; i++) {
        if (element == tab[i]) {
            // si oui, on change la valeur
            is_not_in_tab = false;
        }
    }
    if (is_not_in_tab == true) {
        // si la valeur de la variable booléenne n'a pas changé, 
        // l'élément n'est pas dans le tableau, on peut l'introduire
        tab.push(element);
    }
} */

get_pokemon();