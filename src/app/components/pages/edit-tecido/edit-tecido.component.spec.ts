import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTecidoComponent } from './edit-tecido.component';

describe('EditTecidoComponent', () => {
  let component: EditTecidoComponent;
  let fixture: ComponentFixture<EditTecidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTecidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTecidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
