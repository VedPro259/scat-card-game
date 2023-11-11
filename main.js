import { deckOfCards } from "./cards.js";

let newToggle = false; 
let thirdToggle = false; 
let playerToggle = 'left'; 
const audio = new Audio("https://audio.jukehost.co.uk/tzH9wj2WGap6r7fCmVVqqQAns8k4yiAv");

let nineCards = [];

for (let i = 0; nineCards.length < 9; i++) {
  let computerCard = Math.floor(Math.random() * (deckOfCards.length)) ;
  deckOfCards.forEach((item) => {
    if (deckOfCards.indexOf(item) === computerCard && !item.card) {
      item.card = true
      nineCards.push(item);
    }
  })
};

for (let i = 0; i < 3; i++) {
  let card = nineCards[i];  
  document.querySelector('.left-cards')
    .innerHTML += `<div class="c${i}"><img class="card-image rotate left ${card.img}" data-product-id="${card.img}" src="${card.img}"></div>`
}

for (let i = 3; i < 6; i++) {
  let card = nineCards[i];  
  document.querySelector('.middle-cards')
    .innerHTML += `<div class="c${i}"><img class="card-image js-middle-cards" data-product-id="${card.img}" src="${card.img}"></div>`
}

for (let i = 6; i < 9; i++) {
  let card = nineCards[i]; 
  document.querySelector('.right-cards')
    .innerHTML += `<div class="c${i}"><img class="card-image rotate right" data-product-id="${card.img}" src="${card.img}"></div>`
}

function disappear() {
  if (playerToggle === 'left') {
    if (document.querySelector('.left-cards').classList.contains('vertical-container-color')) {
      document.querySelector('.left-cards').classList.remove('vertical-container-color');
    }
    if (document.querySelector('.c1').classList.contains('disappear')) {
      for (let i = 0; i < 3; i++) {
        document.querySelector(`.c${i}`).classList.remove('disappear');
      }
    }
    for (let i = 3; i < 9; i++) {
      document.querySelector(`.c${i}`).classList.add('disappear');
    }
    document.querySelector('.middle-cards')
      .classList.add('horizontal-container-color');
    document.querySelector('.right-cards')
      .classList.add('vertical-container-color');
    document.querySelector('.js-second-button')
      .classList.add('disappear');
    document.querySelector('.js-third-button')
      .classList.add('disappear');
    if (document.querySelector('.js-first-button').classList.contains('disappear')) {
      document.querySelector('.js-first-button')
        .classList.remove('disappear');
    }
  } else if (playerToggle === 'middle') {
    document.querySelector('.middle-cards')
      .classList.remove('horizontal-container-color');
    for (let i = 3; i < 6; i++) {
      document.querySelector(`.c${i}`)
        .classList.remove('disappear');
    }
    for (let i = 0; i < 3; i++) {
      document.querySelector(`.c${i}`)
        .classList.add('disappear');
    }
    document.querySelector('.left-cards')
      .classList.add('vertical-container-color');
    document.querySelector('.js-second-button')
      .classList.remove('disappear');
    document.querySelector('.js-first-button')
      .classList.add('disappear');
  } else if (playerToggle === 'right') {
    document.querySelector('.right-cards')
      .classList.remove('vertical-container-color');
    for (let i = 6; i < 9; i++) {
      document.querySelector(`.c${i}`)
        .classList.remove('disappear');
    }
    for (let i = 3; i < 6; i++) {
      document.querySelector(`.c${i}`)
        .classList.add('disappear');
    }
    document.querySelector('.middle-cards')
      .classList.add('horizontal-container-color');
    document.querySelector('.js-third-button')
      .classList.remove('disappear');
    document.querySelector('.js-second-button')
      .classList.add('disappear');
  }
} 
disappear(); 

let leftPlayerTotal = 0; 
let middlePlayerTotal = 0; 
let rightPlayerTotal = 0; 

document.querySelector('.player-turn-display')
  .innerHTML = 'Left Players Turn';

