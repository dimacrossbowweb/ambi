import { type TVector } from '../../types/vectors.types';

export function getImageData ( canvas: HTMLCanvasElement, vector: TVector ): ImageData | null {

	if ( !( canvas instanceof HTMLCanvasElement ) ) {

		throw new Error( 'getBorderImage :: invalid canvas' );

	}

	const ctx: ( CanvasRenderingContext2D | null ) = canvas.getContext( '2d' );

	const width: number = canvas.width;
	const height: number = canvas.height;

	if ( ctx ) {

		const imageData: ImageData = ctx.getImageData(
			
			( width - 1 ) * vector[ 0 ],
			( height - 1 ) * vector[ 1 ],
			width * vector[ 2 ] || 1,
			height * vector[ 3 ] || 1,
		
		);

		return imageData;

	}

	return null;

}
