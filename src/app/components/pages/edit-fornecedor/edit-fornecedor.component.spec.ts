import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFornecedorComponent } from './edit-fornecedor.component';

describe('EditFornecedorComponent', () => {
  let component: EditFornecedorComponent;
  let fixture: ComponentFixture<EditFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFornecedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