function findTotal(first, second, third) {
  let playerTotal = 0; 

  if (nineCards[first].suit === nineCards[second].suit && nineCards[second].suit === nineCards[third].suit) {
    playerTotal = parseInt(nineCards[first].number) + parseInt(nineCards[second].number) + parseInt(nineCards[third].number);
  } else if (nineCards[first].suit === nineCards[second].suit) {
    playerTotal = parseInt(nineCards[first].number) + parseInt(nineCards[second].number);
  } else if (nineCards[second].suit === nineCards[third].suit) {
    playerTotal = parseInt(nineCards[second].number) + parseInt(nineCards[third].number);
  } else if (nineCards[third].suit === nineCards[first].suit) {
    playerTotal = parseInt(nineCards[third].number) + parseInt(nineCards[first].number);
  } else if (parseInt(nineCards[first].number) > parseInt(nineCards[second].number) && parseInt(nineCards[first].number) > parseInt(nineCards[third].number)) {
    playerTotal = parseInt(nineCards[first].number)
  } else if (parseInt(nineCards[second].number) > parseInt(nineCards[third].number)) {
    playerTotal = parseInt(nineCards[second].number);
  } else if (parseInt(nineCards[third].number) > parseInt(nineCards[second].number)) {
    playerTotal = parseInt(nineCards[third].number);
  } else if (parseInt(nineCards[first].number) === parseInt(nineCards[second].number)) {
    playerTotal = parseInt(nineCards[first].number);
  } else if (parseInt(nineCards[second].number) === parseInt(nineCards[third].number)) {
    playerTotal = parseInt(nineCards[second].number);
  } else if (parseInt(nineCards[third].number) === parseInt(nineCards[first].number)) {
    playerTotal = parseInt(nineCards[first].number);
  }  
  
  return playerTotal; 
}

leftPlayerTotal = findTotal(0, 1, 2);
middlePlayerTotal = findTotal(3, 4, 5);
rightPlayerTotal = findTotal(6, 7, 8);
function appear() {
  if (document.querySelector('.left-cards').classList.contains('vertical-container-color')) {
    document.querySelector('.left-cards')
      .classList.remove('vertical-container-color');
  }
  if (document.querySelector('.middle-cards').classList.contains('horizontal-container-color')) {
    document.querySelector('.middle-cards')
      .classList.remove('horizontal-container-color');
  }
  if (document.querySelector('.right-cards').classList.contains('vertical-container-color')) {
    document.querySelector('.right-cards')
      .classList.remove('vertical-container-color');
  }
  for (let i = 0; i < 9; i++) {
    if (document.querySelector(`.c${i}`).classList.contains('disappear')) {
      document.querySelector(`.c${i}`)
        .classList.remove('disappear');
    }
  }
  document.querySelectorAll(`.js-knock`)
    .forEach((button) => button.remove())
  document.querySelector('.middle-cards')
    .style.gridTemplateColumns = "1fr 1fr 1fr";
  const allElements = document.querySelectorAll('*');
  // Iterate through each element and remove all event listeners
  allElements.forEach(element => {
    // Clone the element without its listeners
    const newElement = element.cloneNode(true);
      
    // Replace the old element with the new one
    element.parentNode.replaceChild(newElement, element);
  });
}
function skat() {
  if (middlePlayerTotal === 31) {
    document.querySelector('.js-results')
      .innerHTML = `<p>The middle player wins with ${middlePlayerTotal}.</p>
      <button class="js-restart" onClick="window.location.reload();">Restart</button>`;
    appear(); 
    audio.play(); 
  } else if (leftPlayerTotal === 31) {
    document.querySelector('.js-results')
      .innerHTML = `<p>The left player wins with ${leftPlayerTotal}.</p>
      <button class="js-restart" onClick="window.location.reload();">Restart</button>`;
    appear(); 
    audio.play();
  } else if (rightPlayerTotal === 31) {
    document.querySelector('.js-results')
      .innerHTML = `<p>The right player wins with ${rightPlayerTotal}.</p>
      <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    appear();
    audio.play();
  }
  
}
skat(); 
function whoWon() {
  if (middlePlayerTotal > leftPlayerTotal && middlePlayerTotal > rightPlayerTotal) {
    document.querySelector('.js-results')
      .innerHTML = `<p>The middle player wins with ${middlePlayerTotal}.</p>
      <button class="js-restart" onClick="window.location.reload();">Restart</button>`
  } else if (leftPlayerTotal > middlePlayerTotal && leftPlayerTotal > rightPlayerTotal) {
    document.querySelector('.js-results')
      .innerHTML = `<p>The left player wins with ${leftPlayerTotal}.</p>
      <button class="js-restart" onClick="window.location.reload();">Restart</button>`
  } else if (rightPlayerTotal > middlePlayerTotal && rightPlayerTotal > leftPlayerTotal) {
    document.querySelector('.js-results')
      .innerHTML = `<p>The right player wins with ${rightPlayerTotal}.</p>
      <button class="js-restart" onClick="window.location.reload();">Restart</button>`
  } else if (middlePlayerTotal === leftPlayerTotal && middlePlayerTotal === rightPlayerTotal) {
    if (playerToggle === 'left') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Middle and right players win with ${rightPlayerTotal}, despite everyone tying.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    } else if (playerToggle === 'middle') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Left and right players win with ${rightPlayerTotal}, despite everyone tying.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    } else if (playerToggle === 'right') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Left and middle players win with ${leftPlayerTotal}, despite everyone tying.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    }
  } else if (leftPlayerTotal > middlePlayerTotal && leftPlayerTotal === rightPlayerTotal) {
    if (playerToggle === 'left') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Right player wins with ${rightPlayerTotal}, despite left and right player tying.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    } else if (playerToggle === 'middle') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Left and right player win with ${rightPlayerTotal}.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    } else if (playerToggle === 'right') {
      document.querySelector('.js-results')
      .innerHTML = `<p>Left player wins with ${rightPlayerTotal}, despite left and right player tying.</p>
      <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    }
  } else if (middlePlayerTotal > leftPlayerTotal && middlePlayerTotal === rightPlayerTotal) {
    if (playerToggle === 'left') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Middle and right player tie for the win with ${rightPlayerTotal}.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    } else if (playerToggle === 'middle') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Right player wins with ${rightPlayerTotal}, despite middle and right players tying.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    } else if (playerToggle === 'right') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Middle player wins with ${rightPlayerTotal}, despite middle and right players tying.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    }   
  } else if (middlePlayerTotal > rightPlayerTotal && middlePlayerTotal === leftPlayerTotal) {
    if (playerToggle === 'left') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Middle player wins with ${leftPlayerTotal}, despite left and middle player tying.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    } else if (playerToggle === 'middle') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Left player wins with ${leftPlayerTotal}, despite left and middle player tying.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    } else if (playerToggle === 'right') {
      document.querySelector('.js-results')
        .innerHTML = `<p>Left and middle players tie for the win with ${leftPlayerTotal}.</p>
        <button class="js-restart" onClick="window.location.reload();">Restart</button>`
    }
    
  }
} 

