import { IColor } from './color.interfaces';

interface IBoxLightsBorder {

    color: IColor;
    radius: number;

};

interface IBoxLightsFrame {

	top?: IBoxLightsBorder;
	bottom?: IBoxLightsBorder;
	left?: IBoxLightsBorder;
	right?: IBoxLightsBorder;

};

export interface IOutput {

	frame: IBoxLightsFrame;
	averageColor: IColor;

};
