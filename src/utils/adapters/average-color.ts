import { IColor } from '../../interfaces/color.interfaces';

export function averageColor ( image: ImageData | null ): IColor {

	if ( image === null ) {

		return { r: 0, g: 0, b: 0, a: 1 };

	}

	if ( !( image instanceof ImageData ) ) {

		throw new Error( 'Ambilightify -> averageColor :: invalid image. Expected ImageData' );

	}

	const data = image.data;

	const color: IColor = {

		r: 0, g: 0, b: 0, a: 1,

	};

	for ( let i = 0; i < data.length; i += 4 ) {

		const r = data[ i ];
		const g = data[ i + 1 ];
		const b = data[ i + 2 ];
		const a = data[ i + 3 ];

		color.r = ( color.r + r )
		color.g = ( color.g + g );
		color.b = ( color.b + b );
		color.a = ( color.a + a );

	}

	const length: number = data.length / 4;

	color.r = Math.ceil( color.r / length );
	color.g = Math.ceil( color.g / length );
	color.b = Math.ceil( color.b / length );
	color.a = Math.ceil( color.a / length );

	return color;

}
