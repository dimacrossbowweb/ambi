import { IOptions } from '../interfaces/options.interfaces';
import { Ambilighter } from './ambilighter';
import { AmbilighterImage } from './ambilighter-image';
import { AmbilighterVideo } from './ambilighter-video';
import { AmbilighterCanvas } from './ambilighter-canvas';

export class Ambilight {

    static produce ( el: ( HTMLElement | null ), options: IOptions ): ( Ambilighter<HTMLElement> | null ) {

        if ( AmbilighterImage.validate( el ) ) {

            return new AmbilighterImage( el as HTMLImageElement, options );

        }

        if ( AmbilighterVideo.validate( el ) ) {

            return new AmbilighterVideo( el as HTMLVideoElement, options );

        }

        if ( AmbilighterCanvas.validate( el ) ) {

            return new AmbilighterCanvas( el as HTMLCanvasElement, options );

        }
        
        return null;

    }

};
