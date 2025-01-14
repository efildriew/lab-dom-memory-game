"use strict";

function main() {
  var memoryGame = new MemoryGame(cards);
  var html = "";
  memoryGame.shuffleCards();
  memoryGame.cards.forEach(function(pic) {
    html += '<div class="card" data-card-name="' + pic.name + '">';
    html += '  <div class="back" name="' + pic.img + '"></div>';
    html +=
      '  <div class="front" style="background: url(img/' +
      pic.img +
      ') no-repeat"></div>';
    html += "</div>";
  });
  // Add all the div's to the HTML
  var memoryBoard = document.querySelector("#memory_board");
  if (memoryBoard) {
    // this condition is for passing the tests
    memoryBoard.innerHTML = html;
  }

  // You will need to do something to the front as well
  var front = document.querySelectorAll(".front");

  var firstCard = undefined;
  var secondCard = undefined;
  // Bind the click event of each element to a function
  var back = document.querySelectorAll(".back");

  for (let i = 0; i < back.length; i++) {
    back[i].addEventListener("click", function() {
      // TODO: Your code goes here!
      memoryGame.pickedCards.push(back[i]);
      memoryGame.pairsClicked++;

      if (memoryGame.pickedCards.length === 1) {
        displayClickedCard(back[i]);
        firstCard = back[i].outerHTML;
        printGameInfo();
      }

      if (memoryGame.pickedCards.length === 2) {
        displayClickedCard(back[i]);
        secondCard = back[i].outerHTML;
        printGameInfo();
      }

      if (firstCard && secondCard) {
        if (memoryGame.checkIfPair(firstCard, secondCard) === true) {
          memoryGame.pairsGuessed++;
          firstCard = undefined;
          secondCard = undefined;
          printGameInfo();

          if (memoryGame.isFinished() === true) {
            alert("Congratulations! You Won!");
            main();
          }

          memoryGame.pickedCards[0].classList.remove("active");
          memoryGame.pickedCards[1].classList.remove("active");
          memoryGame.pickedCards = [];
        } else {
          firstCard = undefined;
          secondCard = undefined;
          turnBackCards();
        }
      }
    });
  }
  // Helpers to create the logic of the game
  function turnBackCards() {
    setTimeout(function() {
      memoryGame.pickedCards[0].style.background = "#456783";
      memoryGame.pickedCards[1].style.background = "#456783";
      memoryGame.pickedCards[0].classList.remove("active");
      memoryGame.pickedCards[1].classList.remove("active");
      prepareNextTurn();
    }, 1000);
  }

  function prepareNextTurn() {
    memoryGame.pickedCards = [];
    back.forEach(element => element.classList.remove("blocked"));
    front.forEach(element => element.classList.remove("blocked"));
  }

  function printGameInfo() {
    document.getElementById("pairs_clicked").innerHTML =
      memoryGame.pairsClicked;
    document.getElementById("pairs_guessed").innerHTML =
      memoryGame.pairsGuessed;
  }

  function displayClickedCard(card) {
    card.className += " active";
    card.style.background =
      "url(img/" + card.getAttribute("name") + ") no-repeat";
  }
}

window.addEventListener("load", main);
