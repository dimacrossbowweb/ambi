import { IOptions } from './options.interfaces';

export interface IAmbilighter {

    el: HTMLElement;

    options: IOptions;

    /**
     * Hooks
     */
    onLoad (): void;
    onUpdate (): void;
    onDestroy (): void;

};
