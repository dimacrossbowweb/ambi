import { IAmbilighter } from '../interfaces/ambilighter.interfaces';
import { IOptions } from '../interfaces/options.interfaces';
import { Ambilighter } from './ambilighter.ts';

export class AmbilighterCanvas extends Ambilighter< HTMLCanvasElement > implements IAmbilighter {

    constructor ( el: ( HTMLCanvasElement | null ), options: IOptions ) {

        super( el, options );

        try {

            if ( !( el instanceof HTMLCanvasElement ) ) {

                throw new Error( 'AmbilighterCanvas -> constructor :: invalid element' );

            }

        } catch ( e: unknown ) {

            console.error( e );

        }

    }

    static override validate( el: ( HTMLElement | null ) ): boolean {

        return el instanceof HTMLCanvasElement;

    }

    /**
     * Updates when picture repainted
     * @param canvas { any }
     */
    protected override updateCanvas ( canvas: HTMLCanvasElement ): void {

        try {
        
           this.canvas = canvas;

        } catch ( e: unknown ) {

            console.error( e );

        }

    }

	/**
	 * getters / setters
	 */
	get radius (): number {

		return this?.options?.radius || 0;

	}

    /**
     * Hooks
     */

    override onLoad ( ..._args: any ): void {

    }

    override onUpdate ( ..._args: any ): void {


    }

    override onDestroy(): void {
        
    }

};
