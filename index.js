let g_list_pokemon = [];
// après requete fetch à l'ouverture de la page, g_list_pokemon contient la liste de tous les pokemons
let g_list_gen = [];
let g_list_type = [];


// requête Fetch
async function get_pokemon(callback_1,callback_2) {
    const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon', {
    // fetch permet d'aller chercher la liste de tous les pokemons
    method: "GET"
    });
    let result = await response.json();
    // créer un nouveau tableau dont on supprime le premier élément (pas de pokemon pour l'Id 0)
    let new_result =result.slice(1);
    g_list_pokemon = new_result;
    // on stocke la liste des pokémons dans le tableau g_list_pokemon
    console.log(g_list_pokemon);
    callback_1(new_result);
    // on envoie la réponse du serveur à une nouvelle fonction
    // qui ne récupérera qu'une partie des valeurs du tableau
    callback_2(new_result);
}






// fonctions get_list_ : obtenir les différents types et générations
function get_list_gen(p_tab_pokemon) {
    // console.log(p_tab_pokemon);
    // création d'un tableau intermédiaire ne contenant que le champs génération
    var interim_gen_tab = [];
    for (let i=0; i<p_tab_pokemon.length; i++) {
        interim_gen_tab.push(p_tab_pokemon[i].generation);
    }
    // console.log(interim_gen_tab);
    g_list_gen = remove_duplicates_in_tab(interim_gen_tab);
    // remove_duplicates_in_tab renvoie un nouveau tableau (tab_no_duplicates)
    console.log(g_list_gen);
    show_list_gen();
}

function get_list_type(p_tab_pokemon) {
    var interim_type_tab = [];
    for (let i=0; i<p_tab_pokemon.length; i++) {
        for (let j=0; j<p_tab_pokemon[i].types.length; i++) {
            interim_type_tab.push(p_tab_pokemon[i].name);
        }
    }
    g_list_type = remove_duplicates_in_tab(interim_type_tab);
    console.log(g_list_type);
    show_list_gen();
}

function remove_duplicates_in_tab(p_tab){
    // permet de supprimer les doublons d'un tableau
    var tab_no_duplicates = p_tab.reduce(function (acc, value) {
        if (acc.indexOf(value) === -1) {
          acc.push(value);
        };
        return acc;
    }, []);
    // console.log(tab_no_duplicates);
    return tab_no_duplicates;
}







// fonctions show_list_ : permettent d'afficher les listes et les pokémons correspondants
function show_list_gen() {
    // affiche une liste contenant toutes les générations de pokemon
    for (let i=0; i<g_list_gen.length; i++){
        let list_gen_elem = `<li onclick='show_pokemons_in_list_gen(`+g_list_gen[i]+`)' 
        class='list_box'>Génération ` + g_list_gen[i] + `<ul id='generation_` + g_list_gen[i]+ `'></ul></li>`;
        $('#list_gen').append(list_gen_elem);
    }
    // créer les différentes listes de pokemons
    for (let i=0; i<=g_list_gen.length; i++){
        var list_gen_pokemons = g_list_pokemon.filter(e=>e.generation == g_list_gen[i]);
        // console.log(list_gen_pokemons);
        for (let j=0; j<list_gen_pokemons.length; j++){
            let pokemon_gen_elem = `<li onclick='show_pokemons_details(` + list_gen_pokemons[j].pokedexId + `)' 
            class='pokemon_name'>` + list_gen_pokemons[j].name.fr + `</li>`;
            // Listes pokemons cachées par défaut
            $('#generation_'+ g_list_gen[i]).append(pokemon_gen_elem).hide();
        }
    }
}

function show_pokemons_in_list_gen(p_generation) {
    //affiche les noms des pokemons d'une génération précise
    console.log(p_generation);
    for (let i=0; i<g_list_gen.length; i++){
        // ne garder affichée qu'une génération à la fois     
        if (g_list_gen[i] == p_generation) {
            $('#generation_' + g_list_gen[i]).slideToggle(750);
        } 
        else {
            $('#generation_' + g_list_gen[i]).slideUp(750);
        }
    }    
}

function show_list_type() {
    // affiche une liste contenant toutes les générations de pokemon
    for (let i=0; i<g_list_type.length; i++){
        let list_type_elem = `<li onclick='show_pokemons_in_list_gen(`+g_list_type[i]+`)' 
        class='list_box'>Type ` + g_list_type[i] + `<ul id='type_` + g_list_type[i]+ `'></ul></li>`;
        $('#list_gen').append(list_type_elem);
    }
    for (let i=0; i<=g_list_type.length; i++){
        var list_type_pokemons = g_list_pokemon.filter(e=>e.types == g_list_type[i]);
        console.log(list_type_pokemons);
        for (let j=0; j<list_type_pokemons.length; j++){
            let pokemon_type_elem = `<li onclick='show_pokemons_details(` + list_type_pokemons[j].pokedexId + `)' 
            class='pokemon_name'>` + list_type_pokemons[j].name.fr + `</li>`;
            $('#type_'+ g_list_type[i]).append(pokemon_type_elem).hide();
        }
    }
}

function show_pokemons_in_list_type(p_type) {
    console.log(p_type);
    for (let i=0; i<g_list_type.length; i++){  
        if (g_list_gen[i] == p_generation) {
            $('#type_' + g_list_type[i]).slideToggle(750);
        } 
        else {
            $('#type_' + g_list_type[i]).slideUp(750);
        }
    }    
}








// fonctions show_pokemons_ : affichent les fiches d'un pokémon dans une div
function show_pokemons_details(p_id) {
    return;
}

function show_pokemons_reduct(p_id) {
    return;
}





get_pokemon(get_list_gen, get_list_type);