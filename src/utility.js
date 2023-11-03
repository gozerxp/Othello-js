import { alert } from './alert.js';
import { game_ctx } from './main.js';


export const score_ctx = document.getElementById("score_canvas").getContext("2d");

const aspect_ratio = (4/3);

export const resize_display = (game, game_ctx, top_margin) => {
    game_ctx.canvas.height = Math.max(window.innerHeight - top_margin, 500);
    game_ctx.canvas.width = Math.min(window.innerHeight * aspect_ratio, window.innerWidth);
    score_ctx.canvas.width = game_ctx.canvas.width;
    game.draw(game_ctx);
    draw_scoreboard(game);
    if (alert.active) alert.draw(game_ctx, alert.text);
};

export const draw_scoreboard = (game) => {

    let font_size = 20;
    const radius = 13;
    const margin = radius * 2;

    score_ctx.fillStyle = "white";
    score_ctx.clearRect(0, 0, score_ctx.canvas.width, score_ctx.canvas.height);

    let y = score_ctx.canvas.height / 2;
    let x = score_ctx.canvas.width / 2 + margin;

    let title = "Othello.js";
    font_size = reduce_font(score_ctx, title, font_size, score_ctx.canvas.width / 2 - margin);
    let txt_y = y + font_size / 2;
    let txt_x = score_ctx.canvas.width / 4 - (score_ctx.measureText(title).width / 2);

    score_ctx.fillText(title, txt_x, txt_y);

    txt_x = x + margin;
    score_ctx.fillText(`${game.p1_score}`, txt_x, txt_y);
    draw_circle(score_ctx, x, y, radius, game.get_player_color(1));

    score_ctx.fillStyle = "white";
    x = txt_x + score_ctx.measureText("000").width + radius;
    txt_x = x + margin;
    score_ctx.fillText(`${game.p2_score}`, txt_x, txt_y);
    draw_circle(score_ctx, x, y, radius, game.get_player_color(-1));
  
};

export const reduce_font = (ctx, text, font_size, max_size) => {

    ctx.font = `${font_size}px 'Press Start 2P'`;
    while(ctx.measureText(text).width > max_size) {
        font_size--;
        ctx.font = `${font_size}px 'Press Start 2P'`;
    }
    return font_size;
};

export const draw_circle = (ctx, circle_x, circle_y, radius, color) => {

    ctx.beginPath();
    ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();

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

    if (game.get_valid_move_list.length) 
        return false;

        //see if valid moves exists for other player.
    if (game.get_valid_moves(game.get_board, -game.get_player_turn).length) {

        game.switch_player_turn();
        game.draw(game_ctx);
        draw_scoreboard(game);

        alert.draw(game_ctx, ["No valid moves!", `Player ${game.get_player(-game.get_player_turn)} turn skipped.`], 18);

        return false;

    } else {

        alert.draw(game_ctx, ["GAME OVER!", declare_winner(game.p1_score, game.p2_score)], 32);
        return true;
    }
};


