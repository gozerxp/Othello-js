/*
Written by Dan Andersen
2023 Gozerxp Software
*/

import { game_board } from './othello.js';
import { resize_display, score_ctx, title_ctx } from './utility.js';
import { ai } from './ai.js';
import { input } from './input.js';

const _VERSION_ = "1.0.0 BETA";
export const font_face = "PressStart2P";
export const game_ctx = document.getElementById("game_canvas").getContext("2d");

const canvas_margin = {
    top: 60,
    left: 0
};

//check for touchscreen
const __touch_device__ = window.ontouchstart !== undefined;

//*******************************************************//

const game = new game_board(8, 1, 0);

const game_font = new FontFace(`${font_face}`, `url(./assets/${font_face}.ttf)`);
//draw game once font is loaded
game_font.load().then((font) => {
    document.fonts.add(font);
    console.log("font loaded");

    resize_display(game, game_ctx, canvas_margin.top);
    ai.loop(game);
});

//*******************************************************//

if (__touch_device__) {
	game_canvas.ontouchstart = (e) => input(e.pageX, e.pageY, game, game_ctx, canvas_margin);
} else {
	game_canvas.onclick = (e) => input(e.clientX, e.clientY, game, game_ctx, canvas_margin);
}

window.onresize = () => resize_display(game, game_ctx, canvas_margin.top);


