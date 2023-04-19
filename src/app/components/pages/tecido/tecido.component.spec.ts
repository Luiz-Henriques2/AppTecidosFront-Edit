import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecidoComponent } from './tecido.component';

describe('TecidoComponent', () => {
  let component: TecidoComponent;
  let fixture: ComponentFixture<TecidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
