export default class Grid {
    constructor(p5Canvas, shape = 'rect', rows = 8, columns = 8) {
        this.canvas = p5Canvas;
        this.shape = shape;
        this.rows = rows;
        this.columns = columns;
        this.canvas.rectMode(this.canvas.CENTER);
    }

    setShape(shape) {
        this.shape = shape;
    }

    setStrokeWeight(weight) {
        this.weight = weight;
    }

    draw() {
        this.canvas.strokeWeight(this.weight);
        this.canvas.rect(
            this.canvas.width / 2, 
            this.canvas.height / 2, 
            this.canvas.width, 
            this.canvas.height
        );
        const cellWidth = this.canvas.width / this.columns,
            cellHeight = this.canvas.height / this.rows;    
        for (let i = cellWidth / 2; i < this.canvas.width; i = i + cellWidth) {
            for (let j = cellHeight / 2; j < this.canvas.height; j = j + cellHeight) {
                this.drawShape(i, j, cellWidth, cellHeight);
            }
        }
    }

    reDraw() {
        this.canvas.clear();
        this.draw();
    }

    drawShape(i, j, cellWidth, cellHeight) {
        switch (this.shape) {
            case 'triangle':
                this.canvas.triangle(
                    i - cellWidth / 2,
                    j + cellHeight / 2,
                    i + cellWidth / 2,
                    j + cellHeight / 2,
                    i,
                    j - cellHeight / 2 + this.weight / 2,
                );
                break;
            case 'diamond':
                this.canvas.push()
                this.canvas.beginShape();
                this.canvas.vertex(i, j - cellHeight / 2);
                this.canvas.vertex(i + cellWidth / 2, j);
                this.canvas.vertex(i, j + cellHeight / 2);
                this.canvas.vertex(i - cellWidth / 2, j);
                this.canvas.endShape(this.canvas.CLOSE);
                this.canvas.pop()
                break;
            case 'hex':
                this.canvas.push()
                this.canvas.beginShape();
                this.canvas.vertex(i - cellWidth / 4, j - cellHeight / 2);
                this.canvas.vertex(i + cellWidth / 4, j - cellHeight / 2);
                this.canvas.vertex(i + cellWidth / 2, j);
                this.canvas.vertex(i + cellWidth / 4, j + cellHeight / 2);
                this.canvas.vertex(i - cellWidth / 4, j + cellHeight / 2);
                this.canvas.vertex(i - cellWidth / 2, j);
                this.canvas.endShape(this.canvas.CLOSE);
                this.canvas.pop()
                break;
            case 'hex90':
                this.canvas.push()
                this.canvas.beginShape();
                this.canvas.vertex(i, j - cellHeight / 2);
                this.canvas.vertex(i + cellWidth / 2, j - cellHeight / 4);
                this.canvas.vertex(i + cellWidth / 2, j + cellHeight / 4);
                this.canvas.vertex(i, j + cellHeight / 2);
                this.canvas.vertex(i - cellWidth / 2, j + cellHeight / 4);
                this.canvas.vertex(i - cellWidth / 2, j - cellHeight / 4);
                this.canvas.endShape(this.canvas.CLOSE);
                this.canvas.pop()
                break;
             case 'oct':
                this.canvas.push()
                this.canvas.beginShape();
                this.canvas.vertex(i - cellWidth / 4, j - cellHeight / 2);
                this.canvas.vertex(i + cellWidth / 4, j - cellHeight / 2);
                this.canvas.vertex(i + cellWidth / 2, j - cellHeight / 4);
                this.canvas.vertex(i + cellWidth / 2, j + cellHeight / 4);
                this.canvas.vertex(i + cellWidth / 4, j + cellHeight / 2);
                this.canvas.vertex(i - cellWidth / 4, j + cellHeight / 2);
                this.canvas.vertex(i - cellWidth / 2,  j + cellHeight / 4);
                this.canvas.vertex(i - cellWidth / 2,  j - cellHeight / 4);
                this.canvas.endShape(this.canvas.CLOSE);
                this.canvas.pop()
                break;
            default:
                this.canvas.rect(i, j, cellWidth, cellHeight);
                break;
        }
    }
}
