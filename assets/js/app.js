var game = {
    
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

        game.newWord();
    }
}

var board = {
    wordGuess : document.querySelector('.wordguess-section'),

    alreadyGuessed : [],

    template : function( currentLetter ) {

        if( currentLetter.isSolved ) {
            return '<div class="item">' + currentLetter.letter + '</div>'
        } else {
            return '<div class="item">_</div>'
        }
    },

    renderWord : function( word ){ 
        var wordGuess = board.wordGuess;
        wordGuess.innerHTML = "";// empty the board

        for( var j = 0; j < game.currentWord.length; j++ ){
            wordGuess.innerHTML += board.template(game.currentWord[j]);
        }
    },

    guessLetter : function( key ){
        key = key.toLowerCase(); // case insensitivity
        var miss = true; // if a key is found this will switch to true and decrement the number of guesses remaining

        if( game.legalKeys.test( key ) && board.alreadyGuessed.indexOf( key ) < 0 ) { //check if letter is in the alphabet ( aka legal ) && not already guessed
            
            if( scoreBoard.remainingGuesses.value > 0 ){ // no more guessing after you run out of attemps.. game over

                for( var d = 0; d < game.currentWord.length; d++ ){ //loop through elements in the current word
                    if( key === ( game.currentWord[d].letter ).toLowerCase() ){
                        game.currentWord[d].isSolved = true;
                        miss = false;
                        board.renderWord( game.currentWord );

                        if( board.checkWin() ){
                            scoreBoard.wins.increment();
                            scoreBoard.remainingGuesses.reset();
                            game.newWord();
                        }

                    } 
                }

                board.alreadyGuessed.push( key );
                if( miss ) {
                    scoreBoard.remainingGuesses.decrement();
                    miss = true;
                }
                
            } else {
                console.log("You've run out of guesses!");
            }
        }
    },

    checkWin : function(){

        for( var e = 0; e < game.currentWord.length; e++ ){
            if( game.currentWord[e].isSolved === false ){
                return false;
            }
        }

        return true;

    }

}

var scoreBoard = {
    remainingGuesses : 
    {
        value : 10,
        element : document.getElementById( 'remainingGuesses' ),
        render : function(){
            scoreBoard.remainingGuesses.element.innerHTML = scoreBoard.remainingGuesses.value;
        },
        decrement : function(){
            scoreBoard.remainingGuesses.value--;
            scoreBoard.remainingGuesses.render();
        },
        reset : function(){
            scoreBoard.remainingGuesses.value = 10;
            scoreBoard.remainingGuesses.render();
        }
    },

    wins : {
        value : 0,
        element : document.getElementById( 'score' ),
        render : function(){
            scoreBoard.wins.element.innerHTML = scoreBoard.wins.value;
        },
        increment : function(){
            scoreBoard.wins.value++;
            scoreBoard.wins.render();
        },
        reset : function(){
            scoreBoard.wins.value = 0;
            scoreBoard.wins.render();
        }
    },

    usedLetters = {
        array : [],
        element : document.getElementById( 'guessedLetters' ),
        render : function(){
            scoreBoard.usedLetters.element.innerHTML = scoreBoard.usedLetters.array;
        },
        append : function( newLetter ){
            scoreBoard.usedLetters.array.push( newLetter );
        },
        check : function( culprit ){
            if( scoreBoard.usedLetters.array.indexOf( culprit ) < 0 ){
                return true;
            } else {
                return false;
            }
        },
        reset : function(){
            scoreBoard.usedLetters.array = [];
        }
    }
}

//events
document.onkeyup = function( e ){
    board.guessLetter( e.key )
};

game.initializeGame();
board.renderWord( game.currentWord );