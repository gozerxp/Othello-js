import { game_ctx } from './main.js';
import { game_board } from './othello.js';
import { render_move } from "./matrix.js";
import { alert, draw_scoreboard, check_game_over } from './utility.js';

export const ai_loop = (game, delay=250) => {
    // 0 === cpu. only loop while turn belongs to the cpu. 
    // multiple turns could occur if there were no valid moves for the player.

    //delay = 1;

    let interval = setInterval(() => {

        game.game_over = ai_move(game);

        if (game.get_player_type(game.get_player_turn) !== 0 || alert.active || game.game_over) {
            clearInterval(interval);
        }
    }, delay);

};

const ai_move = (game) => {

    if (game.get_player_type(game.get_player_turn) !== 0) {

        return false;
    }

    let valid_moves = game.get_valid_move_list;

    if (!valid_moves.length) {

        game.switch_player_turn();
        game.draw(game_ctx);
        draw_scoreboard(game);
        return check_game_over(game);

    }

    //index = Math.floor(Math.random() * valid_moves.length)
    let index = ai_evaluate(game.get_board, game.get_player_turn, valid_moves);
    let x = valid_moves[index][0];
    let y = valid_moves[index][1];

    game.update_board = render_move(game.get_board, x, y, game.get_player_turn);
    game.switch_player_turn();
    game.draw(game_ctx);
    draw_scoreboard(game);

    return check_game_over(game);

};

const ai_evaluate = (board, turn, valid_moves) => {

    const best_move = {
        index: 0,
        score: 0
    };

    const temp_board = new game_board(board.length);
    temp_board.turn = turn;

    let best_moves = [];

    for (let i = 0; i < valid_moves.length; i++) {

        let x = valid_moves[i][0];
        let y = valid_moves[i][1];

        temp_board.update_board = board;

        temp_board.check_score();
        let pre_score = temp_board.get_score(turn);

        temp_board.update_board = render_move(board, x, y, turn);

        temp_board.check_score();
        let post_score = temp_board.get_score(turn);

        let score = post_score - pre_score;

        if (score > best_move.score) {
            best_move.index = i;
            best_move.score = score;

            //create list of best moves
            best_moves = [];
            best_moves.push([x, y]);
        } else if (score === best_move.score) {
            
            best_moves.push([x, y]);
        }

    }

    //if multiple "best moves" are found, pick a random one...for now
    let rand_index = Math.floor(Math.random() * best_moves.length)

    return rand_index;
};
