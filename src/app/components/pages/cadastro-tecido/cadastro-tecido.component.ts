import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TecidoInterface } from 'src/app/Tecido';
import { TecidoService } from 'src/app/services/tecido.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cadastro-tecido',
  templateUrl: './cadastro-tecido.component.html',
  styleUrls: ['./cadastro-tecido.component.css']
})
export class CadastroTecidoComponent implements OnInit{
  

  constructor(
    private tecidoService: TecidoService, 
    private messageService: MessagesService,
    private router: Router
    ){}

get nome() {
  return this.tecidoForm.get('nome')!;
}

  btnText = 'Cadastrar';
  tecidoForm!: FormGroup;

  ngOnInit(): void {
    this.tecidoForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      composicao: new FormControl(''),
      image: new FormControl(''),
      gramatura: new FormControl(''),
      rendimento: new FormControl(''),
      acabamento: new FormControl(''),
      referencia: new FormControl(''),
      avista: new FormControl(''),
      prazo: new FormControl(''),
      fornecedor: new FormControl(''),
      fornecedorId: new FormControl(''),
      observacao: new FormControl(''),
    });
  }

  OnFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.tecidoForm.patchValue({image: file});
  }

  async createHandler(tecido: TecidoInterface){
    const formData = new FormData();

    formData.append("nome", tecido.nome);
    if (tecido.composicao){formData.append("composicao", tecido.composicao);}
    if (tecido.image){formData.append("image", tecido.image);}
    if (tecido.gramatura){formData.append("gramatura", String(tecido.gramatura));}
    if (tecido.rendimento){formData.append("rendimento", String(tecido.rendimento));}
    if (tecido.acabamento){formData.append("acabamento", String(tecido.acabamento));}
    if (tecido.referencia){formData.append("referencia", String(tecido.referencia));}
    if (tecido.avista){formData.append("avista", String(tecido.avista));}
    if (tecido.prazo){formData.append("prazo", String(tecido.prazo));}
    if (tecido.fornecedor){formData.append("fornecedor", tecido.fornecedor);}
    if (tecido.fornecedorId){formData.append("fornecedorId", String(tecido.fornecedorId));}
    if (tecido.observacao){formData.append("observacao", tecido.observacao);}    

    await this.tecidoService.createTecido(formData).subscribe();

    this.messageService.add('Tecido adicionado com sucesso!');

    this.router.navigate(['/']);
  }

  
  submit() {
    if (this.tecidoForm.invalid){
      return;
    }
    console.log(this.tecidoForm.value);
    this.createHandler(this.tecidoForm.value);
  }
}
