import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Fornecedor } from 'src/app/AppTecidos';
import { FornecedorService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-cadastro-fornecedor',
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrls: ['./cadastro-fornecedor.component.css']
})
export class CadastroFornecedorComponent implements OnInit{
 
  constructor(private commentService: FornecedorService){}

  get nome() {
    return this.fornecedorForm.get('nome')!;
  }

  btnText = 'Cadastrar';
  fornecedorForm!: FormGroup;

  ngOnInit(): void{
    this.fornecedorForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      telefone: new FormControl(''),
      whatsapp: new FormControl(''),
      endereco: new FormControl(''),
      site: new FormControl(''),
    });
  }


async createHandler(fornecedor: Fornecedor){
  const formData = new FormData();

  formData.append("nome", fornecedor.nome);
  if (fornecedor.email){formData.append("email", fornecedor.email);}
  if (fornecedor.telefone){formData.append("telefone", fornecedor.telefone);}
  if (fornecedor.whatsapp){formData.append("whatsapp", fornecedor.whatsapp);}
  if (fornecedor.endereco){formData.append("endereco", fornecedor.endereco);}
  if (fornecedor.site){formData.append("site", String(fornecedor.site));}  

  await this.commentService.createFornecedor(formData).subscribe();
}


submit() {
  if (this.fornecedorForm.invalid){
    return;
  }
  console.log(this.fornecedorForm.value);
  this.createHandler(this.fornecedorForm.value);
}


}

