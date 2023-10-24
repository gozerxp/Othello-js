import { check_valid_move } from "./matrix.js";
import { draw_circle, flip_fade } from "./utility.js";

export class game_board {
    constructor(board_size=8, p1_type=1, p2_type=0, draw_valid_moves=true) {

        this.score = {
            p1: 0,
            p2: 0
        };

        this.player_type = {
            /*
                0 = cpu player
                1 = human player
                2 = network player
            */
            p1: p1_type,
            p2: p2_type
        };

        this.turn = 1;

        this.game_over = false;

        this.draw_valid_moves = draw_valid_moves;

        //this list is generated at rendering.
        //you can request a custom list by using get_valid_moves method.
        this.valid_move_list = [];



        this.size = Math.min(Math.max(board_size, 4), 25);

        this.board = this.reset();
    }

    get get_board() {
        return this.board;
    }

    set update_board(board) {
        this.board = board;
    }

    get get_valid_move_list() {
        return this.valid_move_list;
    }

    get p1_score() {
        return this.score.p1;
    }

    get p2_score() {
        return this.score.p2;
    }

    get get_player_turn() {
        return this.turn;
    }

    set_player_type(player, type) {
         /*
            0 = cpu player
            1 = human player
            2 = network player
        */
        if (type < 0 || type > 2) {
            return;
        }

        switch(player) {
            case 1:
                this.player_type.p1 = type;
                break;
            case -1:
                this.player_type.p2 = type;
                break;
            default:
        }
    }

    get_player_type(player) {
        switch(player) {
            case 1:
                return this.player_type.p1;
            case -1:
                return this.player_type.p2;
            default:
                return -1;
        }
    }

    get_player(player) {
        switch(player) {
            case 1:
                return 1;
            case -1:
                return 2;
            default:
                return -1;
        }
    }

    get_score(player) {
        switch(player) {
            case 1:
                return this.p1_score;
            case -1:
                return this.p2_score;
            default:
                return -1;
        }
    }

    switch_player_turn() {
        this.turn = -this.turn;
    }

    draw(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.draw_grid(ctx); 
        this.render_game(ctx);
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

    render_game(ctx) {
        let x_size = this.x_size(ctx);
        let y_size = this.y_size(ctx);
        let player_radius = Math.min(x_size / 4, y_size / 3);
        let valid_move_radius = x_size / 15;
        let p1 = 0, p2 = 0;

        //compile updated valid move list on the fly
        //this list should be useful for more efficient AI algorithms
        this.valid_move_list = [];

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {

                let circle_x = (x * x_size) + (x_size / 2);
                let circle_y = (y * y_size) + (y_size / 2);
                let color = this.get_player_color(this.board[x][y]);

                if (this.board[x][y] !== 0) {

                    //might as well keep score while we're in the loop
                    switch(this.board[x][y]) {
                        case 1:
                            p1++;
                            break;
                        case -1:
                            p2++;
                            break;
                        default:
                    }

                    // player chips
                    draw_circle(ctx, circle_x, circle_y, player_radius, color);

                } else if (check_valid_move(this.get_board, x, y, this.get_player_turn)) {
                    
                    //keep count of valid moves and generate list
                    this.valid_move_list.push([x , y]);

                    //draw valid move markers if player = human
                    if (this.draw_valid_moves && this.get_player_type(this.get_player_turn) === 1) {
                        draw_circle(ctx, circle_x, circle_y, valid_move_radius, color);
                    }
                }
            }
        }

        this.update_score(p1, p2);

    }

    get_player_color(player) {
        switch(player)  {
            case 1:
                return "rgb(30, 144, 255)";
            case -1:
                return "rgb(0, 0, 0)";
            default:
                return "rgb(255, 255, 0)"; //valid move marker
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

        this.update_score(p1, p2);
    }

    update_score(p1, p2) {
        this.score.p1 = p1;
        this.score.p2 = p2;
    }

    get_valid_moves(board, turn) {

        let valid_move_list = [];

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (check_valid_move(board, x, y, turn)) {
                    valid_move_list.push([x , y]);
                }
            }
        }
        return valid_move_list;
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

        this.game_over = false;

        return rows;
    }
}