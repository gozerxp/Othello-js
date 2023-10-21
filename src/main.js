/*
Written by Dan Andersen
*/

import { game_board } from './othello.js';
import { draw_scoreboard, alert, check_game_over, ai_loop } from './utility.js';

const _VERSION_ = "0.0.1";
export const game_ctx = document.getElementById("game_canvas").getContext("2d");

const canvas_margin = {
    top: 75,
    left: 0
};

//check for touchscreen
const __touch_device__ = window.ontouchstart !== undefined;

//*******************************************************//

const game = new game_board(8, 0, 0);
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

    if (game.check_valid_move(game.get_board, x, y, game.get_player_turn)) {
        game.update_board = game.render_move(game.get_board, x, y, game.get_player_turn);
        game.switch_player_turn();
        game.draw(game_ctx);
        draw_scoreboard(game);

        game.game_over = check_game_over(game);

        if (!game.game_over) {
            ai_loop(game);
        }
    }
    
};






