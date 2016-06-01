var words = ["tidy", "pants", "slide", "hello"],
    $p = $("p"),
    round;

Round.prototype = {
  winningMessage: "Congratulations! You've guessed the word!!",
  losingMessage: "Sorry, you are out of guesses!",
  max_guesses: 6,

  processGuess: function(e) {
    var letter = String.fromCharCode(e.which),
        indicies;

    if (invalidLetter(e.which)) { return; }

    indicies = this.findLetterIndicies(letter);
    if (this.updateGuess(indicies, letter)) { this.checkIfRoundEnded(); }
  },

  findLetterIndicies: function(letter) {
    var regex = new RegExp(letter, "gi"),
        indicies = [];

    while (result = regex.exec(this.word)) {
      indicies.push(result.index);
    }
    return indicies;
  },

  updateGuess: function(indicies, letter) {
    if (indicies[0] || indicies[0] === 0) {
      if (this.correct_letters.includes(letter)) { return false; }
      this.updateRightGuess(indicies, letter);
    } else {
      this.updateWrongGuess(letter);
    }
    return true;
  },

  updateRightGuess: function(indicies, letter) {
    indicies.forEach(function(index) {
      $("#word span").eq(index).text(letter);
      this.correct_letters.push(letter);
    }, this);
  },

  updateWrongGuess: function(letter) {
    this.addGuess(letter);
    this.guesses ++;
    $("#apples").removeClass().addClass("guess_" + this.guesses);
  },

  addGuess: function(letter) {
    $("#guesses").append("<span>" + letter + "</span>");
  },

  checkIfRoundEnded: function() {
    if (this.guesses === this.max_guesses) {
      this.endRound(this.losingMessage, "lose");
    } else if (this.correct_letters.length === this.word.length) { 
      this.endRound(this.winningMessage, "win");
    }
  },

  endRound: function(message, result) {
    $p.eq(0).text(message);
    $("body").addClass(result);
    $(document).unbind();
    $("a").show();
  },

  createBlanks: function() {
    for (var i = 0; i < this.word.length; i++) {
      this.createOneBlank();
    }
  },

  createOneBlank: function () {
    $("#word").append("<span></span>");
  },

  gameOver: function() {
    $p.eq(0).text("There are no more words left to play.");
    $("body").addClass("game_over");
    $("#images").prepend("<img src='images/tree_of_dead_hopes.png' id='dead_tree'>");
    $("#dead_tree").fadeIn(1000);
    $("#apples").hide("explode", { pieces: 9 }, 1000);
    $("#tree").hide("explode", { pieces: 49 }, 1000);
    $("a").hide();
    $(document).unbind();
  }
};

function Round() {
  this.guesses = 0;
  this.correct_letters = [];
  this.word = getWord.call();

  if (this.word === undefined) { this.gameOver(); return; }

  this.createBlanks();

  $(document).on("keypress.game", this.processGuess.bind(this));
}

function getWord() {
  if (words[0] === undefined) { return; }
  var idx = Math.floor(Math.random() * words.length);
  var new_word = words.splice(idx, 1)[0];
  return new_word;
}

function invalidLetter(charCode) {
  return charCode > 122 || charCode < 97;
}

$("a").on("click", function(e) {
  e.preventDefault();

  $("a").hide();
  startRound();
});

function startRound() {
  $(document).off("keypress.game");
  $("span").remove();
  $("body").removeClass();
  $("p").eq(0).text("");
  $("#apples").removeClass();
  round = new Round();
}

round = new Round();