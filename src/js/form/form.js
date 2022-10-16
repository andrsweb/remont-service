import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	formOnClick()
} )

const formOnClick = () => {
	const formWrapper = document.querySelector( '.form-wrapper' )
	const formButton  = document.querySelectorAll( '.hero-button' )
	const closeButton = document.querySelector( '.close-button' )
	const targetElement  = document.querySelector( '#body-lock' )

	if ( ! formWrapper && ! formButton ) return

	formButton.forEach( button => {
		button.addEventListener( 'click', () => {
			if ( ! formWrapper.classList.contains( 'openned' ) )
				formWrapper.classList.add( 'opened' )
			else formWrapper.classList.remove( 'opened' )
		} )
	} )

	closeButton.addEventListener( 'click', () => { //close form by click cross
		formWrapper.classList.remove( 'opened' )
	} )

	formWrapper.addEventListener( 'click', e => {  //close for for touch anywhere
        e.stopPropagation()

        const target = e.target

        if ( target.className && target.classList.contains( 'form-wrapper' ) )
            formWrapper.classList.remove( 'opened' )
    } )

	if ( formWrapper.classList.contains( 'opened') ) disableBodyScroll( targetElement )
	else enableBodyScroll( targetElement )
}