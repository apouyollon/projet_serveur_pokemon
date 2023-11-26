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
    // génère la fiche d'un pokémon tiré aléatoirement entre 1 et la longueur du tableau
    // à chaque rechargement de la page ou à chaque arrivée sur la page d'accueil
    show_pokemons_reduct(Math.floor(Math.random() * g_list_pokemon.length)+1);
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
        // création d'un deuxième tableau pour parcourir plusieurs éléments
        var type_array = p_tab_pokemon[i].types;
        for (let j=0; j<type_array.length; j++) {
            interim_type_tab.push(type_array[j].name);
        }
    }
    g_list_type = remove_duplicates_in_tab(interim_type_tab);
    console.log(g_list_type);
    show_list_type();
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
        let list_type_elem = `<li onclick='show_pokemons_in_list_type("`+ g_list_type[i] +`")' 
        class='list_box'>Type ` + g_list_type[i] + `<ul id='type_` + g_list_type[i]+ `'></ul></li>`;
        $('#list_type').append(list_type_elem);
    }
    // récupérer chaque type
    for (let i=0; i<g_list_type.length; i++){
        var list_type_pokemons = [];
        // pour chaque type, comparer chaque pokemon
        for (let k=0; k<g_list_pokemon.length; k++){
            // pour chaque pokemon, récuérer chaque type
            var pokemon_type_array = g_list_pokemon[k].types;
            // ajouter au tableau list_type_pokemons ceux correspondant à g_list_type[i]
            var interim_list_type = pokemon_type_array.filter(e=>e.name == g_list_type[i]);
            if (interim_list_type.length >= 1) {
                list_type_pokemons.push(g_list_pokemon[k]);
            }
        }
        // console.log(list_type_pokemons);     
        for (let j=0; j<list_type_pokemons.length; j++){
            let pokemon_type_elem = `<li onclick='show_pokemons_details(` + list_type_pokemons[j].pokedexId + `)' 
            class='pokemon_name'>` + list_type_pokemons[j].name.fr + `</li>`;
            $('#type_'+ g_list_type[i]).append(pokemon_type_elem).hide();
        }
    }
}

function show_pokemons_in_list_type(p_type) {
    for (let i=0; i<g_list_type.length; i++){  
        if (g_list_type[i] == p_type) {
            $('#type_' + g_list_type[i]).slideToggle(750);
        } 
        else {
            $('#type_' + g_list_type[i]).slideUp(750);
        }
    }    
}








// fonctions show_pokemons_ : affichent les fiches d'un pokémon dans une div
function show_pokemons_details(p_id) {
    var pokemon_to_show = g_list_pokemon.filter((e) => e.pokedexId==p_id)[0];
    console.log(pokemon_to_show);

    let pokemon_detail = template_reduct_pokemon(pokemon_to_show);

    $('#pokemon_details').html(pokemon_detail);
    
    // n'afficher les évolutions que si elles existent
    if (pokemon_to_show.evolution.pre != null){
        if (pokemon_to_show.evolution.pre.length == 2) {
            let evolution_precedente = `<div class='evolution'>
            <h3>Evolutions précédentes : </h3> 
            <p>`+ pokemon_to_show.evolution.pre[0].name +`</p>
            <img src='`+ g_list_pokemon.filter((e) => e.pokedexId == (pokemon_to_show.evolution.pre[0].pokedexId))[0].sprites.regular +`'  
            onclick='show_pokemons_details(`+ pokemon_to_show.evolution.pre[0].pokedexId +`)' class='images_evolution'/>
            <p>`+ pokemon_to_show.evolution.pre[1].name +`</p>
            <img src='`+ g_list_pokemon.filter((e) => e.pokedexId == (pokemon_to_show.evolution.pre[1].pokedexId))[0].sprites.regular +`'  
            onclick='show_pokemons_details(`+ pokemon_to_show.evolution.pre[1].pokedexId +`)' class='images_evolution'/>
            </div>`;
            // image cliquable rechargeant la fonction pour afficher l'évolution
            $('#pokemon_details').append(evolution_precedente);  
        }
        else {
            let evolution_precedente = `<div class='evolution'>
            <h3>Evolution précédente : </h3> 
            <p>`+ pokemon_to_show.evolution.pre[0].name +`</p>
            <img src='`+ g_list_pokemon.filter((e) => e.pokedexId == (pokemon_to_show.evolution.pre[0].pokedexId))[0].sprites.regular +`'  
            onclick='show_pokemons_details(`+ pokemon_to_show.evolution.pre[0].pokedexId +`)' class='images_evolution'/>
            </div>`;
            // image cliquable rechargeant la fonction pour afficher l'évolution
            $('#pokemon_details').append(evolution_precedente);
        }   
    }

    if (pokemon_to_show.evolution.next != null){
        if (pokemon_to_show.evolution.next.length == 2) {
            let evolution_suivante = `<div class='evolution'>
            <h3>Evolutions suivantes : </h3>
            <p>`+ pokemon_to_show.evolution.next[0].name +`</p> 
            <img src='`+ g_list_pokemon.filter((e) => e.pokedexId == (pokemon_to_show.evolution.next[0].pokedexId))[0].sprites.regular +`'
            onclick='show_pokemons_details(`+ pokemon_to_show.evolution.next[0].pokedexId +`)' class='images_evolution'/> 
            <p>`+ pokemon_to_show.evolution.next[1].name +`</p>
            <img src='`+ g_list_pokemon.filter((e) => e.pokedexId == (pokemon_to_show.evolution.next[1].pokedexId))[0].sprites.regular +`'
            onclick='show_pokemons_details(`+ pokemon_to_show.evolution.next[1].pokedexId +`)' class='images_evolution'/>
            </div>`;
            $('#pokemon_details').append(evolution_suivante);
        }
        else {
            let evolution_suivante = `<div class='evolution suivante'>
            <h3>Evolution suivante : </h3>
            <p>`+ pokemon_to_show.evolution.next[0].name +`</p>
            <img src='`+ g_list_pokemon.filter((e) => e.pokedexId == (pokemon_to_show.evolution.next[0].pokedexId))[0].sprites.regular +`'
            onclick='show_pokemons_details(`+ pokemon_to_show.evolution.next[0].pokedexId +`)' class='images_evolution'/>
            </div>`;
            $('#pokemon_details').append(evolution_suivante);  
        }
    }
}

