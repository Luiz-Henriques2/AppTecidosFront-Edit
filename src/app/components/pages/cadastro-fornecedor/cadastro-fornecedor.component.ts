import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedorInterface } from 'src/app/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-fornecedor',
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrls: ['./cadastro-fornecedor.component.css']
})
export class CadastroFornecedorComponent implements OnInit{
 

  constructor(
    private fornecedorService: FornecedorService, 
    private messageService: MessagesService,
    private router: Router
    ){}

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

  get nome() {
    return this.fornecedorForm.get('nome')!;
  }

//---------------------------------
async createHandler(fornecedor: FornecedorInterface){
  const formData = new FormData();

  formData.append("nome", fornecedor.nome);
  if (fornecedor.email){formData.append("email", fornecedor.email);}
  if (fornecedor.telefone){formData.append("telefone", fornecedor.telefone);}
  if (fornecedor.whatsapp){formData.append("whatsapp", fornecedor.whatsapp);}
  if (fornecedor.endereco){formData.append("endereco", fornecedor.endereco);}  
  if (fornecedor.site){formData.append("site", fornecedor.site);}  
  await this.fornecedorService.createFornecedor(formData).subscribe();

  this.messageService.add('Fornecedor adicionado com sucesso!');

  this.router.navigate(['/']);
}
//----------------------
submit() {
  if (this.fornecedorForm.invalid){
    return;
  }
  console.log(this.fornecedorForm.value);
  this.createHandler(this.fornecedorForm.value);
}
//---------------------------------

}

