import { TestBed, inject } from '@angular/core/testing';
import { TriblerService } from './tribler.service';

describe('TriblerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TriblerService]
        });
    });

    it('should ...', inject([TriblerService], (service: TriblerService) => {
        expect(service).toBeTruthy();
    }));
});
