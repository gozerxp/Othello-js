import game_board from './game_board.js';

const _VERSION_ = "0.0.1";

const ctx = document.getElementById("canvas").getContext("2d");

const __touch_device__ = window.ontouchstart !== undefined;

//*******************************************************//

const board = new game_board(8);
board.draw(ctx)

