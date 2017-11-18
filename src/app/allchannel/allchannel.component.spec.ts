import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChannelComponent } from './allchannel.component';

describe('AllChannelComponent', () => {
    let component: AllChannelComponent;
    let fixture: ComponentFixture<AllChannelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AllChannelComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AllChannelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
