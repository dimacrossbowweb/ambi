
export type TVector = [0 | 1, 0 | 1, 0 | 1, 0 | 1];

export interface IVectorDirections {

	top: TVector;
	bottom: TVector;
	left: TVector;
	right: TVector;
	bottomRight: TVector;

};

export const Vector: IVectorDirections = {

	top: [ 0, 0, 1, 0 ],
	bottom: [ 0, 1, 1, 0 ],
	left: [ 0, 0, 0, 1 ],
	right: [ 1, 0, 0, 1 ],
	bottomRight: [ 0, 0, 1, 1 ],

};
