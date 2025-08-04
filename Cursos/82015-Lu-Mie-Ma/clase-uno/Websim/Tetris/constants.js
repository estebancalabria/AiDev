export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

export const COLORS = [
    'none',
    '#FF0D72', // Z - Pink
    '#0DC2FF', // I - Cyan
    '#A020F0', // T - Purple
    '#F538FF', // L - Magenta
    '#FF8E0D', // J - Orange
    '#FFE138', // O - Yellow
    '#0DFF72'  // S - Green
];

// Re-defining shapes in square matrices for correct rotation.
export const SHAPES = [
    [], // 0 is empty
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]], // Z
    [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]], // I
    [[0, 3, 0], [3, 3, 3], [0, 0, 0]], // T
    [[0, 4, 0], [0, 4, 0], [0, 4, 4]], // L
    [[0, 5, 0], [0, 5, 0], [5, 5, 0]], // J
    [[6, 6], [6, 6]], // O
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]  // S
];

export const KEY = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    UP: 'ArrowUp',
    SPACE: ' '
};
KEY.SPACE = 'Space'; // Correct key code for Spacebar

export const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800
};

export const LEVEL = [
    800, 720, 630, 550, 470, 380, 300, 220, 130, 100,
    80, 80, 80, 70, 70, 70, 60, 60, 60, 50
];