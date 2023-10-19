import game from './othello.js';

const _VERSION_ = "0.0.1";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvas_margin = {
    top: 0,
    left: 0
};

//check for touchscreen
const __touch_device__ = window.ontouchstart !== undefined;

//*******************************************************//

const board = new game(8);
board.draw(ctx);
console.log(board.get_valid_move_list);

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

    if (board.check_valid_move(board.get_board, x, y, board.player_turn)) {
        board.update_board = board.render_move(board.get_board, x, y, board.player_turn);
        board.switch_player_turn();

        let number_of_valid_moves = board.draw(ctx);
        let valid_move_list = []

        if (!number_of_valid_moves) {
            //see if valid moves exists for other player.
            if (board.get_valid_moves(board.get_board, -board.player_turn).length) {
                board.switch_player_turn();
                number_of_valid_moves = board.draw(ctx);
                console.log("** NO VALID MOVES - PLAYER SWITCH - Available moves: " + number_of_valid_moves);
                valid_move_list = board.get_valid_move_list;
                console.log(valid_move_list);
            } else {
                console.log("***** GAME OVER! *****");
                console.log("No more valid moves!");
            }
        } else {
            console.log("Available moves: " + number_of_valid_moves)
            valid_move_list = board.get_valid_move_list;
            console.log(valid_move_list);
        }
        
        console.log(`Player 1: ${board.p1_score} | Player 2: ${board.p2_score}`);


    }
}

