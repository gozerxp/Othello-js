/*
Written by Dan Andersen
*/

import { game_board } from './othello.js';
import { draw_scoreboard } from './utility.js';
import { ai } from './ai.js';
import { input } from './input.js';

const _VERSION_ = "1.0.0 BETA";
export const game_ctx = document.getElementById("game_canvas").getContext("2d");

const canvas_margin = {
    top: 60,
    left: 0
};

let aspect_ratio = (3/4);

if (window.innerHeight > window.innerWidth) {
    aspect_ratio = (4/3);
}

game_ctx.canvas.height = aspect_ratio * game_ctx.canvas.width - canvas_margin.top;

if (game_ctx.canvas.width > window.innerWidth) {
    game_ctx.canvas.width = window.innerWidth;
1}

if(game_ctx.canvas.height + canvas_margin.top > window.innerHeight) {
    game_ctx.canvas.height = window.innerHeight - canvas_margin.top;
}



//check for touchscreen
const __touch_device__ = window.ontouchstart !== undefined;

//*******************************************************//

const game = new game_board();
game.draw(game_ctx);
draw_scoreboard(game);
ai.loop(game);


if (__touch_device__) {
	game_canvas.ontouchstart = (e) => input(e.pageX, e.pageY, game, game_ctx, canvas_margin);
} else {
	game_canvas.onclick = (e) => input(e.clientX, e.clientY, game, game_ctx, canvas_margin);
}


