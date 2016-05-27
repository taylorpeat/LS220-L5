var words = ["tidy", "pants", "slide", "dream"];

Game.prototype = {
  winningMessage: "Congratulations! You've guessed the word!!",
  losingMessage: "Sorry, you are out of guesses!",
  watchLetter: function(e) {
    letter = String.fromCharCode(e.which);
    if (this.validLetter(e.which)) { this.processGuess(letter) };
    if (this.guesses === 6) {
      this.endRound(this.losingMessage, "lose");
    };
    if (this.correct_letters.length === this.word.length) { 
      this.endRound(this.winningMessage, "win");
    };
  },

  processGuess: function(letter) {
    var regex = new RegExp(letter, "gi"),
        indicies = [];
    
    while (result = regex.exec(this.word)) {
      indicies.push(result.index);
    }

    if (indicies[0] || indicies[0] === 0) {
      if (!this.correct_letters.includes(letter)) {
      this.fillLetters(indicies, letter);
      } 
    } else {
      this.addGuess(letter);
      this.guesses ++;
      $("#apples").removeClass().addClass("guess_" + this.guesses);
    }
    
    return !!indicies[0];
  },

  fillLetters: function(indicies, letter) {
    indicies.forEach(function(index) {
      $("#word span").eq(index).text(letter);
      this.correct_letters.push(letter);
    }, this);
  },

  validLetter: function(charCode) {
    return charCode < 123 && charCode > 96;
  },

  createBlanks: function() {
    for (var i = 0; i < this.word.length; i++) {
      this.createOneBlank();
    }
  },

  createOneBlank: function () {
    $("#word").append("<span></span>");
  },

  addGuess: function(letter) {
    $("#guesses").append("<span>" + letter + "</span>");
  },

  endRound: function(message, result) {
    $("p").eq(0).text(message);
    $("body").addClass(result);
    $(document).unbind();
    $("a").show();
  },

  gameOver: function() {
    $("p").eq(0).text("There are no more words left to play.")
    $("body").addClass("game_over");
    $("#apples").hide();
    $("#tree").attr("src", "images/tree_of_dead_hopes.png");
    $("a").hide();
    $(document).unbind();
  }
}

function Game() {
  this.guesses = 0;
  this.correct_letters = [];
  this.word = getWord.call(this);
  if (this.word === undefined) { this.gameOver(); };
  this.createBlanks();

  $(document).on("keypress", this.watchLetter.bind(this));
}

$("a").on("click", function(e) {
  e.preventDefault();

  $("a").hide();
  newRound();
});

function getWord() {
  var idx = Math.floor(Math.random() * words.length);
  var new_word = words.splice(idx, 1)[0];
  return new_word;
}

function newRound() {
  $(document).unbind();
  $("span").remove();
  $("body").removeClass();
  $("p").eq(0).text("");
  $("#apples").removeClass();
  game = new Game();
}

var game = new Game();