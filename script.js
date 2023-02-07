$("#start").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".btn-group").offset().top
    }, 200);
});


const filmToTitle = new Map([
    ["https://swapi.dev/api/films/1/", "A New Hope"],
    ["https://swapi.dev/api/films/2/", "The Empire Strikes Back"],
    ["https://swapi.dev/api/films/3/", "Return of the Jedi"],
    ["https://swapi.dev/api/films/4/", "The Phantom Menace"],
    ["https://swapi.dev/api/films/5/", "Attack of the Clones"],
    ["https://swapi.dev/api/films/6/", "Revenge of the Sith"],
  ]);



    async function getPeople(value){
        try{
            const response = await fetch(`https://swapi.dev/api/${value}/`);
            let data = await response.json();
            const responseFilms = await fetch('https://swapi.dev/api/films');
  
            // Resetting div #container's info
            if (!$('#container').is(':empty')){
                $('#container').html('');
              }

                data.results.forEach(person => {
                    $('#container').append(`<h2>${person.name}</h2>`);
                    for(i in person.films){
                    if(filmToTitle.has(person.films[i])){
                        $('#container').append(`<li>${filmToTitle.get(person.films[i])}</li>`)
                    }
                    }
                
                })  
            }
            catch(error){
                console.log(error);
            }
    }

 
    async function getFilms(value){
        try{
           const response = await fetch(`https://swapi.dev/api/${value}/`);
            let data = await response.json();
            // Resetting div #container's info
            if (!$('#container').is(':empty')){
                $('#container').html('');
            }
            for(i in data.results){
                getCharactersInFilm(data.results[i].title, data.results[i].characters).then((names) => $('#container').append(names));
            }
            }
            catch(error){
                console.log(error);
            }
    }
    
    // returns name of character
    async function getCharactersInFilm(title, characters){
        var dataToSend = `<h2>${title}</h2>`;
        for(let i=0; i<characters.length; i++){
            let response = await fetch(characters[i]);
            let data = await response.json();
            dataToSend += `<li>${data.name}</li>`
        }
        return dataToSend;
   }


    document.querySelector('.btn-group').addEventListener("click", e => {
        if(e.target.textContent.trim().toLowerCase() == 'people'){
            getPeople('people');
        } else if (e.target.textContent.trim().toLowerCase() == 'films'){
            getFilms('films')
        }
        
    }
    );


    
    
        

    


