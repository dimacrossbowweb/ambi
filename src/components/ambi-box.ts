import '../css/ambi-box.css';
import { EventList } from '../utils/event-list.ts';
import { Formatted } from '../utils/formatted.ts';
import { Ambilight } from '../entities/ambilight';
import { Ambilighter } from '../entities/ambilighter';
import { Color } from '../entities/color.ts';

export class AmbiBox extends HTMLElement {

	private rendered: boolean = false;
	private ambilighter: Ambilighter<HTMLElement> | null = null;
	private events!: EventList;

	constructor() {

		super();

		this.events = new EventList();

	}

	update() {

		const target: string = Formatted.formatStringAttribute( this.getAttribute( 'target' ), '' );

	}

	render() {

		this.className = 'ambi-box';

		const target: string = Formatted.formatStringAttribute( this.getAttribute( 'target' ), '' );

		const targetElement: HTMLElement | null = document.getElementById( target );

		if ( targetElement ) {

			console.log( 'targetElement' );
			console.log( targetElement );

			this.ambilighter = Ambilight.produce( targetElement, {} );

			if ( this.ambilighter?.onUpdate ) {

				this.ambilighter.onUpdate = ( data: any ): void => {

					document.body.style.transition = 'background-color .4s ease-in-out';
					document.body.style.backgroundColor = new Color( data.averageColor ).toString();

					this.events.dispatch( this, 'update' );

				};

			}

			

		} else {

			const el: HTMLElement | null = ( this.children[ 0 ] instanceof HTMLElement ? this.children[ 0 ] : null );

			console.log( 'el' );
			console.log( el );

			this.ambilighter = Ambilight.produce( el, {} );
				
			if ( this.ambilighter?.onUpdate ) {

				this.ambilighter.onUpdate = ( data: any ): void => {

					console.log( 'DATA' );
					console.log( data );

					document.body.style.transition = 'background-color .4s ease-in-out';
					document.body.style.backgroundColor = new Color( data.averageColor ).toString();

					this.events.dispatch( this, 'update' );

				};

			}
		}

		this.attachShadow( { 'mode': 'open' } );

		if ( this.shadowRoot ) {

			this.shadowRoot.innerHTML = `

				<link rel="stylesheet" href="./src/css/ambi-box.css"></link>

				<slot></slot>
			
			`;

		}

		this.rendered = true;

	}

	addEvents() {

		this.events.add( 'update', {

            detail: { message: 'Обновили данные' },
            bubbles: true,
            composed: true

		} );

	}

	removeEvents() {

		this.events.clear();

	}

	connectedCallback() {

		this.render();

		this.addEvents();

	}

	disconnectedCallback() {

		this.removeEvents();

	}

	static get observedAttributes() {

		return [

			'target',

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
