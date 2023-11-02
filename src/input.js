import { check_valid_move, render_move } from "./matrix.js";
import { draw_scoreboard, check_game_over } from './utility.js';
import { alert } from './alert.js';
import { ai } from './ai.js';

export const input = (x, y, game, game_ctx, margin) => {

    if (game.game_over) {
        game.update_board = game.reset();
        game.draw(game_ctx);
        draw_scoreboard(game);
        alert.active = false;
        ai.loop(game);
        return;
    }

    if (alert.active) {
        game.draw(game_ctx);
        draw_scoreboard(game);
        alert.active = false;
        ai.loop(game);
        return;
    }

    x = parseInt((x - margin.left) / game.x_size(game_ctx));
    y = parseInt((y - margin.top) / game.y_size(game_ctx));

    if (check_valid_move(game.get_board, x, y, game.get_player_turn)) {
        let render = render_move(game.get_board, x, y, game.get_player_turn);
        game.update_board = render.new_board;

        game.switch_player_turn();
        game.draw(game_ctx);
        draw_scoreboard(game);
        game.game_over = check_game_over(game);

        if (!game.game_over) {
            ai.loop(game);
        }
    }
};
