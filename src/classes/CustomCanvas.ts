import { createCanvas, loadImage } from '@napi-rs/canvas';
import CustomClient from './CustomClient';

export class createLevelUp {
    private canvas: any;
    client: CustomClient;
    userId: string;
    customBackground: string;
    backgroundBlur: boolean;
    gif: boolean;
    customIcon: string;

    constructor(client: CustomClient) {
        this.client = client;
        this.userId = '';
        this.customBackground = '';
        this.backgroundBlur = false;
        this.gif = false;
        this.customIcon = '';
    }

    /* Id del usuario */
    public setUser(userId: string) {
        this.userId = userId;
        return this;
    }
    /* Fondo (url) */
    public setCustomBackground(background: string) {
        this.customBackground = background;
        return this;
    }
    /* Desenfoque de Fondo */
    public setBackgroundBlur(value: boolean) {
        this.backgroundBlur = value;
        return this;
    }
    /* Icono Level Up (url) */
    public setCustomIcon(icon: string) {
        this.customIcon = icon;
        return this;
    }
    /* Fondo animado */
    public setGIF(value: boolean) {
        this.gif = value;
        return this;
    }
    /* Obtener el tamaño de las imágenes */
    private async _getImageSize() {}
    /* Renderer la imagen */
    private async _renderFrame() {}
}

export class createRank {
    private canvas: any;
    client: CustomClient;
    userId: string;
    customBackground: string;
    backgroundBlur: boolean;
    gif: boolean;
    customIcon: string;

    constructor(client: CustomClient) {
        this.client = client;
        this.userId = '';
        this.customBackground = '';
        this.backgroundBlur = false;
        this.gif = false;
        this.customIcon = '';
    }

    /* Id del usuario */
    public setUser(userId: string) {
        this.userId = userId;
        return this;
    }
    /* Fondo (url) */
    public setCustomBackground(background: string) {
        this.customBackground = background;
        return this;
    }
    /* Desenfoque de Fondo */
    public setBackgroundBlur(value: boolean) {
        this.backgroundBlur = value;
        return this;
    }
    /* Icono Level Up (url) */
    public setCustomIcon(icon: string) {
        this.customIcon = icon;
        return this;
    }
    /* Fondo animado */
    public setGIF(value: boolean) {
        this.gif = value;
        return this;
    }
    /* Obtener el tamaño de las imágenes */
    private async _getImageSize() {}
    /* Renderer la imagen */
    private async _renderFrame() {
        const canvas = createCanvas(885, 300);
        const ctx = canvas.getContext('2d');
    }
}

