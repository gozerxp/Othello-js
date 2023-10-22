import { reduce_font } from './utility.js';


export const alert = {
    active: false,
    pop: function (ctx, message, font_size = 18) {

        this.active = true;

        let max = {
            width: 0,
            message: ''
        };

        const margin = font_size * 1.75;
        ctx.font = `${font_size}px 'Press Start 2P'`;

        message.forEach((e) => {
            if (ctx.measureText(e).width > max.width) {
                max.width = ctx.measureText(e).width;
                max.message = e;
            }
        });

        let w = Math.min(max.width + margin * 2.5, ctx.canvas.width * 0.9);
        let h = font_size * message.length + margin * 2;

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
        font_size = reduce_font(ctx, max.message, font_size, w * 0.85);

        let start_y = ctx.canvas.height / 2 + font_size / 2 - (margin * (message.length - 1) / 2);

        for (let i = 0; i < message.length; i++) {
            position[0] = (ctx.canvas.width / 2) - (ctx.measureText(message[i]).width / 2);
            position[1] = start_y + (margin * i);
            ctx.fillText(message[i], ...position);
        }

    }
};
