import game_board from './game_board.js';

const _VERSION_ = "0.0.1";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvas_margin = {
    top: 50,
    left: 50
};

//check for touchscreen
const __touch_device__ = window.ontouchstart !== undefined;

//*******************************************************//

const board = new game_board(8);
board.draw(ctx);

if (__touch_device__) {
	canvas.ontouchstart = (e) => {
		input(e.pageX, e.pageY);
	}
} else {
	canvas.onclick = (e) => {
		input(e.clientX, e.clientY);
    }
}

const input = (x, y) => {
    x = parseInt((x - canvas_margin.left) / board.x_size(ctx));
    y = parseInt((y - canvas_margin.top) / board.y_size(ctx));

    if (board.check_valid_move(x, y)) {
        board.commit_move(x, y);
        let number_of_valid_moves = board.draw(ctx);

        if (!number_of_valid_moves) {
            console.log("GAME OVER!");
            console.log("No more valid moves!");
        } else {
            console.log("Available moves: " + number_of_valid_moves)
        }
        
        console.log(`Player 1: ${board.p1_score} | Player 2: ${board.p2_score}`);


    }
}

