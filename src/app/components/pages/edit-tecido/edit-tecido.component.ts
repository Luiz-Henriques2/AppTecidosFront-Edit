import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TecidoInterface } from 'src/app/Tecido';
import { TecidoService } from 'src/app/services/tecido.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-tecido',
  templateUrl: './edit-tecido.component.html',
  styleUrls: ['./edit-tecido.component.css']
})

export class EditTecidoComponent implements OnInit{

  constructor(
    //----tecidoService chamado nos dois
    private tecidoService: TecidoService,
    //---novo------
    private route: ActivatedRoute,
    //--fim-novo---
    private messageService: MessagesService,
    private router: Router,
    ){}

get nome() {
  return this.tecidoForm.get('nome')!;
}
  //--------------------novo--
  tecido!: TecidoInterface;
  btnText: string = 'Editar';
  tecidoData: TecidoInterface | null = null;

  //--------------------fim-novo--
  //btnText = 'Cadastrar';
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
      fornecedor_id: new FormControl(''),
      observacao: new FormControl(''),
    });
  
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.tecidoService.getTecido(id).subscribe((item) => {
      this.tecidoData = item.data;
      this.tecidoForm.patchValue({nome: this.tecidoData?.nome});
      this.tecidoForm.patchValue({composicao: this.tecidoData?.composicao});
      this.tecidoForm.patchValue({image: this.tecidoData?.image});
      this.tecidoForm.patchValue({gramatura: this.tecidoData?.gramatura});
      this.tecidoForm.patchValue({rendimento: this.tecidoData?.rendimento});
      this.tecidoForm.patchValue({acabamento: this.tecidoData?.acabamento});
      this.tecidoForm.patchValue({referencia: this.tecidoData?.referencia});
      this.tecidoForm.patchValue({avista: this.tecidoData?.avista});
      this.tecidoForm.patchValue({prazo: this.tecidoData?.prazo});
      this.tecidoForm.patchValue({fornecedor: this.tecidoData?.fornecedor});
      this.tecidoForm.patchValue({fornecedor_id: this.tecidoData?.fornecedor_id});
      this.tecidoForm.patchValue({observacao: this.tecidoData?.observacao});
    });
  
  this.tecidoService.getTecido(id).subscribe((item) => {
    this.tecido = item.data;
  });

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
    this.editHandler(this.tecidoForm.value);
  }

  async editHandler(tecido: TecidoInterface){
    const id = this.tecido.id

    const formData = new FormData()

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
    if (tecido.fornecedor_id){formData.append("fornecedor_id", String(tecido.fornecedor_id));}
    if (tecido.observacao){formData.append("observacao", tecido.observacao);}   
    
    await this.tecidoService.updateTecido(id!, formData).subscribe();
    this.messageService.add(`Tecido ${id} atualizado com sucesso!`);
    this.router.navigate(['/']);
  }
}