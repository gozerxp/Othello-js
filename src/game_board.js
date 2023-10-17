export default class game_board {

    constructor(board_size) {

        this.score = {
            p1: 0,
            p2: 0
        };

        this.size = board_size;
        this.board = this.reset();
    }

    draw(ctx) {
       this.draw_grid(ctx); 
       this.draw_players(ctx);
    }

    x_size(ctx) {
        return parseInt(ctx.canvas.width / this.size);
    }

    y_size(ctx) {
        return parseInt(ctx.canvas.height / this.size);
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

    draw_players(ctx) {

        let x_size = this.x_size(ctx);
        let y_size = this.y_size(ctx);
        let radius = x_size / 4;

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.board[x][y] !== 0) {

                    let circle_x = (x * x_size) + (x_size / 2);
                    let circle_y = (y * y_size) + (y_size / 2);

                    ctx.beginPath();
                    ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.fillStyle = this.get_player_color(this.board[x][y]);
                    ctx.fill();

                }
            }
        }
    }

    get_player_color(player) {
        switch(player)  {
            case 1:
                return "white";
            case -1:
                return "black";
            default:
                return "red"; //wat
        }
    }

    draw_flip(ctx) {

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

        return rows;
    }

    print() {
        let txt = '';
        for (let x = 0; x < this.size; x++) {
            txt = String(x + 1) + ' ';
            for (let y = 0; y < this.size; y++) {
                txt += String(this.board[x][y]) + ' ';
            }
            console.log(txt);
        }
    }

    check_valid_move(x, y) {
        return false;
    }

    commit_move(x, y) {

    }

}