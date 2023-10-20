import { game_ctx } from './main.js';

const score_ctx = document.getElementById("score_canvas").getContext("2d");

export const draw_scoreboard = (game) => {

    const font_size = 28;
    const margin = 25;
    const radius = 20;

    score_ctx.font = `${font_size}px 'Press Start 2P'`;
    score_ctx.fillStyle = "white";
    score_ctx.clearRect(0, 0, score_ctx.canvas.width, score_ctx.canvas.height);

    let y = score_ctx.canvas.height / 2;
    let x = score_ctx.canvas.width / 2 + (margin * 2);

    let txt_y = y + font_size / 2;

    score_ctx.fillText("Othello JS", margin, txt_y);

    let txt_x = x + radius * 2.25;
    score_ctx.fillText(`${game.p1_score}`, txt_x, txt_y);
    game.draw_circle(score_ctx, x, y, radius, game.get_player_color(1));

    score_ctx.fillStyle = "white";
    x = score_ctx.canvas.width - score_ctx.canvas.width / 4 + margin;
    txt_x = x + radius * 2.25;
    score_ctx.fillText(`${game.p2_score}`, x + radius * 2.5, txt_y);
    game.draw_circle(score_ctx, x, y, radius, game.get_player_color(-1));
  
};

export const alert = {
    active: false,
    alert: function(message) {

        const font_size = 22;

        this.active = true;

        const size = [game_ctx.canvas.width / 1.5, 250];
        const position = [game_ctx.canvas.width / 2 - (size[0] / 2), 
                            game_ctx.canvas.height / 2 - (size[1] / 2)];

        game_ctx.globalAlpha = 0.9;
        game_ctx.fillStyle = "rgb(50, 50, 50)";
        game_ctx.beginPath();
        game_ctx.roundRect(...position, ...size, 25);
        game_ctx.fill();
        game_ctx.globalAlpha = 1.0;

        game_ctx.font = `${font_size}px 'Press Start 2P'`;
        game_ctx.fillStyle = "white";

        position[0] += (size[0] / 2) - (game_ctx.measureText(message).width / 2);
        position[1] += (size[1] / 2);

        game_ctx.fillText(message, ...position);

    }
};

export const declare_winner = (p1, p2) => {
    if(p1 === p2) {
        return 'Tied game!';
    } else if (p1 > p2) {
        return 'Player 1 Wins!';
    } else if (p2 > p1) {
        return 'Player 2 Wins!';
    }
};

export const check_game_over = (game) => {

    if (!game.get_valid_move_list.length) {
        //see if valid moves exists for other player.
        if (game.get_valid_moves(game.get_board, -game.get_player_turn).length) {

            game.switch_player_turn();

            game.draw(game_ctx);
            draw_scoreboard(game);

            alert.alert(`TURN SKIPPED`);

            return ai_move(game);

        } else {

            console.log("***** GAME OVER! *****");
            alert.alert(declare_winner(game.p1_score, game.p2_score));
            return true;
        }
    }

    return false;
};

export const ai_move = (game) => {

    if (game.get_player_type(game.get_player_turn) !== 0) {
        return false;
    }

    let valid_moves = game.get_valid_move_list;

    if (!valid_moves.length) {
        return false;
    }

    let rand_index = Math.floor(Math.random() * valid_moves.length)
    let x = valid_moves[rand_index][0];
    let y = valid_moves[rand_index][1];
    let delay = 250;

    game.update_board = game.render_move(game.get_board, x, y, game.get_player_turn);

    setTimeout(() => {
        
        game.switch_player_turn();
        game.draw(game_ctx);
        draw_scoreboard(game);
        return check_game_over(game);
    
    }, delay);

    

};
