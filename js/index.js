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
    // console.log(this.start);
    // Set Timer:
    $('#clock').text(shours + ':' + sminutes + ':' + sseconds);
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

    // Flip Cards Back
    $('.cover').removeClass('lockedIn');
    // Restart turns and stars
    this.start = false;
    // console.log(this.start);
    $('#clock').text('0');
  },
  move: function() {
    // Increment Moves
    this.moves += 1;
    console.log(this.moves);
    $('#turn').text(this.moves);
    $('.win-moves').text(this.moves);

    if(this.moves <= 16) {
      // console.log('perfection');
      $('#stars').html("<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>");
      $('.win-stars').text('3');
    } else if (this.moves <= 20) {
      // console.log('not perfection');
      $('#stars').html("<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star-half-alt'></i>");
      $('.win-stars').text('2.5');
    } else if (this.moves <= 24) {
      // console.log('not perfection');
      $('#stars').html("<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i>");
      $('.win-stars').text('2');
    } else if (this.moves <= 28) {
      // console.log('not perfection');
      $('#stars').html("<i class='fas fa-star'></i><i class='fas fa-star-half-alt'></i><i class='far fa-star'></i>");
      $('.win-stars').text('1.5');
    } else if (this.moves <= 32) {
      // console.log('not perfection');
      $('#stars').html("<i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>");
      $('.win-stars').text('1');
    } else if (this.moves <= 36) {
      // console.log('not perfection');
      $('#stars').html("<i class='fas fa-star-half-alt'></i><i class='far fa-star'></i><i class='far fa-star'></i>");
      $('.win-stars').text('0.5');
    } else if (this.moves <= 40) {
      // console.log('not perfection');
      $('#stars').html("<i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>");
      $('.win-stars').text('0');
    }
  },
  unflip: function() {
    if (game.flipCounter === 0) {
      game.waiting = false;
      if ($('.cover').hasClass('flip')) {
        if(
          $('.flip').eq(0).html()
          ===
          $('.flip').eq(1).html()
        ) {
          $('.flip').removeClass('flip').addClass('lockedIn');
          // console.log($('.lockedIn').length);
          // On win show win screen
          if($('.lockedIn').length === 16) {
            $('footer').show();
            game.end();
          }
        }
        $('.cover').removeClass('flip');
        $('.cover').children('.hidden').hide();
      }
      // console.log('Waiting is: ' + game.waiting);
    }
  },
  restart: function() {
    game.moves = -1;
    game.move();
    game.start = false;
    game.flipCounter = 0;
    this.waiting = false;
    $('.cover').removeClass('lockedIn');
    $('#clock').text('0');
  }
}

$(document).ready(function() {
  $('footer').hide();
  $('button').click(function() {
    $('footer').hide();
    game.moves = -1;
    game.move();
    game.start = false;
  });

  $('#stars').html("<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>");

  // Start game - Take turn
  $('.cover').click(function() {
    if(!game.waiting) {
      // If the game is not waiting on an action
      if(!game.start) {
        game.setStart();
        $(this).addClass('flip');
        // Show the item
        $(this).children('.hidden').show();
        game.flipCounter += 1;
        // console.log('Flip counter: ' + game.flipCounter);
      } else {
        // If game has started and the div has been flipped
        if ($(this).hasClass('flip') || $(this).hasClass('lockedIn')) {

        } else if (game.flipCounter === 1) {
          game.waiting = true;
          game.move();
          $(this).addClass('flip');
          // Show the item
          $(this).children('.hidden').show();
          game.flipCounter = 0;
          // console.log('Flip counter: ' + game.flipCounter);
          setTimeout(game.unflip, 1000);
        } else {
          // The card hasn't been flipped
          game.move();
          $(this).addClass('flip');
          // Show the item
          $(this).children('.hidden').show();
          game.flipCounter += 1;
          // console.log('Flip counter: ' + game.flipCounter);
        }
      }
    }
  });

  // Restart game
  $('#restart').click(function() {
    game.restart();
  });


});
