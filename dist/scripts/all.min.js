var d = new Date();
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();

var game = {
  start: false,
  timer: hours + ':' + minutes + ':' + seconds,
  moves: 0,
  waiting: false,
  flipCounter: 0,
  setStart: function() {
    // Set Moves to 0
    this.move();
    // Get Start Time
    var start = new Date();
    var shours = start.getHours();
    var sminutes = start.getMinutes();
    var sseconds = start.getSeconds();
    console.log('Start time: ' + shours + ':' + sminutes + ':' + sseconds);
    // Set start to true
    this.start = true;
    console.log(this.start);
  },
  end: function() {
    // Set Moves to 0
    this.moves = 0;
    // Get End Time
    var end = new Date();
    var ehours = end.getHours();
    var eminutes = end.getMinutes();
    var eseconds = end.getSeconds();
    console.log('End time: ' + ehours + ':' + eminutes + ':' + eseconds);

    this.start = false;
    console.log(this.start);
  },
  move: function() {
    // Increment Moves
    this.moves += 1;
    console.log(this.moves);
    $('#turn').text(this.moves);

    if(this.moves <= 6) {
      // console.log('perfection');
      $('#stars').html("<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>");
    } else if (this.moves <= 8) {
      console.log('not perfection');
      $('#stars').html("<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star-half-alt'></i>");
    } else if (this.moves <= 10) {
      console.log('not perfection');
      $('#stars').html("<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i>");
    } else if (this.moves <= 12) {
      console.log('not perfection');
      $('#stars').html("<i class='fas fa-star'></i><i class='fas fa-star-half-alt'></i><i class='far fa-star'></i>");
    } else if (this.moves <= 14) {
      console.log('not perfection');
      $('#stars').html("<i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>");
    } else if (this.moves <= 16) {
      console.log('not perfection');
      $('#stars').html("<i class='fas fa-star-half-alt'></i><i class='far fa-star'></i><i class='far fa-star'></i>");
    } else if (this.moves <= 20) {
      console.log('not perfection');
      $('#stars').html("<i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>");
    }
  },
  unflip: function() {
    if (game.flipCounter === 0) {
      game.waiting = false;
      if ($('.cover').hasClass('flip')) {
        $('.cover').removeClass('flip');
      }
      // console.log('Waiting is: ' + game.waiting);
    }
  },
  restart: function() {
    this.start = false;
    this.flipCounter = 0;
    this.moves = 0;
    this.waiting = false;
    location.reload();
  }
}

$(document).ready(function() {
  $('#stars').html("<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>");

  // Start game - Take turn
  $('.cover').click(function() {
    if(!game.waiting) {
      // If the game is not waiting on an action
      if(!game.start) {
        game.setStart();
        $(this).addClass('flip');
        game.flipCounter += 1;
        // console.log('Flip counter: ' + game.flipCounter);
      } else {
        // If game has started and the div has been flipped
        if ($(this).hasClass('flip')) {

        } else if (game.flipCounter === 1) {
          game.waiting = true;
          game.move();
          $(this).addClass('flip');
          game.flipCounter = 0;
          // console.log('Flip counter: ' + game.flipCounter);
          setTimeout(game.unflip, 1000);
        } else {
        // The card hasn't been flipped
          game.move();
          $(this).addClass('flip');
          game.flipCounter += 1;
          // console.log('Flip counter: ' + game.flipCounter);
        }
      }
    }
  });

  // Restart game
  $('#restart').click(function() {
    if(game.start) {
      game.end();
    }
  });


});
