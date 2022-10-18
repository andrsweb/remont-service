import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	formOnClick()
	submitForm()
} )

const formOnClick = () => {
	const formWrapper = document.querySelector( '.form-wrapper' )
	const formButton  = document.querySelectorAll( '.header-button' )
	const closeButton = document.querySelector( '.close-button' )
	const targetElement  = document.querySelector( '#body-lock' )

	if ( ! formWrapper && ! formButton ) return

	formButton.forEach( button => {
		button.addEventListener( 'click', () => {
			if ( ! formWrapper.classList.contains( 'openned' ) ) {
				disableBodyScroll( targetElement )
				formWrapper.classList.add( 'opened' )
			} else {
				formWrapper.classList.remove( 'opened' )
				enableBodyScroll( targetElement )
			}
		} )
	} )

	closeButton.addEventListener( 'click', () => { //close form by click cross
		formWrapper.classList.remove( 'opened' )
		enableBodyScroll( targetElement )
	} )

	formWrapper.addEventListener( 'click', e => {  //close for for touch anywhere
        e.stopPropagation()

        const target = e.target

        if ( target.className && target.classList.contains( 'form-wrapper' ) ) {
			formWrapper.classList.remove( 'opened' )
			enableBodyScroll( targetElement )
		}
    } )
}

const submitForm = () => {
	const forms			= document.querySelectorAll( '.form' )

	if( ! forms.length ) return

	forms.forEach( form => {
		form.addEventListener( 'submit', e => {
			e.preventDefault()

			const formResponse	= form.querySelector( '.form-response' ),
				  request		= new XMLHttpRequest(),
				  formData		= new FormData( form )

			request.open( 'post', 'send-form.php', true )

			formResponse.classList.remove( ['success', 'error'] )
			formResponse.textContent = 'Обработка...'

			request.addEventListener( 'load', () => {
				if  ( request.status === 200 ) {
					formResponse.classList.add( 'success' )
				} else {
					formResponse.classList.add( 'error' )
					console.error( request.response )
				}

				formResponse.textContent = request.response
			} )

			request.send( formData )
		} )
	} )
}