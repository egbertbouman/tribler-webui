import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[randomBackgroundColor]'
})
export class RandomBackgroundColorDirective {

    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = this.getRandomColor();
    }

    getRandomColor() {
        const red = Math.floor(Math.random() * (256)) % 128 + 100;
        const green = Math.floor(Math.random() * (256)) % 128 + 100;
        const blue = Math.floor(Math.random() * (256)) % 128 + 100;
        return this.RGB2Hex([red, green, blue]);
    }

    RGB2Hex(rgb) {
        return (rgb && rgb.length === 3) ? '#' +
            ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) +
            ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) : '';
    }
}
