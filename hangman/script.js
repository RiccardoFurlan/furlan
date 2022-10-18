

var Hangman = (function () {
    
    function Hangman(elId) {
        this.elId       = elId;
        this.words      = [
            'PROGRAMMATORE', 'FATTORIA', 'INTELLIGENZA', 'PORTATILE',
            'TERREMOTO', 'GUINZAGLIO', 'GIAGUARO', 'CONDANNATO'
        ];
    }

    Hangman.prototype.reset = function () {

        this.stopped        = false;
        this.mistakes       = 0;
        this.guesses        = [];
        
        this.word           = this.words[Math.floor(Math.random() * this.words.length)];

        this.hideElementByClass('h');
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
    };

    Hangman.prototype.guess = function (letter) {
        letter = letter.charAt(0).toUpperCase();

        if (this.stopped || this.guesses.indexOf(letter) > -1) {
            return;
        }

        this.guesses.push(letter);
        
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
        this.showElementByIdWithContent(this.elId + "_guesses", this.guesses.join(''));

        if (this.word.indexOf(letter) < 0) {
            
            this.mistakes++;

            this.showElementByIdWithContent(this.elId + "_" + this.mistakes, null);

            if (this.mistakes === 6) {
                this.showElementByIdWithContent(this.elId + "_end", "GAME OVER!<br/>La parola era: " + this.word);
                this.stopped = true;
            }
        } else if (this.word.indexOf(this.getGuessedfWord()) !== -1) {
            
            this.showElementByIdWithContent(this.elId + "_end", "Congratulazioni!<br/>La parola era: " + this.word);
            this.stopped = true;
        }
    };

    Hangman.prototype.showElementByIdWithContent = function (elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };

    Hangman.prototype.hideElementByClass = function (elClass) {
        var elements = document.getElementsByClassName(elClass), i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    Hangman.prototype.getGuessedfWord = function () {
        var result = "", i;
        for (i = 0; i < this.word.length; i++) {
            result += (this.guesses.indexOf(this.word[i]) > -1) ?
                    this.word[i] : "_";
        }
        return result;
    };

    return new Hangman('hangm');    
}());