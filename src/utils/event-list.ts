interface IEventList {

	list: Map< string, CustomEvent >; 

};

export class EventList implements IEventList {

	list!: Map< string, CustomEvent >;
	
	constructor() {

		this.list = new Map();

	}

	add( name: string, data: any ): this {

		try {

			const event: CustomEvent = new CustomEvent( name, data );

			this.list.set( name, event );

		} catch ( e: unknown ) {

			console.error( e );

		}

		return this;

	}

	remove( name: string ): this {

		try {

			if ( this.list.has( name ) ) {

				this.list.delete( name );

			}

		} catch ( e: unknown ) {

			console.error( e );

		}

		return this;

	}

	clear(): this {

		this.list.clear();

		return this;

	}

	get( name: string ): CustomEvent | undefined {

		return this.list.get( name );

	}

	dispatch( el: HTMLElement, name: string ): void {

		try {

			const event: CustomEvent | undefined = this.list.get( name );

			if ( !( el instanceof HTMLElement ) ) {

				throw new Error( 'EventList -> dispatch :: ' )

			}

			if ( !event ) {

				throw new Error( `EventList -> dispatch :: cannot find event by name "${ name }"` );

			}

			el.dispatchEvent( event );

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};
