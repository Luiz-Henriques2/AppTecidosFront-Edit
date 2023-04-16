import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-fornecedor',
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrls: ['./cadastro-fornecedor.component.css']
})
export class CadastroFornecedorComponent {
  @Output() onSubmit = new EventEmitter<AppTecido>()
  btnText = 'Cadastrar';
  fornecedorForm!: FormGroup;

  ngOnInit(): void{
    this.fornecedorForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
    });
  }

  get title() {
    return this.fornecedorForm.get('title')!;
  }

  submit() {
    if (this.fornecedorForm.invalid){
      return;
    }
    
    console.log(this.fornecedorForm.value);

    this.onSubmit.emit(this.fornecedorForm.value);
  }

  createHandler(event: any){
    console.log('deu boa');
  }

}import { AppTecido } from 'src/app/AppTecidos';

