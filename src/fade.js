export class RGB {

    constructor(rgb="rgb(0, 0, 0)") {

        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.alpha = 0; 

        this.alpha_check = false;

        this.parseRGB (rgb);
    }

    parseRGB(rgb) {
        let colorArr = rgb.slice( 
            rgb.indexOf("(") + 1,  
            rgb.indexOf(")") 
        ).split(", "); 

        this.red = parseInt(colorArr[0]);
        this.green = parseInt(colorArr[1]);
        this.blue = parseInt(colorArr[2]);

        //alpha channel present
        if (colorArr.length > 3) {
            this.alpha_check = true;
            this.alpha = parseInt(colorArr[3]);
        }

    }

    HexToRGB (hex) {
        let h = hex.slice(hex.startsWith('#') ? 1 : 0);
        
        if (h.length === 3) 
            h = [...h].map(x => x + x).join('');
        else if (h.length === 8) 
            this.alpha_check = true;
        
        h = parseInt(h, 16);

        this.red = (h >>> (this.alpha_check ? 24 : 16));
        this.green = ((h & (this.alpha_check ? 0x00ff0000 : 0x00ff00)) >>> (this.alpha_check ? 16 : 8));
        this.blue = ((h & (this.alpha_check ? 0x0000ff00 : 0x0000ff)) >>> (this.alpha_check ? 8 : 0));
        this.alpha = this.alpha_check ? h & 0x000000ff : 0;
    }

    getRGB_string (show_alpha=false) {
        let txt = "rgb";
        txt += this.alpha_check && show_alpha ? 'a' : '';
        txt += '(';
        txt += `${this.red}, ${this.green}, ${this.blue}`;
        txt += this.alpha_check && show_alpha ? `, ${this.alpha}` : '';
        txt += ')';
        return txt;
    }
}

export const Color_Fade = {

    twoColorFade : function (color1, color2, length) {

        let rIncr = (color2.red - color1.red) / (length - 1),
            gIncr = (color2.green - color1.green) / (length - 1),
            bIncr = (color2.blue - color1.blue) / (length - 1),
            r = color1.red,
            g = color1.green,
            b = color1.blue,
            colors = [];

        for (let ii = 0; ii < length; ii++) {
            colors.push(`rgb(${parseInt(r)}, ${parseInt(g)}, ${parseInt(b)})`);
            r = Math.max(r + rIncr, 0);
            g = Math.max(g + gIncr, 0);
            b = Math.max(b + bIncr, 0);
        }

        return colors;
    }

};

