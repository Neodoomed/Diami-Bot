import { GlobalFonts, createCanvas, loadImage } from '@napi-rs/canvas';
import { BufferResolvable } from 'discord.js';
import { join } from 'path';

export class createLevelUp {
    user: string;
    level: number;
    userAvatar: string;
    background: string;
    backgroundBlur: boolean;
    gif: boolean;
    customIcon: string;

    constructor() {
        this.user = '';
        this.level = 0;
        this.userAvatar = '';
        this.background = '';
        this.backgroundBlur = false;
        this.gif = false;
        this.customIcon =
            'https://cdn.discordapp.com/attachments/1227001009574772777/1227066904183836692/1upGreen.png?ex=66270e1b&is=6614991b&hm=8cd99b0e262a761d8e51de1ec3d2eddb6baab31825aa411a228a5ae6ac3454b0&';
    }

    public setUserName(user: string) {
        this.user = user;
        return this;
    }

    public setUserLevel(userLevel: number) {
        this.level = userLevel;
        return this;
    }

    /* Avatar (url)*/
    public setUserAvatar(userAvatar: string) {
        this.userAvatar = userAvatar;
        return this;
    }
    /* Fondo (url) */
    public setCustomBackground(background: string) {
        this.background = background;
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

    public async createImage(): Promise<BufferResolvable> {
        const canvas = createCanvas(885, 150);
        const ctx = canvas.getContext('2d');
        ctx.roundRect(0, 0, 885, 150, [34]);
        ctx.clip();

        const cardBase = await this._renderBackground();
        ctx.drawImage(cardBase, 0, 0);

        const avatar = await this._renderAvatar();
        ctx.drawImage(avatar, 0, 0);

        const icon = await this._renderIcon();
        ctx.drawImage(icon, 0, 0);

        const border = await this._renderBorder();
        ctx.drawImage(border, 0, 0);

        const level = await this._renderBorderLevel();
        ctx.drawImage(level, 0, 0);

        const user = await this._userName();
        ctx.drawImage(user, 0, 0);

        return canvas.toBuffer('image/png');
    }
    /* Renderer la imagen */
    private async _renderBackground() {
        const canvas = createCanvas(885, 150);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#18191c';
        ctx.beginPath();
        ctx.fillRect(0, 0, 885, 150);
        ctx.fill();

        const cardBackground = await loadImage(this.userAvatar);
        ctx.filter = 'blur(9px)';
        ctx.drawImage(cardBackground, 0, -400, canvas.width, canvas.width);

        ctx.globalAlpha = 0.7;
        ctx.fillStyle = '#2a2d33';
        ctx.beginPath();
        ctx.fillRect(0, 0, 885, 150);
        ctx.fill();
        return canvas;
    }

    private async _renderAvatar() {
        const canvas = createCanvas(885, 150);
        const ctx = canvas.getContext('2d');

        const cardAvatar = await loadImage(this.userAvatar);
        //ctx.drawImage(cardAvatar, 0, 0, canvas.width, canvas.height);
        const roundValue = 90;

        ctx.beginPath();
        //ctx.roundRect(47, 39, 225, 225, [roundValue]);
        ctx.roundRect(22, 25, 100, 100, [roundValue]);
        ctx.clip();

        ctx.fillStyle = '#292b2f';
        ctx.beginPath();
        ctx.roundRect(22, 25, 100, 100, [roundValue]);
        ctx.fill();

        ctx.drawImage(cardAvatar, 22, 25, 100, 100);

        ctx.closePath();

        return canvas;
    }

    private async _userName() {
        const canvas = createCanvas(885, 150);
        const ctx = canvas.getContext('2d');

        /*
        GlobalFonts.registerFromPath(
            join(
                __dirname,
                '..',
                '..',
                'Assets',
                'Fonts',
                'Helvetica Neue Condensed Bold.otf'
            ),
            'Neue'
        );
        */

        const newSize = 40;
        const username = this.user;
        const userColor = '#FFFFFF';

        ctx.fillStyle = userColor;
        ctx.font = `${newSize}px Helvetica Bold`;
        ctx.textAlign = 'left';
        //ctx.fillText(username, 150, 88);
        ctx.shadowBlur = 4;
        ctx.strokeStyle = 'black';
        ctx.fillText(username.slice(0, 15), 150, 68);
        ctx.font = `${newSize - 15}px Helvetica Bold`;
        ctx.shadowBlur = 4;
        ctx.strokeStyle = 'black';
        ctx.fillText(`Level up!`, 150, 110);

        ctx.fillStyle = userColor;
        ctx.font = `${newSize}px Helvetica Bold`;
        ctx.textAlign = 'center';
        //ctx.fillText(`Level up`, 400, 88);
        ctx.strokeStyle = 'black';
        ctx.shadowBlur = 4;
        ctx.fillText(`${this.level - 1}`, 500, 88);
        ctx.strokeStyle = 'black';
        ctx.shadowBlur = 4;
        ctx.fillText(`${this.level}`, 675, 88);

        return canvas;
    }

    private async _renderIcon() {
        const canvas = createCanvas(885, 150);
        const ctx = canvas.getContext('2d');

        const cardIcon = await loadImage(this.customIcon);
        //ctx.drawImage(cardIcon, 0, 0, canvas.width, canvas.height);

        ctx.drawImage(cardIcon, 750, 20, 115, 115);

        return canvas;
    }

    private async _renderBorderLevel() {
        const canvas = createCanvas(885, 150);
        const ctx = canvas.getContext('2d');

        const grd = ctx.createLinearGradient(0, 0, 885, 150);
        grd.addColorStop(0, '#fcb969');
        grd.addColorStop(1, '#e26124');

        ctx.beginPath();
        ctx.arc(500, 75, 55, 0, 2 * Math.PI);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(675, 75, 55, 0, 2 * Math.PI);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.textAlign = 'center';
        ctx.font = `50px Helvetica Bold`;
        ctx.fillText(`>`, 588, 90);

        ctx.globalCompositeOperation = 'destination-out';

        ctx.beginPath();
        ctx.arc(500, 75, 50, 0, 2 * Math.PI);
        ctx.fill();
        ctx.arc(675, 75, 50, 0, 2 * Math.PI);
        ctx.fill();

        return canvas;
    }

    private async _renderBorder() {
        const canvas = createCanvas(885, 150);
        const ctx = canvas.getContext('2d');

        const grd = ctx.createLinearGradient(0, 0, 885, 150);
        grd.addColorStop(0, '#fcb969');
        grd.addColorStop(1, '#e26124');

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.fillRect(0, 0, 885, 150);

        ctx.globalCompositeOperation = 'destination-out';

        ctx.beginPath();
        ctx.roundRect(9, 9, 867, 131, [25]);
        ctx.fill();

        return canvas;
    }
}

export class createRank {
    userId: string;
    customBackground: string;
    backgroundBlur: boolean;
    gif: boolean;
    customIcon: string;

    constructor() {
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
