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
get gramatura() {
  return this.tecidoForm.get('gramatura')!;
}
get rendimento() {
  return this.tecidoForm.get('rendimento')!;
}
get prazo() {
  return this.tecidoForm.get('prazo')!;
}
get avista() {
  return this.tecidoForm.get('avista')!;
}

  btnText = 'Cadastrar';
  tecidoForm!: FormGroup;

  ngOnInit(): void {
    this.tecidoForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      composicao: new FormControl(''),
      image: new FormControl(''),
      gramatura: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),// apenas numero
      rendimento: new FormControl('', [Validators.pattern(/^\d{1,3}(,\d{1,2})?$|^\d{1,3}(\.\d{1,2})?$/), Validators.max(100)]),//maior numero 100 
      acabamento: new FormControl(''),
      referencia: new FormControl(''),
      avista: new FormControl('', [Validators.pattern(/^\d{1,3}(,\d{1,2}|\.\d{1,2})?$/), Validators.max(999.99), Validators.maxLength(6)]),
      prazo: new FormControl('', [Validators.pattern(/^\d{1,3}(,\d{1,2}|\.\d{1,2})?$/), Validators.max(999.99), Validators.maxLength(6)]),
      fornecedor: new FormControl(''),
      fornecedor_id: new FormControl(''),
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
    if (tecido.gramatura){formData.append("gramatura", String(tecido.gramatura).replace(',', '.'));}
    if (tecido.rendimento){formData.append("rendimento", String(tecido.rendimento).replace(',', '.'));}
    if (tecido.acabamento){formData.append("acabamento", String(tecido.acabamento));}
    if (tecido.referencia){formData.append("referencia", String(tecido.referencia));}
    if (tecido.avista){formData.append("avista", String(tecido.avista).replace(',', '.'));}
    if (tecido.prazo){formData.append("prazo", String(tecido.prazo).replace(',', '.'));}
    if (tecido.fornecedor){formData.append("fornecedor", tecido.fornecedor);}
    if (tecido.fornecedor_id){formData.append("fornecedor_id", String(tecido.fornecedor_id));}
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
