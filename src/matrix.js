//keep list of all matrix steps that are possible.
const DIRECTIONS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export function check_valid_move (board, x, y, turn) {

    //cell is not empty, not a valid move.
    if (board[x][y]) {
        return false;
    }

    for (let i = 0; i < DIRECTIONS.length; i++) {

        let new_cell_x = x + DIRECTIONS[i][0];
        let new_cell_y = y + DIRECTIONS[i][1];

        if (!check_bounds(new_cell_x, new_cell_y, board.length - 1)) {
            continue;
        }

        while (board[new_cell_x][new_cell_y] === -turn) {

            new_cell_x += DIRECTIONS[i][0];
            new_cell_y += DIRECTIONS[i][1];

            if (!check_bounds(new_cell_x, new_cell_y, board.length - 1)) {
                break;
            }

            if (board[new_cell_x][new_cell_y] === turn) {
                return true;
            }
        }
    }

    return false;
}

export function render_move (matrix, x, y, turn) {

    //create deep copy so changes don't affect existing board object.
    const new_board =  JSON.parse(JSON.stringify(matrix));
    new_board[x][y] = turn;

    for (let i = 0; i < DIRECTIONS.length; i++) {

        let new_cell_x = x + DIRECTIONS[i][0];
        let new_cell_y = y + DIRECTIONS[i][1];

        if (!check_bounds(new_cell_x, new_cell_y, new_board.length - 1)) {
            continue;
        }

        while (new_board[new_cell_x][new_cell_y] === -turn) {

            new_cell_x += DIRECTIONS[i][0];
            new_cell_y += DIRECTIONS[i][1];

            if (!check_bounds(new_cell_x, new_cell_y, new_board.length - 1)) {
                break;
            }

            if (new_board[new_cell_x][new_cell_y] === turn) {

                do { //draw move loop

                    new_board[new_cell_x][new_cell_y] = turn;
                    new_cell_x -= DIRECTIONS[i][0];
                    new_cell_y -= DIRECTIONS[i][1];

                } while (new_board[new_cell_x][new_cell_y] !== turn);

                break;

            }
        }
    }

    return new_board;
}

function check_bounds(x, y, size) {

    return !(x > size || x < 0 || y > size || y < 0);
}