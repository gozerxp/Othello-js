export default class game {
    constructor(board_size, draw_valid_moves = true) {

        this.score = {
            p1: 0,
            p2: 0
        };

        this.turn = 1;
        this.draw_valid_moves = draw_valid_moves;
        this.size = board_size;

        this.board = this.reset();
    }

    get get_board() {
        return this.board;
    }

    get p1_score() {
        return this.score.p1;
    }

    get p2_score() {
        return this.score.p2;
    }

    draw(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw_grid(ctx); 
        
        return this.draw_game(ctx);
    }

    x_size(ctx) {
        return (ctx.canvas.width / this.size);
    }

    y_size(ctx) {
        return (ctx.canvas.height / this.size);
    }

    draw_grid(ctx) {
        let x_size = this.x_size(ctx);
        let y_size = this.y_size(ctx);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        ctx.beginPath();

        for(let x = 0; x <= ctx.canvas.width; x += x_size) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ctx.canvas.height);
        }

        for (let y = 0; y <= ctx.canvas.height; y += y_size) {
            ctx.moveTo(0, y);
            ctx.lineTo(ctx.canvas.width, y);
        }
        
        ctx.stroke();
    }

    draw_game(ctx) {
        let x_size = this.x_size(ctx);
        let y_size = this.y_size(ctx);
        let player_radius = x_size / 4;
        let valid_move_radius = x_size / 15;
        let number_of_valid_moves = 0;

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {

                let circle_x = (x * x_size) + (x_size / 2);
                let circle_y = (y * y_size) + (y_size / 2);
                let color = this.get_player_color(this.board[x][y]);

                if (this.board[x][y] !== 0) {
                    // player chips
                    this.draw_circle(ctx, circle_x, circle_y, player_radius, color);

                } else if (this.check_valid_move(x, y)) {
                    
                    number_of_valid_moves++;

                    if (this.draw_valid_moves) {
                        this.draw_circle(ctx, circle_x, circle_y, valid_move_radius, color);
                    }

                }
            }
        }

        return number_of_valid_moves;
    }

    draw_circle(ctx, circle_x, circle_y, radius, color) {

        ctx.beginPath();
        ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();

    }

    get_player_color(player) {
        switch(player)  {
            case 1:
                return "white";
            case -1:
                return "black";
            default:
                return "lime"; //valid move marker
        }
    }

    check_score() {
        let p1, p2;
        p1 = p2 = 0;

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                switch(this.board[x][y]) {
                    case 1:
                        p1++;
                        break;
                    case -1:
                        p2++;
                        break;
                    default:
                }
            }
        }

        this.score.p1 = p1;
        this.score.p2 = p2;
    }
 
    reset() {
        let rows = [];
        for (let x = 0; x < this.size; x++) {
            let columns = [];
            for (let y = 0; y < this.size; y++) {
                columns.push(0);
            }
            rows.push(columns);
        }

        //set initial positions
        let half_size = parseInt(this.size / 2);
        rows[half_size][half_size] = 1;
        rows[half_size - 1][half_size - 1] = 1;
        rows[half_size][half_size - 1] = -1;
        rows[half_size - 1][half_size] = -1;

        this.score.p1 = 2;
        this.score.p2 = 2;

        this.turn = 1;

        return rows;
    }

    check_valid_move(x, y) {

        //cell is not empty, not a valid move.
        if (this.board[x][y]) {
            return false;
        }

        const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

        for (let i = 0; i < directions.length; i++) {
            
            let new_cell_x = x + directions[i][0];
            let new_cell_y = y + directions[i][1];

            if (!this.check_bounds(new_cell_x, new_cell_y, this.size - 1)) {
                continue;
            }

            while (this.board[new_cell_x][new_cell_y] === -this.turn) {

                new_cell_x += directions[i][0];
                new_cell_y += directions[i][1];

                if (!this.check_bounds(new_cell_x, new_cell_y, this.size - 1)) {
                    break;
                }

                if (this.board[new_cell_x][new_cell_y] === this.turn) {
                    return true;
                }
            }
        }
    
        return false;
    }

    check_bounds(x, y, size) {

        if (x > size || x < 0) {
            return false;
        }

        if (y > size || y < 0) {
            return false;
        } 

        return true;
    }

    commit_move(x, y) {

        this.board[x][y] = this.turn;
        
        const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

        for (let i = 0; i < directions.length; i++) {
            
            let new_cell_x = x + directions[i][0];
            let new_cell_y = y + directions[i][1];

            if (new_cell_x > (this.size - 1) || new_cell_x < 0) {
                continue;
            }

            if (new_cell_y > (this.size - 1) || new_cell_y < 0) {
                continue;
            } 

            while (this.board[new_cell_x][new_cell_y] === -this.turn) {

                new_cell_x += directions[i][0];
                new_cell_y += directions[i][1];

                if (new_cell_x > (this.size - 1) || new_cell_x < 0) {
                    break;
                }
    
                if (new_cell_y > (this.size - 1) || new_cell_y < 0) {
                    break;
                } 

                if (this.board[new_cell_x][new_cell_y] === this.turn) {
                    
                    do { //draw move loop

                        this.board[new_cell_x][new_cell_y] = this.turn;
                        new_cell_x -= directions[i][0];
                        new_cell_y -= directions[i][1];

                    } while (this.board[new_cell_x][new_cell_y] !== this.turn)

                    break;

                }
            }
        }
        
        //switch player turn
        this.turn = -this.turn;
        this.check_score();


    }

}