function show_pokemons_reduct(p_id) {
    var pokemon_to_show = g_list_pokemon.filter((e) => e.pokedexId==p_id)[0];
    console.log(pokemon_to_show);
    let pokemon_reduct = template_reduct_pokemon(pokemon_to_show);
    $('#pokemon_reduct').html(pokemon_reduct);
}

function template_reduct_pokemon(pokemon_to_show) {
    // création de 2 versions en fonction du nombre de types des pokémons
    if (pokemon_to_show.types.length == 2) {
        let pokemon_template = `<div class='pokemon_description'>
        <img src='`+ pokemon_to_show.sprites.regular +`' class='image_pokemon'/> 
        <h3>Nom : `+ pokemon_to_show.name.fr +`</h3>
        <p>Numéro : `+ pokemon_to_show.pokedexId +`</p>
        <p>Types : `+ pokemon_to_show.types[0].name +` / `+ pokemon_to_show.types[1].name +` </p> 
        <img src='`+ pokemon_to_show.types[0].image +`' class='image_type'/>
        <img src='`+ pokemon_to_show.types[1].image +`' class='image_type'/>
        <p>Génération : `+ pokemon_to_show.generation +`</p>
        </div>`;
        return pokemon_template;
    }
    else {
        let pokemon_template = `<div class='pokemon_description'>
        <img src='`+ pokemon_to_show.sprites.regular +`' class='image_pokemon'/> 
        <h3>Nom : `+ pokemon_to_show.name.fr +`</h3>
        <p>Numéro : `+ pokemon_to_show.pokedexId +`</p>
        <p>Type : `+ pokemon_to_show.types[0].name +`</p> 
        <img src='`+ pokemon_to_show.types[0].image +`' class='image_type'/> 
        <p>Génération : `+ pokemon_to_show.generation +`</p>
        </div>`;
        return pokemon_template;
    }
}




// fonctions : formulaire de recherche
$(document).ready(function(){
    $("#button_go").click(function() {
        let search = document.querySelector('#searchbar').value;
        let option = document.querySelector('#searchselect').value;
        console.log(search);
        console.log(option);
        let search_tab = [];
        // console.log(search_tab);
        if (option=='nom') {
            const regex = new RegExp(search);
            search_tab = g_list_pokemon.filter((e)=> regex.test(e.name.fr));
        }
        else if (option=='numero') {
            const regex = new RegExp(search);
            search_tab = g_list_pokemon.filter((e)=> regex.test(e.pokedexId));
        }
        else {
            const regex = new RegExp(search);
            search_tab = g_list_pokemon.filter((e)=> regex.test(e.types));
        }
        console.log(search_tab);
        let list_results=[];
        $('#search_results_list').html('');
        if (search_tab.length == 0) {
            list_results = `<li style='list-style-type:none;'>Aucun résultat correspondant à votre recherche n'a été trouvé</li>`;
            $('#search_results_list').append(list_results);
        }
        else {
            for (let i=0; i<search_tab.length; i++) {
                list_results = `<li onclick='show_pokemons_details(` + search_tab[i].pokedexId + `)' 
                class='pokemon_name'>` + search_tab[i].name.fr + `</li>`;
                $('#search_results_list').append(list_results);
            }
        }

        $('#pokemon_details').show();
        $('#pokemon_reduct').hide();

        //éviter le rechargement de la page et de la console lors de la soumission du formulaire
        return false;
    });
});






// fonctions de navigation dans le menu
function display_sections(num) {
    if (num == 1) {
        $('#accueil').show();
        $('#generation').hide();
        $('#type').hide();
        $('#pokemon_reduct').show();
        $('#pokemon_details').hide();
        show_pokemons_reduct(Math.floor(Math.random() * g_list_pokemon.length)+1);
    }
    else if (num == 2) {
        $('#accueil').hide();
        $('#generation').show();
        $('#type').hide();
        $('#pokemon_details').show().html(''); 
    }
    else {
        $('#accueil').hide();
        $('#generation').hide();
        $('#type').show();
        $('#pokemon_details').show().html('');  
    }

}






// init functions : lancées au démarrage après la requête fetch
get_pokemon(get_list_gen, get_list_type);

display_sections(1);