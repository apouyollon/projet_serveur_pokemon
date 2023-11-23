let g_list_pokemon = [];
// après requete fetch à l'ouverture de la page, g_list_pokemon contient la liste de tous les pokemons
let g_list_gen = [];
let g_list_type = [];

async function get_pokemon(callback_1,callback_2) {
    const response = await fetch("https://tyradex.vercel.app/api/v1/pokemon", {
        // fetch permet d'aller chercher la liste de tous les pokemons
    method: "GET"
    });
    let result = await response.json();
    g_list_pokemon = result;
    // on stocke la liste des pokémons dans le tableau g_list_pokemon
    console.log(g_list_pokemon);
    callback_1(result);
    // on envoie la réponse du serveur à une nouvelle fonction
    // qui ne récupérera qu'une partie des valeurs du tableau
    callback_2(result);
    }

function get_list_gen(p_tab_pokemon) {
    console.log(p_tab_pokemon);
    // création d'un tableau intermédiaire ne contenant que le champs génération
    var interim_gen_tab = [];
    for (let i=1; i<=p_tab_pokemon.length-1; i++) {
    // ne parcourir le tableau qu'à partir  du deuxième élément (pas de pokemon pour l'Id 0)
        interim_gen_tab.push(p_tab_pokemon[i].generation);
    }
    console.log(interim_gen_tab);
    g_list_gen = remove_duplicates_in_tab(interim_gen_tab);
    // remove_duplicates_in_tab renvoie un nouveau tableau (tab_no_duplicates)
    console.log(g_list_gen);
}

function get_list_type(p_tab_pokemon) {
    
    return;    
}

function remove_duplicates_in_tab(p_tab){
    var tab_no_duplicates = p_tab.reduce(function (acc, value) {
        if (acc.indexOf(value) === -1) {
          acc.push(value);
        };
        return acc;
    }, []);
    console.log(tab_no_duplicates);
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

get_pokemon(get_list_gen, get_list_type);