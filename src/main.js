/*
Written by Dan Andersen
*/

import { draw_scoreboard } from './draw_scoreboard.js';
import game_board from './othello.js';

const _VERSION_ = "0.0.1";
const game_canvas = document.getElementById("game_canvas");
const game_ctx = game_canvas.getContext("2d");
const score_canvas = document.getElementById("score_canvas");
const score_ctx = score_canvas.getContext("2d");

const canvas_margin = {
    top: 0,
    left: 0
};

//check for touchscreen
const __touch_device__ = window.ontouchstart !== undefined;

//*******************************************************//

const game = new game_board();
game.draw(game_ctx);
draw_scoreboard(score_ctx, game);

if (__touch_device__) {
	game_canvas.ontouchstart = (e) => input(e.pageX, e.pageY);
} else {
	game_canvas.onclick = (e) => input(e.clientX, e.clientY);
}

const input = (x, y) => {

    x = parseInt((x - canvas_margin.left) / game.x_size(game_ctx));
    y = parseInt((y - canvas_margin.top) / game.y_size(game_ctx));

    if (game.check_valid_move(game.get_board, x, y, game.player_turn)) {
        game.update_board = game.render_move(game.get_board, x, y, game.player_turn);
        game.switch_player_turn();

        let number_of_valid_moves = game.draw(game_ctx);
        draw_scoreboard();

        if (!number_of_valid_moves) {
            //see if valid moves exists for other player.
            if (game.get_valid_moves(game.get_board, -game.player_turn).length) {
                game.switch_player_turn();
                number_of_valid_moves = game.draw(game_ctx);
                draw_scoreboard(score_ctx, game);
                console.log("** NO VALID MOVE - TURN SKIPPED **");
                //console.log("Available moves: " + number_of_valid_moves);
            } else {
                console.log("***** GAME OVER! *****");
                console.log("No more valid moves!");
            }
         } //else {
        //     console.log("Available moves: " + number_of_valid_moves)
        // }

    }
}