document.querySelectorAll('.js-knock')
  .forEach((button) => {
    button.addEventListener('click', () => {
      appear();
      whoWon(); 
      audio.play();
    })
  })

let newCards = [];

const placeholder = deckOfCards.sort((a, b) => 0.5 - Math.random());

placeholder.forEach((item) => {
  if (!item.card) {
    newCards.push(item);
  }
});

document.querySelector('.starting-card')
  .innerHTML = `<img class="card-image js-deck" src="${newCards[0].img}">
  <img class="card-image deck" src="back_of_card.png">"`

function pickUpCard(variable) {
  variable.addEventListener ('click', () => {
    document.querySelector('.deck')
      .style.pointerEvents = "none";
    document.querySelector('.js-deck')
      .style.pointerEvents = "none";
    document.querySelector('.tooltip')
      .classList.add('tooltip-gone');
    newToggle = true; 
    if (playerToggle === 'left') {
      document.querySelector('.first-world')
      .innerHTML = `<img class="card-image fourth-card rotate left" src="${newCards[0].img}">`
      doWhatIWant('.left');
    } else if (playerToggle === 'middle') {
      document.querySelector('.second-world')
      .innerHTML = `<img class="card-image fourth-card js-middle-cards" src="${newCards[0].img}">`
      doWhatIWant('.js-middle-cards');
    } else if (playerToggle === 'right') {
      document.querySelector('.third-world')
      .innerHTML = `<img class="card-image fourth-card rotate right" src="${newCards[0].img}">`
      doWhatIWant('.right');
    }
    pickupFacedDown(document.querySelector('.deck'))
    pickUpCard(document.querySelector('.js-deck'))
    
  });
}

pickUpCard(document.querySelector('.js-deck'));

