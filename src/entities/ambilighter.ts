import { IAmbilighter } from '../interfaces/ambilighter.interfaces';
import { IOptions } from '../interfaces/options.interfaces';

export abstract class Ambilighter <T extends HTMLElement> implements IAmbilighter {

    public el!: T;

    public options!: IOptions;

    protected canvas!: HTMLCanvasElement;

    constructor ( el: ( T | null ), options: IOptions ) {

        try {

            if ( !( el instanceof HTMLElement ) ) {

                throw new Error( 'Ambilighter -> constructor :: invalid element' );

            }

            if ( typeof options !== 'object' ) {

                throw new Error( 'Ambilighter -> constructor :: invalid options' );

            }

            this.el = el;
            this.options = options;

            this.canvas = document.createElement( 'canvas' );

        } catch ( e: unknown ) {

            console.error( e );

        }

    }

    static validate ( el: ( HTMLElement | null ) ): boolean {

        return el instanceof HTMLElement;

    }

    protected updateCanvas ( ..._args: any[] ): void {}

    /**
     * Hooks
     */

    onLoad (): void {

    }

    onUpdate ( ..._args: any ): void {


    }

    onDestroy(): void {
        
    }

};
