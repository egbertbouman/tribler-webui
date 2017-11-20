import { Component, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { JitCompiler } from '@angular/compiler/src/jit/compiler';

@Component({
    selector: 'pieces',
    template: `<canvas #canvas style="height:30px; width:97%; background:white;"></canvas>`,
})
export class PiecesComponent {
    // tslint:disable-next-line:variable-name
    _pieces: number[] = [];
    @ViewChild('canvas') canvas: ElementRef;

    constructor() {
    }

    @HostListener('window:resize', ['$event.target'])
    onResize(event) {
        this.drawPieces();
    }

    @Input() set pieces(piecesB64: string) {
        if (piecesB64 === undefined) { this._pieces = []; return; }

        // Remove trailing '='
        piecesB64 = piecesB64.replace(/\=+$/, '');

        const pieces = [];
        const pieceString = atob(piecesB64);
        for (let i = 0; i < pieceString.length; ++i) {
            const pieceNumber = pieceString[i].charCodeAt(0);
            for (let j = 8 - 1; j >= 0; --j) {
                // tslint:disable-next-line:no-bitwise
                pieces.push(pieceNumber & 1 << j ? 1 : 0);
            }
        }
        this._pieces = pieces;
        this.drawPieces();
    }

    drawPieces() {
        if (!this._pieces || this._pieces.length === 0) { return; }

        const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
        const width = this.canvas.nativeElement.width;
        const height = this.canvas.nativeElement.height;
        const numPieces = this._pieces.length;

        if (numPieces <= width) {
            const pieceWidth = width / numPieces;
            this._pieces.forEach(function (piece, index) {
                if (piece) {
                    context.fillStyle = 'hsl(26, 100%, 50%)';
                    context.fillRect(index * pieceWidth, 0, Math.ceil(pieceWidth), height);
                }
            });
        } else {
            const piecesPerPixel = numPieces / width;
            const piecesPerPixelFloor = Math.floor(piecesPerPixel);
            for (let index = 0; index < width; index++) {
                const beginPiece = Math.floor(piecesPerPixel * index);
                const endPiece = Math.floor(beginPiece + piecesPerPixel);
                let pieceSum = 0;
                for (let j = beginPiece; j < endPiece; j++) {
                    pieceSum += this._pieces[j];
                }
                context.fillStyle = 'hsl(26, 100%, ' + (100 - (50 * ((pieceSum / piecesPerPixelFloor)))) + '%)';
                context.fillRect(index, 0, 10, height);
            }
        }
    }
}
