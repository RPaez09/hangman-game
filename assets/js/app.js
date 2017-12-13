var game = {

    wins : 0,
    // how many wins the player has

    remainingGuesses : 10,
    
    remainingWords : [],
    //pool of words to select from

    currentWord : [],

    legalKeys : new RegExp("\\b[a-z]{1}\\b"), // regular expression for a single alphabetical character

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

    newWord : function(){

        var candidate = game.remainingWords.pop();

        board.alreadyGuessed = [];

        for( var c = 0; c < candidate.length; c++ ){

            if( candidate[c] === " " ){
                game.currentWord.push( { "letter" : " " , "isSolved" : true } );
            } else {
                game.currentWord.push( { "letter" : candidate[c] , "isSolved" : false } );
            }
            
        }

    },

    initializeGame : function(){

        for( var a = 0; a < game.dictionary.length; a++ ) {
            
            var b = Math.round( Math.random() * 10 ); // generate a random number 1-10

            if( b > 5 ){
                game.remainingWords.push(game.dictionary[a]);
            } else {
                game.remainingWords.unshift(game.dictionary[a]);
            }

        } // A simple shuffle for the sake of replayability

        game.remainingGuesses = 10;

        game.newWord();

        game.wins = 0;
    }
}

var board = {
    wordguess : document.querySelector('.wordguess-section'),
    template : function( currentLetter ) {

        if( currentLetter.isSolved ) {
            return '<div class="item">' + currentLetter.letter + '</div>'
        } else {
            return '<div class="item">_</div>'
        }

    },
    renderWord : function( word ){ 
        var wordguess = board.wordguess;
        wordguess.innerHTML = "";// empty the board

        for( var j = 0; j < game.currentWord.length; j++ ){
            wordguess.innerHTML += board.template(game.currentWord[j]);
        }
    },
    alreadyGuessed : [],
    guessLetter : function( key ){
        if( game.remainingGuesses > 0 ){
            //check if letter is in the alphabet ( aka legal ) && not already guessed
            if( game.legalKeys.test( key ) && board.alreadyGuessed.indexOf( key ) < 0 ) {
                console.log( "New key :" + key );
                board.alreadyGuessed.push( key );
                game.remainingGuesses--;
            }
        } else {
            console.log("You've run out of guesses!");
        }
        

    }
}

//events
document.onkeyup = function( e ){
    board.guessLetter( e.key )
    
};

game.initializeGame();
board.renderWord( game.currentWord );