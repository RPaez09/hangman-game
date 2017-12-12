var game = {

    wins : 0,
    // how many wins the player has

    remainingGuesses : 10,
    
    remainingWords : [],
    //pool of words to select from

    currentWord : "",

    dictionary : 
    [ 
        "Love" ,
        "Breaking Bad" ,
        "Better Call Saul" ,
        "Black Mirror" ,
        "Orange is the New Black" ,
        "The Office" ,
        "Stranger Things" ,
        "Dear White People" , 
        "Daredevil" , 
        "Jessica Jones" , 
        "The Defenders" , 
        "Luke Cage" , 
        "Flaked" , 
        "Mindhunter" ,
        "Narcos"
    ],
    // dictionary of possible matches. not to be modified

    initializeGame : function(){

        for( var a = 0; a < game.dictionary.length; a++ ) {
            
            var b = Math.round( Math.random() * 10 ); // generate a random number 1-10

            if( b > 5 ){
                game.remainingWords.push(game.dictionary[a]);
            } else {
                game.remainingWords.unshift(game.dictionary[a])
            }

        } // A simple shuffle for the sake of replayability

        game.remainingGuesses = 10;

        game.currentWord = game.remainingWords.pop();

        game.wins = 0;
    }
}

var board = {
    wordguess : document.querySelector('.wordguess-section'),
    template : function( letter ) {
        return '<div class="item">' + letter + '</div>'
    },
    renderWord : function( word ){ 
        var wordguess = board.wordguess;
        wordguess.innerHTML = "";// empty the board
        var split = word.split('');

        for( var j = 0; j < split.length; j++ ){
            wordguess.innerHTML += board.template(split[j]);
        }
    }
}


game.initializeGame();
board.renderWord( game.currentWord );