export class RGB {

    constructor(hex="#0") {

        this.r = 0;   //red
        this.g = 0;   //green
        this.b = 0;   //blue
        this.a = 0;   //alpha

        this.alpha = false;

        this.HexToRGB (hex);
    }

    HexToRGB (hex) {
        let h = hex.slice(hex.startsWith('#') ? 1 : 0);
        
        if (h.length === 3) 
            h = [...h].map(x => x + x).join('');
        else if (h.length === 8) 
            this.alpha = true;
        
        h = parseInt(h, 16);

        this.r = (h >>> (this.alpha ? 24 : 16));
        this.g = ((h & (this.alpha ? 0x00ff0000 : 0x00ff00)) >>> (this.alpha ? 16 : 8));
        this.b = ((h & (this.alpha ? 0x0000ff00 : 0x0000ff)) >>> (this.alpha ? 8 : 0));
        this.a = this.alpha ? h & 0x000000ff : 0;
    }

    getRGB_string (show_alpha=false) {
        let txt = "rgb";
        txt += this.alpha && show_alpha ? 'a' : '';
        txt += '(';
        txt += `${this.r}, ${this.g}, ${this.b}`;
        txt += this.alpha && show_alpha ? `, ${this.a}` : '';
        txt += ')';
        return txt;
    }
}

export const Color_Fade = {

    twoColorFade : function (color1, color2, length) {

        let rIncr = (color2.r - color1.r) / (length - 1),
            gIncr = (color2.g - color1.g) / (length - 1),
            bIncr = (color2.b - color1.b) / (length - 1),
            r = color1.r,
            g = color1.g,
            b = color1.b,
            colors = [];

        for (let ii = 0; ii < length; ii++) {
            colors.push({r: parseInt(r), b: parseInt(b), g: parseInt(g)});
            r = Math.max(r + rIncr, 0);
            g = Math.max(g + gIncr, 0);
            b = Math.max(b + bIncr, 0);
        }

        return colors;
    }

};