function pickupFacedDown(variable) {
  variable.addEventListener('click', () => {
    document.querySelector('.js-deck')
      .style.pointerEvents = "none";
    document.querySelector('.deck')
      .style.pointerEvents = "none";
    document.querySelector('.tooltip')
      .classList.add('tooltip-gone');
    if (playerToggle === 'left') {
      document.querySelector('.first-world')
        .innerHTML = `<img class="card-image fourth-card rotate left" src="${newCards[1].img}">
        <button class="js-replace-card js-pop-up">Replace Card</button>
        <button class="js-discard js-pop-up">Discard</button>`
      document.querySelector('.js-replace-card').addEventListener('click', () => {
          thirdToggle = true; 
          document.querySelectorAll('.js-pop-up').forEach(popUp => popUp.remove()); 
          
          doWhatIWant('.left');
          
        });
      document.querySelector('.js-discard').addEventListener('click', () => {
          let randomCard = newCards[0];
          newCards.splice(0, 1);
          newCards.push(randomCard);
          document.querySelector('.starting-card')
            .innerHTML = `<img class="card-image js-deck" src="${newCards[0].img}">
            <img class="card-image deck" src="back_of_card.png">"`;
          document.querySelector('.first-world').innerHTML = '';
          playerToggle = 'middle'; 
          disappear(); 
          pickupFacedDown(document.querySelector('.deck'))
          pickUpCard(document.querySelector('.js-deck'));
          document.querySelector('.player-turn-display')
            .innerHTML = 'Middle Players Turn';
          document.querySelector('.tooltip')
            .classList.remove('tooltip-gone');
        })
      
      
      console.log('New activation! from left'); 
      pickupFacedDown(document.querySelector('.deck'))
      pickUpCard(document.querySelector('.js-deck'))

    } else if (playerToggle === 'middle') {
      console.log('Checking');
      document.querySelector('.second-world')
        .innerHTML = `<img class="card-image fourth-card js-middle-cards" src="${newCards[1].img}">
        <button class="js-replace-card js-pop-up">Replace Card</button>
        <button class="js-discard js-pop-up">Discard</button>`
      document.querySelector('.js-replace-card').addEventListener('click', () => {
          thirdToggle = true; 
          document.querySelectorAll('.js-pop-up').forEach(popUp => popUp.remove()); 
          
          doWhatIWant('.js-middle-cards');
          
        });
        document.querySelector('.js-discard').addEventListener('click', () => {
          let randomCard = newCards[0];
          newCards.splice(0, 1);
          newCards.push(randomCard);
          document.querySelector('.starting-card')
            .innerHTML = `<img class="card-image js-deck" src="${newCards[0].img}">
            <img class="card-image deck" src="back_of_card.png">"`;
          document.querySelector('.second-world').innerHTML = '';
          playerToggle = 'right'; 
          console.log(thirdToggle);
          disappear(); 
          pickupFacedDown(document.querySelector('.deck'))
          pickUpCard(document.querySelector('.js-deck'));
          document.querySelector('.player-turn-display')
            .innerHTML = 'Right Players Turn';
          document.querySelector('.tooltip')
            .classList.remove('tooltip-gone');
        })
      
      console.log('New activation! from middle'); 
      pickupFacedDown(document.querySelector('.deck'))
      pickUpCard(document.querySelector('.js-deck'))
    } else if (playerToggle === 'right') {
      document.querySelector('.third-world')
        .innerHTML = `<img class="card-image fourth-card rotate right" src="${newCards[1].img}">
        <button class="js-replace-card js-pop-up">Replace Card</button>
        <button class="js-discard js-pop-up">Discard</button>`
        document.querySelector('.js-replace-card').addEventListener('click', () => {
          thirdToggle = true; 
          document.querySelectorAll('.js-pop-up').forEach(popUp => popUp.remove()); 
          
          doWhatIWant('.right');
          
        });
        document.querySelector('.js-discard').addEventListener('click', () => {
          let randomCard = newCards[0];
          newCards.splice(0, 1);
          newCards.push(randomCard);
          document.querySelector('.starting-card')
            .innerHTML = `<img class="card-image js-deck" src="${newCards[0].img}">
            <img class="card-image deck" src="back_of_card.png">"`;
          document.querySelector('.third-world').innerHTML = ''; 
          console.log(newCards);
          playerToggle = 'left';
          disappear(); 
          pickupFacedDown(document.querySelector('.deck'))
          pickUpCard(document.querySelector('.js-deck'));
          document.querySelector('.player-turn-display')
            .innerHTML = 'Left Players Turn';
          document.querySelector('.tooltip')
            .classList.remove('tooltip-gone');
        })
       
      console.log('New activation! from right'); 
      pickupFacedDown(document.querySelector('.deck'))
      pickUpCard(document.querySelector('.js-deck'))
    }

  })
}

pickupFacedDown(document.querySelector('.deck'));

