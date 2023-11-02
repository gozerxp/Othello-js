import { reduce_font } from './utility.js';


export const alert = {
    active: false,
    text: [],
    draw: function (ctx, text, font_size = 18) {

        this.active = true;

        this.text = text;

        let max = {
            width: 0,
            text: ''
        };

        const margin = font_size * 1.75;
        ctx.font = `${font_size}px 'Press Start 2P'`;

        this.text.forEach((e) => {
            if (ctx.measureText(e).width > max.width) {
                max.width = ctx.measureText(e).width;
                max.text = e;
            }
        });

        let w = Math.min(max.width + margin * 2.5, ctx.canvas.width * 0.9);
        let h = font_size * text.length + margin * 2;

        const size = [w, h];
        const position = [ctx.canvas.width / 2 - (size[0] / 2),
        ctx.canvas.height / 2 - (size[1] / 2)];

        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "rgb(55, 55, 55)";
        ctx.beginPath();
        ctx.roundRect(...position, ...size, 20);
        ctx.fill();
        
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        font_size = reduce_font(ctx, max.text, font_size, w * 0.85);

        let start_y = ctx.canvas.height / 2 + font_size / 2 - (margin * (this.text.length - 1) / 2);

        for (let i = 0; i < this.text.length; i++) {
            position[0] = (ctx.canvas.width / 2) - (ctx.measureText(this.text[i]).width / 2);
            position[1] = start_y + (margin * i);
            ctx.fillText(this.text[i], ...position);
        }

    }
};
