/*
Written by Dan Andersen
*/

import { game_board } from './othello.js';
import { draw_scoreboard, alert, check_game_over, ai_move } from './utility.js';

const _VERSION_ = "0.0.1";
export const game_ctx = document.getElementById("game_canvas").getContext("2d");

const canvas_margin = {
    top: 0,
    left: 0
};

//check for touchscreen
const __touch_device__ = window.ontouchstart !== undefined;

//*******************************************************//

let game_over = false;
const game = new game_board();
game.draw(game_ctx);
draw_scoreboard(game);

if (__touch_device__) {
	game_canvas.ontouchstart = (e) => input(e.pageX, e.pageY);
} else {
	game_canvas.onclick = (e) => input(e.clientX, e.clientY);
}

const input = (x, y) => {

    if (alert.active) {
        
        if (game_over) {
            game.update_board = game.reset();
            game.draw(game_ctx);
            draw_scoreboard(game);
            game_over = false;
        } else {
            game.draw(game_ctx);
            draw_scoreboard(game);
        }

        alert.active = false;

        return;
    }

    //player type is cpu, don't accept input0
    if (game.get_player_type(game.get_player_turn) !== 1) {
        return;
    }

    x = parseInt((x - canvas_margin.left) / game.x_size(game_ctx));
    y = parseInt((y - canvas_margin.top) / game.y_size(game_ctx));

    if (game.check_valid_move(game.get_board, x, y, game.get_player_turn)) {
        game.update_board = game.render_move(game.get_board, x, y, game.get_player_turn);
        game.switch_player_turn();

        game.draw(game_ctx);
        draw_scoreboard(game);

        game_over = check_game_over(game.get_valid_move_list.length, game);

        if (!game_over) {
            game_over = ai_move(game);
        }
    }
};




