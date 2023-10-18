import game_board from './game_board.js';

const _VERSION_ = "0.0.1";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//check for touchscreen
const __touch_device__ = window.ontouchstart !== undefined;

//*******************************************************//

const board = new game_board(8);
board.draw(ctx);

if (__touch_device__) {
	canvas.ontouchstart = (e) => {
		user_input(e.pageX, e.pageY);
	}
} else {
	canvas.onclick = (e) => {
		user_input(e.clientX, e.clientY);
    }
}

const user_input = (x, y) => {
    x = parseInt(x / board.x_size(ctx));
    y = parseInt(y / board.y_size(ctx));
    if (board.check_valid_move(x, y)) {
        board.commit_move(x, y);
        board.draw(ctx);
    }
}
