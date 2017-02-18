import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'abbreviate'})
export class AbbreviatePipe implements PipeTransform {

    transform(name: string = '') : string {
        // Filter out non-alpha chars
        var filtered = name.replace(/[^a-z\s]/gi, '')
        var split = filtered.split(" ").filter(function(el) {return el.length != 0});
        if (split.length == 0)
            return '';
        else
            return ((split.length > 1) ? split[0][0] + split[1][0] : split[0][0]).toUpperCase();
    }
}