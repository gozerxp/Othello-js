import { alert } from './alert.js';
import { game_ctx } from './main.js';

export const title_ctx = document.getElementById("title_canvas").getContext("2d");
export const score_ctx = document.getElementById("score_canvas").getContext("2d");

const aspect_ratio = (1/1);

export const resize_display = (game, game_ctx, top_margin) => {
    game_ctx.canvas.height = Math.max(window.innerHeight - top_margin, 500 - top_margin * 2) - score_ctx.canvas.height;
    game_ctx.canvas.width = Math.min((game_ctx.canvas.height + top_margin * 2) * aspect_ratio, window.innerWidth);
    score_ctx.canvas.width = title_ctx.canvas.width = game_ctx.canvas.width;
    game.draw(game_ctx);
    draw_titlebar(title_ctx);
    draw_scoreboard(game);
    if (alert.active) alert.draw(game_ctx, alert.text);
};

export const draw_titlebar = (ctx) => {

    let title = "Othello.js";
    let font_size = 32;

    font_size = reduce_font(ctx, title, font_size, ctx.canvas.width / 2);

    let y = (ctx.canvas.height / 2) + font_size / 2;
    let x = ctx.canvas.width / 2 - (ctx.measureText(title).width / 2);

    ctx.fillStyle = "white";
    ctx.fillText(title, x, y);

};

export const draw_scoreboard = (game) => {

    let font_size = 20;
    const ctx = score_ctx;
    const radius = 14;
    const margin = radius * 2;
    
    ctx.font = `${font_size}px 'Press Start 2P'`;

    let total_width = margin + ctx.measureText(`${game.p1_score}`).width;
    let text_buffer = ctx.measureText("0000").width;
    total_width += text_buffer;
    total_width += margin + ctx.measureText(`${game.p2_score}`).width;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let x = ctx.canvas.width / 2 - total_width / 2 + radius;
    let y = ctx.canvas.height / 2;

    draw_circle(ctx, x, y, radius, game.get_player_color(1));

    ctx.fillStyle = "white";

    let text_x = x + margin;
    let text_y = y + font_size / 2;

    ctx.fillText(`${game.p1_score}`, text_x, text_y);

    x = text_x + ctx.measureText(`${game.p1_score}`).width + text_buffer;
    
    draw_circle(ctx, x, y, radius, game.get_player_color(-1));

    text_x = x + margin;

    ctx.fillStyle = "white";
    ctx.fillText(`${game.p2_score}`, text_x, text_y);

  
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

        alert.draw(game_ctx, ["GAME OVER!", declare_winner(game.p1_score, game.p2_score)], 24);
        return true;
    }
};


