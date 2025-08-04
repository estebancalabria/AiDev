export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowUp') && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
            // Use ' ' for spacebar key
            if(e.key === ' ' || e.key === 'ArrowUp') e.preventDefault();
        });
        window.addEventListener('keyup', e => {
            const key = (e.key === ' ') ? ' ' : e.key;
            if (this.keys.includes(key)) {
                this.keys.splice(this.keys.indexOf(key), 1);
            }
        });
    }
}

