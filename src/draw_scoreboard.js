const score_canvas = document.getElementById("score_canvas");
const score_ctx = score_canvas.getContext("2d");

export const draw_scoreboard = (game) => {

    let font_size = 28;
    let margin = 25;

    score_ctx.font = `${font_size}px 'Press Start 2P'`;
    score_ctx.fillStyle = "white";
    score_ctx.clearRect(0, 0, score_ctx.canvas.width, score_ctx.canvas.height);

    let radius = 20;
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
