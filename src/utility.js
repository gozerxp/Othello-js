import { game_ctx } from './main.js';

const score_ctx = document.getElementById("score_canvas").getContext("2d");
if (score_ctx.canvas.width > window.innerWidth) {
    score_ctx.canvas.width = window.innerWidth;
}

export const draw_scoreboard = (game) => {

    const font_size = 22;
    const margin = 30;
    const radius = 18;

    score_ctx.font = `${font_size}px 'Press Start 2P'`;
    score_ctx.fillStyle = "white";
    score_ctx.clearRect(0, 0, score_ctx.canvas.width, score_ctx.canvas.height);

    let y = score_ctx.canvas.height / 2;
    let x = score_ctx.canvas.width / 2 + (margin * 2);

    let txt_y = y + font_size / 2;

    score_ctx.fillText("Othello.JS", margin, txt_y);

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
    pop: function(message, font_size=18) {

        const margin = font_size * 1.75;

        this.active = true;

        game_ctx.font = `${font_size}px 'Press Start 2P'`;

        let max_width = 0;
        message.forEach((e) => {
            if (game_ctx.measureText(e).width > max_width) {
                max_width = game_ctx.measureText(e).width;
            }
        });
        
        let w = max_width + margin * 2.5;
        let h = font_size * message.length + margin * 4;

        const size = [w, h];
        const position = [game_ctx.canvas.width / 2 - (size[0] / 2), 
                            game_ctx.canvas.height / 2 - (size[1] / 2)];

        game_ctx.globalAlpha = 0.9;
        game_ctx.fillStyle = "rgb(50, 50, 50)";
        game_ctx.beginPath();
        game_ctx.roundRect(...position, ...size, 25);
        game_ctx.fill();
        game_ctx.globalAlpha = 1.0;

        game_ctx.fillStyle = "white";

        let start_y = game_ctx.canvas.height / 2 + font_size / 2 - (margin * (message.length - 1) / 2);

        for(let i = 0; i < message.length; i++ ) {
            position[0] = (game_ctx.canvas.width / 2) - (game_ctx.measureText(message[i]).width / 2);
            position[1] = start_y + (margin * i);
            game_ctx.fillText(message[i], ...position);
        }

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

    if (game.get_valid_move_list.length) {
        return false;
    }
        //see if valid moves exists for other player.
    if (game.get_valid_moves(game.get_board, -game.get_player_turn).length) {

        game.switch_player_turn();

        game.draw(game_ctx);
        draw_scoreboard(game);

        alert.pop(["No valid moves!", `Player ${game.get_player(-game.get_player_turn)} turn skipped.`]);

        return false;

    } else {

        alert.pop(["GAME OVER!", declare_winner(game.p1_score, game.p2_score)], 24);
        return true;
    
    }
}


