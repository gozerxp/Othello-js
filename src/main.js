/*
Written by Dan Andersen
*/

import { game_board } from './othello.js';
import { check_valid_move, render_move } from "./matrix.js";
import { draw_scoreboard, alert, check_game_over } from './utility.js';
import { ai_loop } from './ai.js';

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
ai_loop(game);

if (__touch_device__) {
	game_canvas.ontouchstart = (e) => input(e.pageX, e.pageY);
} else {
	game_canvas.onclick = (e) => input(e.clientX, e.clientY);
}

const input = (x, y) => {

    if (game.game_over) {
        game.update_board = game.reset();
        game.draw(game_ctx);
        draw_scoreboard(game);
        alert.active = false;
        ai_loop(game);
        return;
    } 

    if (alert.active) {
        game.draw(game_ctx);
        draw_scoreboard(game);
        alert.active = false;
        ai_loop(game);
        return;
    }

    x = parseInt((x - canvas_margin.left) / game.x_size(game_ctx));
    y = parseInt((y - canvas_margin.top) / game.y_size(game_ctx));

    if (check_valid_move(game.get_board, x, y, game.get_player_turn)) {
        game.update_board = render_move(game.get_board, x, y, game.get_player_turn);
        game.switch_player_turn();
        game.draw(game_ctx);
        draw_scoreboard(game);

        game.game_over = check_game_over(game);

        if (!game.game_over) {
            ai_loop(game);
        }
    }
    
};