function doWhatIWant(playerCards) {
  document.querySelectorAll(playerCards)
  .forEach((replacingCard) => { console.log(replacingCard)
    replacingCard.addEventListener('click', () => {
      console.log(replacingCard.dataset.productId); 
      if (newToggle === true) {
        if (replacingCard.dataset.productId) {
          let temp = replacingCard.dataset.productId; 
          nineCards.forEach((cardReference) => {
          if (cardReference.img === temp) {
            console.log(cardReference);
            let newTemp = newCards[0];
            newCards[0] = cardReference; 
            let index = nineCards.indexOf(cardReference); 
            nineCards[index] = newTemp; 
            document.querySelector('.starting-card')
              .innerHTML = `<img class="card-image js-deck" src="${newCards[0].img}">
              <img class="card-image deck" src="back_of_card.png">"`;

            if (index < 3) {
              document.querySelector(`.c${index}`)
                .innerHTML = `<img class="card-image rotate left" data-product-id="${nineCards[index].img}" src="${nineCards[index].img}">`;
              leftPlayerTotal = findTotal(0, 1, 2); 
              playerToggle = 'middle';
              document.querySelector('.player-turn-display').innerHTML = 'Middle Players Turn';
              document.querySelector('.first-world').innerHTML = '';
              document.querySelector('.player-turn-display')
                .innerHTML = 'Middle Players Turn';
            } else if (index > 2 && index < 6) {
              document.querySelector(`.c${index}`)
                .innerHTML = `<img class="card-image js-middle-cards" data-product-id="${nineCards[index].img}" src="${nineCards[index].img}">`
              middlePlayerTotal = findTotal(3, 4, 5); 
              document.querySelector('.player-turn-display').innerHTML = 'Right Players Turn';
              playerToggle = 'right';
              document.querySelector('.second-world').innerHTML = ''; 
              document.querySelector('.player-turn-display')
                .innerHTML = 'Right Players Turn';
            } else if (index > 5) {
              document.querySelector(`.c${index}`)
                .innerHTML = `<img class="card-image rotate right" data-product-id="${nineCards[index].img}" src="${nineCards[index].img}">`
              rightPlayerTotal = findTotal(6, 7, 8); 
              playerToggle = 'left'; 
              document.querySelector('.third-world').innerHTML = ''; 
              document.querySelector('.player-turn-display').innerHTML = 'Left Players Turn';
            }
            console.log('hi')
            
            disappear(); 
            skat(); 
            newToggle = false; 
            document.querySelector('.tooltip')
              .classList.remove('tooltip-gone');  
          }
        })
        }
      } else if (thirdToggle === true) {
          if (replacingCard.dataset.productId) {
            let temp = replacingCard.dataset.productId; 
            nineCards.forEach ((cardReference) => {
              if (cardReference.img === temp) {
                let newTemp = cardReference;
                console.log(newTemp);
                let index = nineCards.indexOf(cardReference)
                nineCards[index] = newCards[1];
                newCards[1] = newTemp; 
                let randomCard = newCards[0]; 
                newCards.splice(0, 1); 
                newCards.push(randomCard); 
                console.log(nineCards[index].img);
                if (index < 3) {
                  document.querySelector(`.c${index}`)
                    .innerHTML = `<img class="card-image rotate left" data-product-id="${nineCards[index].img}" src="${nineCards[index].img}">`;
                  leftPlayerTotal = findTotal(0, 1, 2);
                  playerToggle = 'middle';
                  document.querySelector('.first-world').innerHTML = ''; 
                  document.querySelector('.player-turn-display')
                    .innerHTML = 'Middle Players Turn';
                } else if (index > 2 && index < 6) {
                  document.querySelector(`.c${index}`)
                    .innerHTML = `<img class="card-image js-middle-cards" data-product-id="${nineCards[index].img}" src="${nineCards[index].img}">`
                  middlePlayerTotal = findTotal(3, 4, 5); 
                  playerToggle = 'right';
                  document.querySelector('.second-world').innerHTML = ''; 
                  document.querySelector('.player-turn-display')
                    .innerHTML = 'Right Players Turn';
                } else if (index > 5) {
                  document.querySelector(`.c${index}`)
                    .innerHTML = `<img class="card-image rotate right" data-product-id="${nineCards[index].img}" src="${nineCards[index].img}">`
                  rightPlayerTotal = findTotal(6, 7, 8); 
                  playerToggle = 'left'; 
                  document.querySelector('.third-world').innerHTML = ''; 
                  document.querySelector('.player-turn-display')
                    .innerHTML = 'Left Players Turn';
                }
                document.querySelector('.starting-card')
                  .innerHTML = `<img class="card-image js-deck" src="${newCards[0].img}">
                  <img class="card-image deck" src="back_of_card.png">"`;
                  pickupFacedDown(document.querySelector('.deck'));
               
                disappear(); 
                skat();  
                thirdToggle = false;
                document.querySelector('.tooltip')
                  .classList.remove('tooltip-gone');
              }
          })
          }  
      }
      pickupFacedDown(document.querySelector('.deck'))
      pickUpCard(document.querySelector('.js-deck'))
    })
  })
}



