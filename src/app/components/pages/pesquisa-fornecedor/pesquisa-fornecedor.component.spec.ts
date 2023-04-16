import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaFornecedorComponent } from './pesquisa-fornecedor.component';

describe('PesquisaFornecedorComponent', () => {
  let component: PesquisaFornecedorComponent;
  let fixture: ComponentFixture<PesquisaFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisaFornecedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisaFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
