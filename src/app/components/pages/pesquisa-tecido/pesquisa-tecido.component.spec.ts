import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaTecidoComponent } from './pesquisa-tecido.component';

describe('PesquisaTecidoComponent', () => {
  let component: PesquisaTecidoComponent;
  let fixture: ComponentFixture<PesquisaTecidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisaTecidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisaTecidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
