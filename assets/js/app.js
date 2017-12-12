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

        for( var a = 0; a < this.dictionary.length(); a++ ) {
            this.remainingWords.push(this.dictionary[a]);
        } // resets remaining words

        this.remainingGuesses = 10;

        this.currentWord = this.remainingWords.pop();

        this.wins = 0;
    }
}

var board = {
    wordguess : document.querySelector('.wordguess-section');
}