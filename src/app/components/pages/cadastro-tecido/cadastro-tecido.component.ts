import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tecidos } from 'src/app/Comment';
import { ApptecidoService } from 'src/app/services/apptecido.service';

@Component({
  selector: 'app-cadastro-tecido',
  templateUrl: './cadastro-tecido.component.html',
  styleUrls: ['./cadastro-tecido.component.css']
})
export class CadastroTecidoComponent implements OnInit{
  

  constructor(private apptecidoService: ApptecidoService){}

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
      aprazo: new FormControl(''),
      nomeFornecedor: new FormControl(''),
      fornecedor: new FormControl(''),
      complemento: new FormControl(''),
    });
  }

  async createHandler(tecido: Tecidos){
    const formData = new FormData();

    formData.append("nome", tecido.nome);
    if (tecido.composicao){formData.append("composicao", tecido.composicao);}
    if (tecido.imagem){formData.append("image", tecido.imagem);}
    if (tecido.gramatura){formData.append("gramatura", String(tecido.gramatura));}
    if (tecido.rendimento){formData.append("rendimento", String(tecido.rendimento));}
    if (tecido.acabamento){formData.append("acabamento", String(tecido.acabamento));}
    if (tecido.referencia){formData.append("referencia", String(tecido.referencia));}
    if (tecido.avista){formData.append("avista", String(tecido.avista));}
    if (tecido.prazo){formData.append("aprazo", String(tecido.prazo));}
    if (tecido.fornecedor){formData.append("nomeFornecedor", tecido.fornecedor);}
    if (tecido.fornecedorId){formData.append("fornecedor", String(tecido.fornecedorId));}
    if (tecido.observacao){formData.append("complemento", tecido.observacao);}    

    await this.apptecidoService.createTecido(formData).subscribe();
  }

  OnFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.tecidoForm.patchValue({image: file});
  }
  
  submit() {
    if (this.tecidoForm.invalid){
      return;
    }
    console.log(this.tecidoForm.value);
    this.createHandler(this.tecidoForm.value);
  }
}
