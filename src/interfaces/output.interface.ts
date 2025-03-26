import { IColor } from './color.interfaces';

export interface IBoxLightsBorder {

    color: IColor;
    radius: number;

};

export interface IBoxLightsFrame {

	top?: IBoxLightsBorder;
	bottom?: IBoxLightsBorder;
	left?: IBoxLightsBorder;
	right?: IBoxLightsBorder;

};

export interface IOutput {

	frame: IBoxLightsFrame;
	averageColor: IColor;

};
