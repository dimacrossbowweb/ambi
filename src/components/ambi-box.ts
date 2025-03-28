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

		try {

			const target: string = Formatted.formatStringAttribute( this.getAttribute( 'target' ), '' );
			const lightTo: string = Formatted.formatStringAttribute( this.getAttribute( 'light-to' ), '' );
			const radius: number = Formatted.formatNumberAttribute( this.getAttribute( 'radius' ), 0 );
			const targetElement: ( HTMLElement | Node | null ) = document.getElementById( target ) || this.children[ 0 ];
			const lightToElement: ( HTMLElement | Node | null ) = document.getElementById( lightTo ) || this.children[ 0 ];

			const options: IOptions = {

				'radius': radius,

			};

			if ( targetElement instanceof HTMLElement ) {

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

						if ( lightToElement instanceof HTMLElement ) {

							const boxShadows: Array<string> = [ 	

								`0 -${ radius / 2 }px ${ radius }px ${ new Color( data.frame.top.color ).toString() }`,
								`${ radius / 2 }px 0 ${ radius }px ${ new Color( data.frame.right.color ).toString() }`,
								`0 ${ radius / 2 }px ${ radius }px ${ new Color( data.frame.bottom.color ).toString() }`,
								`-${ radius / 2 }px 0 ${ radius }px ${ new Color( data.frame.left.color ).toString() }`

							];

							lightToElement.style.boxShadow = boxShadows.join( ',' );

							this.dispatchEvent( event );

						}

					};

				}

			}

		} catch ( e: unknown ) {

			console.error( e );

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
			'light-to',

		];
	
	}

	attributeChangedCallback() {

		if ( this.rendered ) {

			this.update();

		}

	}

	adoptedCallback() {

	}

};

customElements.define( 'ambi-box', AmbiBox );
