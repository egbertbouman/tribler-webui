import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChannelComponent } from './mychannel.component';

describe('MychannelComponent', () => {
    let component: MyChannelComponent;
    let fixture: ComponentFixture<MyChannelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyChannelComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyChannelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
