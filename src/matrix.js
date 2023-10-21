function check_bounds(x, y, size) {

    if (x > size || x < 0) {
        return false;
    }

    if (y > size || y < 0) {
        return false;
    }

    return true;
}

export function check_valid_move (board, x, y, turn) {

    //cell is not empty, not a valid move.
    if (board[x][y]) {
        return false;
    }

    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    for (let i = 0; i < directions.length; i++) {

        let new_cell_x = x + directions[i][0];
        let new_cell_y = y + directions[i][1];

        if (!check_bounds(new_cell_x, new_cell_y, board.length - 1)) {
            continue;
        }

        while (board[new_cell_x][new_cell_y] === -turn) {

            new_cell_x += directions[i][0];
            new_cell_y += directions[i][1];

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

    const  new_board = matrix;
    new_board[x][y] = turn;

    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    for (let i = 0; i < directions.length; i++) {

        let new_cell_x = x + directions[i][0];
        let new_cell_y = y + directions[i][1];

        if (!check_bounds(new_cell_x, new_cell_y, new_board.length - 1)) {
            continue;
        }

        while (new_board[new_cell_x][new_cell_y] === -turn) {

            new_cell_x += directions[i][0];
            new_cell_y += directions[i][1];

            if (!check_bounds(new_cell_x, new_cell_y, new_board.length - 1)) {
                break;
            }

            if (new_board[new_cell_x][new_cell_y] === turn) {

                do { //draw move loop

                    new_board[new_cell_x][new_cell_y] = turn;
                    new_cell_x -= directions[i][0];
                    new_cell_y -= directions[i][1];

                } while (new_board[new_cell_x][new_cell_y] !== turn);

                break;

            }
        }
    }

    return new_board;
}
