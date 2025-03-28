import { IAmbilighter } from '../interfaces/ambilighter.interfaces';
import { IOptions } from '../interfaces/options.interfaces';
import { IOutput } from '../interfaces/output.interface.ts';
import { Ambilighter } from './ambilighter.ts';
import { averageColor, getImageData } from '../utils/adapters';
import { Vector } from '../types/vectors.types.ts';

export class AmbilighterVideo extends Ambilighter< HTMLVideoElement > implements IAmbilighter {

    constructor ( el: ( HTMLVideoElement | null ), options: IOptions ) {

        super( el, options );

        try {

            if ( !( el instanceof HTMLVideoElement ) ) {

                throw new Error( 'AmbilighterVideo -> constructor :: invalid element' );

            }

			this.init();

        } catch ( e: unknown ) {

            console.error( e );

        }

    }

    static override validate( el: ( HTMLElement | null ) ): boolean {

        return el instanceof HTMLVideoElement;

    }

	protected init(): void {

		this.el.addEventListener( 'loadedmetadata', (): void => this.update() );
		this.el.addEventListener( 'timeupdate', (): void => this.update() );

	}

	protected deinit(): void {

		this.el.removeEventListener( 'loadedmetadata', (): void => this.update() );
		this.el.removeEventListener( 'timeupdate', (): void => this.update() );

	}

	protected update (): void {

		this.updateCanvas( this.el );

		const output: IOutput = {

			frame: {

				top: {
					
					color: averageColor( getImageData( this.canvas, Vector.top ) ),
					radius: this.radius,

				},

				bottom: {
					
					color: averageColor( getImageData( this.canvas, Vector.bottom ) ),
					radius: this.radius,

				},

				left: {
					
					color: averageColor( getImageData( this.canvas, Vector.left ) ),
					radius: this.radius,

				},

				right: {
					
					color: averageColor( getImageData( this.canvas, Vector.right ) ),
					radius: this.radius,

				},

			},

			averageColor: averageColor( getImageData( this.canvas, Vector.bottomRight ) ),

		};

		// Fires onLoad hook
		this.onUpdate( output );

	}

    /**
     * Updates when picture repainted
     * @param video { any }
     */
    protected override updateCanvas ( video: HTMLVideoElement ): void {

        try {
        
            const ctx: ( CanvasRenderingContext2D | null ) = this.canvas.getContext( '2d' );

            if ( ctx ) {

                this.canvas.width = video.videoWidth;
                this.canvas.height = video.videoHeight;

                ctx.drawImage( video, 0, 0, video.videoWidth, video.videoHeight );

            }

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
