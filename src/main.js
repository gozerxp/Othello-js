/*
Written by Dan Andersen
*/

import { game_board } from './othello.js';
import { draw_scoreboard } from './draw_scoreboard.js';

const _VERSION_ = "0.0.1";
const game_canvas = document.getElementById("game_canvas");
const game_ctx = game_canvas.getContext("2d");

const canvas_margin = {
    top: 0,
    left: 0
};

//check for touchscreen
const __touch_device__ = window.ontouchstart !== undefined;

//*******************************************************//

const game = new game_board();
game.draw(game_ctx);
draw_scoreboard(game);

if (__touch_device__) {
	game_canvas.ontouchstart = (e) => input(e.pageX, e.pageY);
} else {
	game_canvas.onclick = (e) => input(e.clientX, e.clientY);
}

const input = (x, y) => {

    //player type is cpu, don't accept input
    if (game.get_player_type(game.get_player_turn) !== 1) {
        return;
    }

    x = parseInt((x - canvas_margin.left) / game.x_size(game_ctx));
    y = parseInt((y - canvas_margin.top) / game.y_size(game_ctx));

    if (game.check_valid_move(game.get_board, x, y, game.get_player_turn)) {
        game.update_board = game.render_move(game.get_board, x, y, game.get_player_turn);
        game.switch_player_turn();

        let number_of_valid_moves = game.draw(game_ctx);
        draw_scoreboard(game);

        if (!check_game_over(number_of_valid_moves, game)) {
            ai_move(game);
        }
    }
};

const check_game_over = (number_of_valid_moves, game) => {

    let game_over = false;

    if (!number_of_valid_moves) {
        //see if valid moves exists for other player.
        if (game.get_valid_moves(game.get_board, -game.get_player_turn).length) {
            game.switch_player_turn();
            number_of_valid_moves = game.draw(game_ctx);
            draw_scoreboard(game);
            console.log("** NO VALID MOVE - TURN SKIPPED **");

            ai_move(game);
        } else {
            game_over = true
            console.log("***** GAME OVER! *****");
            console.log(declare_winnter(game.p1_score, game.p2_score));
        }
    }

    return game_over;
};

const declare_winnter = (p1, p2) => {
    
    let txt = '';
    if(p1 === p2) {
        txt = 'Tied game!';
    } else if (p1 > p2) {
        txt = 'Player 1 Wins!';
    } else if (p2 > p1) {
        txt = 'Player 2 Wins!';
    }

    return txt;
}

const ai_move = (game) => {

    if (game.get_player_type(game.get_player_turn) !== 0) {
        return;
    }

    let valid_moves = game.get_valid_move_list;

    if (!valid_moves.length) {
        return;
    }

    let rand_index = Math.floor(Math.random() * valid_moves.length)
    let x = valid_moves[rand_index][0];
    let y = valid_moves[rand_index][1];

    game.update_board = game.render_move(game.get_board, x, y, game.get_player_turn);
    game.switch_player_turn();

    let number_of_valid_moves = game.draw(game_ctx);
    draw_scoreboard(game);

    check_game_over(number_of_valid_moves, game);
};

