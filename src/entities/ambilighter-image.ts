import { IAmbilighter } from '../interfaces/ambilighter.interfaces';
import { IOptions } from '../interfaces/options.interfaces';
import { IOutput } from '../interfaces/output.interface.ts';
import { Ambilighter } from './ambilighter.ts';
import { averageColor, getImageData } from '../utils/adapters';
import { Vector } from '../types/vectors.types.ts';

export class AmbilighterImage extends Ambilighter< HTMLImageElement > implements IAmbilighter {

    constructor ( el: ( HTMLImageElement | null ), options: IOptions ) {

        super( el, options );

        try {

            if ( !( el instanceof HTMLImageElement ) ) {

                throw new Error( 'AmbilighterImage -> constructor :: invalid element' );

            }

            el.onload = (): void => {

				this.update();

            }

			this.update();

        } catch ( e: unknown ) {

            console.error( e );

        }

		return new Proxy( this, {

			set( target: AmbilighterImage, prop: ( string | symbol ), handler: (..._args: any) => void ): boolean {

				if ( prop === 'onUpdate' ) {

					target[ prop ] = handler;

					target.update();

				}

				return true;
			
			},

		} );

    }

    static override validate( el: ( HTMLElement | null ) ): boolean {

        return el instanceof HTMLImageElement;

    }

	protected update (): void {

		this.updateCanvas( this.el );

		const output: IOutput = {

			frame: {

				top: {
					
					color: averageColor( getImageData( this.canvas, Vector.top ) ),
					radius: 1,

				},

				bottom: {
					
					color: averageColor( getImageData( this.canvas, Vector.bottom ) ),
					radius: 1,

				},

				left: {
					
					color: averageColor( getImageData( this.canvas, Vector.left ) ),
					radius: 1,

				},

				right: {
					
					color: averageColor( getImageData( this.canvas, Vector.right ) ),
					radius: 1,

				},

			},

			averageColor: averageColor( getImageData( this.canvas, Vector.bottomRight ) ),

		};

		// Fires onLoad hook
		this.onUpdate( output );

	}

    /**
     * Updates when picture repainted
     * @param image { any }
     */
    protected override updateCanvas ( image: HTMLImageElement ): void {

        try {
        
            const ctx: ( CanvasRenderingContext2D | null ) = this.canvas.getContext( '2d' );

            if ( ctx ) {

                this.canvas.width = image.naturalWidth;
                this.canvas.height = image.naturalHeight;

                ctx.drawImage( image, 0, 0, image.naturalWidth, image.naturalHeight );

            }

        } catch ( e: unknown ) {

            console.error( e );

        }

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
