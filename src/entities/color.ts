import { IColor } from '../interfaces/color.interfaces';

function validateColorPart( color: number = 0 ): boolean {

	return typeof color === 'number' && color >= 0 && color <= 255;

}

function validateColorAlpha( alpha: number = 0 ): boolean {

	return typeof alpha === 'number' && alpha >= 0 && alpha <= 1;

}

export class Color implements IColor {

    r!: number;
    g!: number;
    b!: number;
    a!: number;

	constructor( { r, g, b, a }: IColor = { r: 0, b: 0, g: 0, a: 1 } ) {

		this.r = validateColorPart( r ) ? r : 0;
		this.g = validateColorPart( g ) ? g : 0;
		this.b = validateColorPart( b ) ? b : 0;
		this.a = validateColorAlpha( a ) ? a : 1;

	}

	toString(): string {

		return `rgba(${ this.r }, ${ this.g }, ${ this.b }, ${ this.a })`;

	}

};
