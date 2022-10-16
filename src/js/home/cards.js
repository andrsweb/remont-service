document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	showMoreCards()
} )

const showMoreCards = () => {
	const cardsButton = document.querySelector( '.cards-button' )

	if ( ! cardsButton ) return

	cardsButton.addEventListener( 'click', () => {
		const cards = document.querySelectorAll( '.card-item:not(.visible)' )

		if ( ! cards.length ) {
			cardsButton.remove()
			return
		}

		for ( let i = 0; i < 18; i++ ) {
			if ( ! cards[i] ) break

			cards[i].style.height = cards[i].querySelector( '.card-item-inner' ).getBoundingClientRect().height + 'px'
			cards[i].classList.add( 'visible' )
		}

		if ( cards.length <= 18 ) cardsButton.remove()
	} )
}

window.addEventListener( 'resize', () => {
	const cards = document.querySelectorAll( '.card-item.visible' )

	if ( ! cards.length ) return

	cards.forEach( card => {
		card.style.height = card.querySelector( '.card-item-inner' ).getBoundingClientRect().height + 'px'
	} )
} )
