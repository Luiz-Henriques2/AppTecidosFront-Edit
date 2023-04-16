import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTecidoComponent } from './cadastro-tecido.component';

describe('CadastroTecidoComponent', () => {
  let component: CadastroTecidoComponent;
  let fixture: ComponentFixture<CadastroTecidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroTecidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroTecidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
