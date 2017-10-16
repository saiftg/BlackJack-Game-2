// console.log("sup");


$(document).ready(()=>{

	const freshDeck = createDeck();
	// console.log(freshDeck);
	var theDeck = [];
	var playersHand = [];
	var dealersHand = [];
	// var bets = 0;
	var playerPot = 500;
	var currentPot = 0;

	$('.bet5-button').attr('disabled', true);
	$('.bet10-button').attr('disabled', true);
	$('.bet20-button').attr('disabled', true);


	$('.deal-button').click(()=>{
		// console.log("user cick");
		$('.hit-button').attr('disabled', true);
		$('.dealer-total').hide();
		// $('.dealer-cards').hide();

		$('.bet5-button').attr('disabled', false);
		$('.bet10-button').attr('disabled', false);
		$('.bet20-button').attr('disabled', false);
		playersHand = [];
		dealersHand = [];
		var newDeck = freshDeck.slice();
		theDeck = shuffleDeck(newDeck);
		// console.log(theDeck);
		topCard = theDeck.shift();
		playersHand.push(topCard);

		topCard = theDeck.shift();
		dealersHand.push(topCard);

		topCard = theDeck.shift();
		playersHand.push(topCard);

		topCard = theDeck.shift();
		dealersHand.push(topCard);

		setTimeout(function(){placeCard('player',1,playersHand[0]);},200);
		
		setTimeout(function(){placeCard('player',2,playersHand[1]);},1800);

		setTimeout(function(){placeCard('dealer',1,dealersHand[0]);},900);
		// setTimeout(function(){placeCard('dealer',2,dealersHand[1]);},2200);

		// $('#dealer2').hide();
		calculateTotal(playersHand,'player');
		calculateTotal(dealersHand,'dealer');

		console.log(playersHand);
		console.log(dealersHand);

		var playerTotal = calculateTotal(playersHand,'player');
		if(playerTotal == 21){
			setTimeout(function(){checkWin()},300);
			reset();




		
}
	$('.bet5-button').click(()=>{


		$('.hit-button').attr('disabled', false);
		
		playerPot -= 5;
		currentPot += 5;
		var classSelector2 = `.bet-money`;
		var classSelector = `.player-money`;
		$(classSelector).html(playerPot);
		$(classSelector2).html(currentPot);
		// return playerPot;
		// return currentPot;
		if(playerPot <= 0){
			alert("No mo money honey!");
			$('.bet5-button').attr('disabled', true);
			$('.bet10-button').attr('disabled', true);
			$('.bet20-button').attr('disabled', true);

		}
	});

	$('.bet10-button').click(()=>{


		$('.hit-button').attr('disabled', false);
		var bet = 10;
		playerPot -= bet;
		currentPot += bet;
		var classSelector2 = `.bet-money`;
		var classSelector = `.player-money`;
		$(classSelector).html(playerPot);
		$(classSelector2).html(currentPot);
		// return playerPot;
		// return currentPot;
		if(playerPot <= 0){
			alert("No mo money honey!");
			$('.bet5-button').attr('disabled', true);
			$('.bet10-button').attr('disabled', true);
			$('.bet20-button').attr('disabled', true);

		}
	});

	$('.bet20-button').click(()=>{

		$('.hit-button').attr('disabled', false);
		playerPot -= 20;
		currentPot += 20;
		var classSelector = `.player-money`;
		var classSelector2 = `.bet-money`;
		$(classSelector).html(playerPot);
		$(classSelector2).html(currentPot);
		// return playerPot;
		// return currentPot;
		if(playerPot <= 0){
			alert("No mo money honey!");
			$('.bet5-button').attr('disabled', true);
			$('.bet10-button').attr('disabled', true);
			$('.bet20-button').attr('disabled', true);

		}
		
	});
	

	});

	function calculateTotal(hand,who){
		var handTotal = 0;
		var thisCardTotal = 0;
		var hasAce = false;
		var totalAces = 0;
		for(let i = 0; i < hand.length; i++){
			thisCardTotal = Number(hand[i].slice(0,-1));
			if(thisCardTotal == 1){
				hasAce = true;
				thisCardTotal = 11;
				totalAces++;
			}else if (thisCardTotal > 10){
				thisCardTotal = 10;
			}

			handTotal += thisCardTotal;
		}
		for (let i = 0; i < totalAces; i ++){
			if(handTotal > 21){
				handTotal -= 10;
			}
		}



		var classSelector = `.${who}-total`;
		$(classSelector).html(handTotal);
		return handTotal;
	}


	function placeCard(who,where,card){
		var classSelector = `.${who}-cards .card-${where}`;
		$(classSelector).html(`<img src="images/cards/${card}.png" />`);

	}



	


	$('.hit-button').click(()=>{

		if(calculateTotal(playersHand,'player') < 21){

		// console.log("user cick");
			var topCard = theDeck.shift();
			// push it on to the playersHand
			playersHand.push(topCard);
			// put the card in teh DOM
			// placeCard('player',playersHand.length, topCard);
			setTimeout(function(){placeCard('player',playersHand.length, topCard);},500);

			// calculate teh new total
			calculateTotal(playersHand,'player');
		}
		var playerTotal = calculateTotal(playersHand,'player');
		if(playerTotal >= 21){
		setTimeout(function(){checkWin()},800);
}
	});

	$('.stay-button').click(()=>{
		// console.log("user cick");
		$('.hit-button').attr('disabled', true);
		placeCard('dealer',2,dealersHand[1]);

		// $('#dealer2').show();
		// $('.dealer-cards').show();
		$('.dealer-total').show();

		var dealersTotal = calculateTotal(dealersHand,'dealer');
		while(dealersTotal < 17){
			var topCard = theDeck.shift();
			dealersHand.push(topCard);
			placeCard('dealer',dealersHand.length, topCard);
			dealersTotal = calculateTotal(dealersHand,'dealer');
		}
		checkWin();
		
	});



	function checkWin(){
		var playerTotal = calculateTotal(playersHand,'player');
		var dealersTotal = calculateTotal(dealersHand,'dealer');

		
		if(playerTotal > 21){
			alert(playerTotal + "!!.." + "Bust! You lose..");

		setTimeout(function(){reset()},600);
		}else if(dealersTotal > 21){
			alert(dealersTotal + "!!.." + "Dealer bust!!");
			playerPot += (currentPot * 2);
			$('.player-money').html(playerPot);
			setTimeout(function(){reset()},600);	
		}else if(playersHand.length == 2 && playerTotal == 21){
			alert(playerTotal + "!!.." + "BLACKJACK! You win");
			playerPot += (currentPot * 2);
			$('.player-money').html(playerPot);
			setTimeout(function(){reset()},600);
		}else if(dealersHand.length == 2 && dealersTotal == 21){
			alert(dealersTotal + "!!.." + "BLACKJACK! House wins again");
			$('.player-money').html(playerPot);
			setTimeout(function(){reset()},600);
		}else if(playerTotal > dealersTotal){
			alert(playerTotal + "!!.." + "You win I guess");
			playerPot += (currentPot * 2);
			$('.player-money').html(playerPot);
			setTimeout(function(){reset()},600);	
		}else if(dealersTotal > playerTotal){
			alert(dealersTotal + "!!.." + "You lose! Get out!")
			playerPot = playerPot;
			$('.player-money').html(playerPot);
			setTimeout(function(){reset()},600);	
		}else if(dealersTotal == playerTotal){
			alert(dealersTotal + "!!.." + "Tie! Everybody gets some..!")
			playerPot += currentPot;
			$('.player-money').html(playerPot);
			setTimeout(function(){reset()},600);	
		}

	}
	function reset(){
	// the deck needs to be reset
	theDeck = freshDeck; //Make a copy of our constant freshDeck
	// the player and dealer hands need to be reset
	playersHand = [];
	dealersHand = [];
	currentPot = (currentPot * 0);
	$(`.bet-money`).html(0);
	// reset the DOM
	// - cards
	$('.card').html('<img src="images/cards/deck.png"/>');
	$('.dealer-cards').show();
	$('.bet5-button').attr('disabled', true);
	$('.bet10-button').attr('disabled', true);
	$('.bet20-button').attr('disabled', true);
	// - totals
	var playerTotal = calculateTotal(playersHand,'player');
	var dealerTotal = calculateTotal(dealersHand,'dealer');

}

	function createDeck(){
		var newDeck = [];
		const suits = ['h','s','d','c'];
		currentPot = 0;

		for(let s = 0; s < suits.length; s++){
			for(let c = 1; c <= 13; c++){
				newDeck.push(c+suits[s]);
			}
		}
		return newDeck;
	}

	function shuffleDeck(arrayToBeShuffled){
		for(let i = 0; i < 50000; i++){
			var rand1 = Math.floor(Math.random() * arrayToBeShuffled.length);
			var rand2 = Math.floor(Math.random() * arrayToBeShuffled.length);
			var saveValueOfCard1 = arrayToBeShuffled[rand1];
			arrayToBeShuffled[rand1] = arrayToBeShuffled[rand2];
			arrayToBeShuffled[rand2] = saveValueOfCard1;
		}
		return arrayToBeShuffled;
	}

	 


	$('.reset-button').click(()=>{
		reset();
		currentPot == 0;
	});

});