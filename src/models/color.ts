export interface IColor {
    r: number;
    g: number;
    b: number;
}

export class Color {
    private _r: number;
    private _g: number;
    private _b: number;

    public get r(): number {
        return this._r;
    }

    public get g(): number {
        return this._g;
    }

    public get b(): number {
        return this._b;
    }

    private checkCorrectColorValue(value: number): number {
        if (value < 0) {
            return 0;
        }
        if (value > 255) {
            return 255;
        }
        if (!Number.isInteger(value)) {
            return Math.round(value);
        }
        return value;
    }

    public set r(value: number) {
        this._r = this.checkCorrectColorValue(value);
    }

    public set g(value: number) {
        this._g = this.checkCorrectColorValue(value);
    }

    public set b(value: number) {
        this._b = this.checkCorrectColorValue(value);
    }

    private constructor() {
        this._r = 0;
        this._g = 0;
        this._b = 0;
    }
    
    static fromRGB(r: number, g: number, b: number): Color {
        const color = new Color();
        color.r = r;
        color.g = g;
        color.b = b;
        return color;
    }

    static fromIColor(colorI: IColor): Color {
        const color = new Color();
        color.r = colorI.r;
        color.g = colorI.g;
        color.b = colorI.b;
        return color;
    }

    static fromHex(hex: string): Color {
        const color = new Color();
        const colorArray: Array<number> = hex.match(/[0-9a-fA-F]{2}/g)?.map((value) => parseInt(value, 16)) || [];
        if (colorArray.length >= 3) {
            color.r = colorArray[0];
            color.g = colorArray[1];
            color.b = colorArray[2];
        } else {
            throw new Error('Invalid hex color!');
        }
        return color;
    }

    toHexString(): string {
        const redHex = this._r.toString(16).padStart(2, '0');
        const greenHex = this._g.toString(16).padStart(2, '0');
        const blueHex = this._b.toString(16).padStart(2, '0');

        return `#${redHex}${greenHex}${blueHex}`;
    }

    toIColor(): IColor {
        return {
            r: this._r,
            g: this._g,
            b: this._b
        };
    }

    darkenColor(t: number): Color {
        return Color.lerpColor(this, Color.black, t);
    }

    lightenColor(t: number): Color {
        return Color.lerpColor(this, Color.white, t);
    }

    static lerpColor(color1: Color, color2: Color, t: number): Color {
        t = Math.max(0, Math.min(1, t));
        return Color.fromRGB(
            color1.r + (color2.r - color1.r) * t,
            color1.g + (color2.g - color1.g) * t,
            color1.b + (color2.b - color1.b) * t
        );
    }

    static get randomColor(): Color {
        return Color.fromRGB(
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256)
        );
    }

    static get black(): Color {
        return Color.fromRGB(0, 0, 0);
    }

    static get white(): Color {
        return Color.fromRGB(255, 255, 255);
    }

    static get red(): Color {
        return Color.fromRGB(255, 0, 0);
    }

    static get green(): Color {
        return Color.fromRGB(0, 255, 0);
    }

    static get blue(): Color {
        return Color.fromRGB(0, 0, 255);
    }

    static defaultPalette(): Array<Color> {
        return [
            Color.fromHex('#AB42F5'),
            Color.fromHex('#42F58E'),
            Color.fromHex('#F5B441'),
            Color.fromHex('#B5955E'),
            Color.fromHex('#8660A0'),
            Color.fromHex('#60A07B'),
            Color.fromHex('#756B5A'),
            Color.fromHex('#47414B'),
        ];
    }
}