import '../css/ambi-box.css';
import { Formatted } from '../utils/formatted.ts';
import { Ambilight } from '../entities/ambilight';
import { Ambilighter } from '../entities/ambilighter';
import { IOptions } from '../interfaces/options.interfaces.ts';
import { Color } from '../entities/color.ts';

export class AmbiBox extends HTMLElement {

	private rendered: boolean = false;
	private ambilighter: ( Ambilighter<HTMLElement> | null ) = null;

	constructor() {

		super();

	}

	update() {

		const target: string = Formatted.formatStringAttribute( this.getAttribute( 'target' ), '' );
		const lightTo: string = Formatted.formatStringAttribute( this.getAttribute( 'light-to' ), '' );
		const radius: number = Formatted.formatNumberAttribute( this.getAttribute( 'radius' ), 0 );
		const onupdate: string = Formatted.formatStringAttribute( this.getAttribute( 'onupdate' ), '' ).trim();

		const targetElement: ( HTMLElement | null ) = document.getElementById( target );
		const lightToElement: ( HTMLElement | null ) = document.getElementById( lightTo ) || this.children[ 0 ];

		const options: IOptions = {

			'radius': radius,

		};

		if ( targetElement ) {

			this.ambilighter = Ambilight.produce( targetElement, options );

			if ( this.ambilighter?.onUpdate ) {

				this.ambilighter.onUpdate = ( data: any ): void => {

					const event: CustomEvent = new CustomEvent( 'onupdate', {

						detail: {

							data,

						},

						bubbles: true,
						composed: true,

					} );

					const boxShadows: Array<string> = [ 	

						`0 -${ radius / 2 }px ${ radius }px ${ new Color( data.frame.top.color ).toString() }`,
						`${ radius / 2 }px 0 ${ radius }px ${ new Color( data.frame.right.color ).toString() }`,
						`0 ${ radius / 2 }px ${ radius }px ${ new Color( data.frame.bottom.color ).toString() }`,
						`-${ radius / 2 }px 0 ${ radius }px ${ new Color( data.frame.left.color ).toString() }`

					];

					lightToElement.style.boxShadow = boxShadows.join( ',' );

					this.dispatchEvent( event );

					if ( onupdate && onupdate in window && typeof window[ onupdate ] === 'function' ) {

						window[ onupdate ].bind( this )( event );

					} 

				};

			}

		} else {

			const el: ( HTMLElement | null ) = ( this.children[ 0 ] instanceof HTMLElement ? this.children[ 0 ] : null );

			this.ambilighter = Ambilight.produce( el, options );
				
			if ( this.ambilighter?.onUpdate ) {

				this.ambilighter.onUpdate = ( data: any ): void => {

					const event: CustomEvent = new CustomEvent( 'onupdate', {

						detail: {

							data,

						},

						bubbles: true,
						composed: true,

					} );

					const boxShadows: Array<string> = [ 	

						`0 -${ radius / 2 }px ${ radius }px ${ new Color( data.frame.top.color ).toString() }`,
						`${ radius / 2 }px 0 ${ radius }px ${ new Color( data.frame.right.color ).toString() }`,
						`0 ${ radius / 2 }px ${ radius }px ${ new Color( data.frame.bottom.color ).toString() }`,
						`-${ radius / 2 }px 0 ${ radius }px ${ new Color( data.frame.left.color ).toString() }`

					];

					el.style.boxShadow = boxShadows.join( ',' );

					this.dispatchEvent( event );

					if ( onupdate && onupdate in window && typeof window[ onupdate ] === 'function' ) {

						window[ onupdate ].bind( this )( event );

					} 

				};

			}
		}

	}

	render() {

		this.className = 'ambi-box';

		this.update();

		this.attachShadow( { 'mode': 'open' } );

		if ( this.shadowRoot ) {

			this.shadowRoot.innerHTML = `

				<link rel="stylesheet" href="./src/css/ambi-box.css"></link>

				<slot></slot>
			
			`;

		}

		this.rendered = true;

	}

	connectedCallback() {

		this.render();

	}

	disconnectedCallback() {


	}

	static get observedAttributes() {

		return [

			'target',
			'radius',
			'onupdate',

		];
	
	}

	attributeChangedCallback( name: string, newValue: string ) {

		if ( this.rendered ) {

			this.update();

		}

	}

	adoptedCallback() {

	}

};

customElements.define( 'ambi-box', AmbiBox );
