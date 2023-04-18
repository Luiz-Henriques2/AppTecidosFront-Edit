import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Fornecedor } from 'src/app/AppTecidos';


@Component({
  selector: 'app-cadastro-fornecedor',
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrls: ['./cadastro-fornecedor.component.css']
})
export class CadastroFornecedorComponent {
  @Output() onSubmit = new EventEmitter<Fornecedor>()

  btnText = 'Cadastrar';
  fornecedorForm!: FormGroup;

  ngOnInit(): void{
    this.fornecedorForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      telefone: new FormControl(''),
      whatsapp: new FormControl(''),
      endereco: new FormControl(''),
      site: new FormControl(''),
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

}

