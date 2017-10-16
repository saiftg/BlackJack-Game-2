$(document).ready(function(){
	// Wait for the DOM JS...
	// BlackJack deal function
	// 	Create deck function
	// 	Shuffle deck function
	// 	Add card[0] and card[2] to player hand, 1 and 3 to dealer
	// 	Place card function
	// 	Push card onto players array

	var playersHand = [];
	var dealersHand = [];
	// freshDeck is the return value of the function createDeck
	const freshDeck = createDeck();
	console.log(freshDeck);
	// Make a FULL copy of teh freshDeck with slice, don't point at it.
	var theDeck = freshDeck.slice();
	// shuffleDeck();

	$('.deal-button').click(()=>{
		// We will create and shuffle a new deck
	

		theDeck = freshDeck.slice();
		theDeck = shuffleDeck(theDeck);
		playersHand = [];
		dealersHand = [];
		// console.log(theDeck);
		// Update the player and dealer hand arrays...
		// The player ALWAYS gets teh first card in teh deck...
		console.log(theDeck)
		// console.log(theDeck.length);
		var topCard = theDeck.shift();
		// console.log(topCard);
		// console.log(theDeck.length);
		playersHand.push(topCard);

		// Give the dealer the next top card
		topCard = theDeck.shift();
		dealersHand.push(topCard);

		// Give the player the next top card
		topCard = theDeck.shift();
		playersHand.push(topCard);

		// Give the dealer the next top card
		topCard = theDeck.shift();
		dealersHand.push(topCard);

		console.log(playersHand);
		console.log(dealersHand);

		setTimeout(function(){placeCard('player',1,playersHand[0]);},200)
		
		setTimeout(function(){placeCard('player',2,playersHand[1]);},1600)

		setTimeout(function(){placeCard('dealer',1,dealersHand[0]);},800)
		setTimeout(function(){placeCard('dealer',2,dealersHand[1]);},2000)


		// Call placeCard for each of the 4 cards.
		// arg 1: who
		// arg 2: where
		// arg 3: what (card to place in teh DOM)
		placeCard('player',1,playersHand[0]);
		placeCard('dealer',1,dealersHand[0]);
		placeCard('player',2,playersHand[1]);
		placeCard('dealer',2,dealersHand[1]);

		// Figure teh total and put it in teh dom
		// arg1: entire hand
		// arg2: who
		calculateTotal(playersHand,'player')
		calculateTotal(dealersHand,'dealer')

	})

	$('.hit-button').click(()=>{
		// Hit functionallity...
		console.log("User clicked the hit button")
		// get the top card
		var topCard = theDeck.shift();
		// push it on to the playersHand
		playersHand.push(topCard);
		// put the card in teh DOM
		placeCard('player',playersHand.length, topCard)
		// calculate teh new total
		calculateTotal(playersHand,'player');
	})	

	$('.stand-button').click(()=>{
		// Stand functionallity...
		// console.log("User clicked the stand button")
		// What happens to teh players hand on "Stand"?
		// - Nothing.
		// Control passes over the dealer.
		// Rules for the dealer:
		// 1. If I have less than 17... I MUST hit
		// 2. If I have 17 or more, I CANNOT hit (even if it means losing)
		var dealersTotal = calculateTotal(dealersHand,'dealer');
		while(dealersTotal < 17){
			var topCard = theDeck.shift();
			dealersHand.push(topCard);
			placeCard('dealer',dealersHand.length, topCard);
			dealersTotal = calculateTotal(dealersHand,'dealer');
		}
		checkWin();
	})

	function reset(){
		// In order to reset the game, we need to:
		// 1. Reset the deck.
		theDeck = freshDeck.slice();
		shuffleDeck();
		// 2. Reset teh player and dealer hand arrays
		playersHand = [];
		dealersHand = [];
		// 3. REset the cards in teh DOM
		$('.card').html('');
		// 4. Reset the totals for both players
		$('.dealer-total-number').html('0')
		$('.player-total-number').html('0')
		$('.message').text('');

	}


	function checkWin(){
		var playerTotal = calculateTotal(playersHand,'player');
		var dealersTotal = calculateTotal(dealersHand,'dealer');

		// 1. If the player has > 21, player busts and loses.
		// 2. If the dealer has > 21, dealer busts and loses.
		// 3. If playersHand.length == 2 AND playerTotal == 21... BLACKJACK
		// 4. If dealerHand.length == 2 AND dealersTotal == 21... BLACKJACK
		// 5. If player > dealer, player wins
		// 6. if dealer > player, dealer wins
		// 7. else... push (tie)
		if(playerTotal > 21){
			alert("Bust! You lose..");
		}else if(dealersTotal > 21){
			alert("Dealer bust!!");
		}else if(playersHand.length == 2 && playerTotal == 21){
			alert("BLACKJACK! You win");
		}else if(dealersHand.length == 2 && dealersTotal == 21){
			alert("BLACKJACK! House wins again");
		}else if(playerTotal > dealersTotal){
			alert("You win I guess");
		}else if(dealersTotal > playerTotal){
			alert("You lose! Get out!")
		}
	}

	function calculateTotal(hand, who){
		// purpose:
		// 1. Find out the number and return it
		// 2. Update the DOM with the right number for the right player
		// init counter at 0
		var handTotal = 0;
		// As we loop through the hand, we need a var for each card's value
		var thisCardsValue = 0;
		Ace = false;
		for(let i = 0; i < hand.length; i++){
			// copy onto thisCardsValue the entire string EXCEPT for the last char (which is the suit)
			// then, convert it to a number			
			thisCardsValue = Number(hand[i].slice(0,-1));
			if((thisCardsValue == 1) && ((handTotal + 11) <= 21)){
			thisCardsValue = 11;
			Ace = true;
		}else if(thisCardsValue > 10){
			thisCardVsalue == 10;
		}else if ((thisCardsValue + handTotal > 21) && (Ace)){
			handTotal = handTotal - 10;
			Ace = false;
		}
			handTotal += thisCardsValue
		}
		var classSelector = `.${who}-total`;
		$(classSelector).html(handTotal);
		return handTotal;
	}

	function placeCard(who,where,whatToPlace){
						// who = "dealer"
						// where = 1
		var classSelector = `.${who}-cards .card-${where}`;
							 // $('.dealer-cards .card-1')
		// Set the HTML of the div with .who-cards .card-where with the image...
		// $(classSelector).html('<img src="images/cards/'+whatToPlace+'.png" />');
		$(classSelector).html(`<img src="images/cards/${whatToPlace}.png" />`);

	}

	function createDeck(){
		// local var. Per JS scope, no one knows about this var but me (createDeck function)
		var newDeck = [];
		// Card = suit + value
		// suits is a constant. It cannot be reassigned. 
		const suits = ['h','s','d','c'];
		// suits.push("special") //will error!!!
		// outer loop for suit
		// suits.map((s)=>{
		// })
		for(let s = 0; s < suits.length; s++){
			// inner loop for value
			for(let c = 1; c <= 13; c++){
				newDeck.push(c+suits[s]);
			}
		}
		// console.log(newDeck);
		return newDeck;
	}

	function shuffleDeck(aDeckToBeShuffled){
		// Loop. A lot. Like those machines in casinos. 
		// Each time through the loop, we will switch to indicies (cards)
		// When the loop (lots of times) is done, the array (Deck) will be shuffled
		for(let i = 0; i < 50000; i++){
			var rand1 = Math.floor(Math.random() * aDeckToBeShuffled.length);
			var rand2 = Math.floor(Math.random() * aDeckToBeShuffled.length);
			// switch theDeck[rand1] with theDeck[rand2]
			// Stash teh value of theDeck[rand1] inside card1Defender so
			// we can get it back after overwriting theDeck[rand1] with tehDeck[rand2]
			var card1Defender = aDeckToBeShuffled[rand1]; 
			// now it's safe to overwrite theDeck[rand1], becasue we saved it
			aDeckToBeShuffled[rand1] = aDeckToBeShuffled[rand2];
			aDeckToBeShuffled[rand2] = card1Defender;
		}
		// console.log(theDeck);
		return aDeckToBeShuffled;
	}
	
});
