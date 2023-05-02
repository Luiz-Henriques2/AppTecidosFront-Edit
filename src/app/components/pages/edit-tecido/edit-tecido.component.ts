import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TecidoInterface } from 'src/app/Tecido';
import { TecidoService } from 'src/app/services/tecido.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorInterface } from 'src/app/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-edit-tecido',
  templateUrl: './edit-tecido.component.html',
  styleUrls: ['./edit-tecido.component.css']
})

export class EditTecidoComponent implements OnInit{
  fornecedores: FornecedorInterface[] = [];

  constructor(
    private tecidoService: TecidoService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private fornecedorService: FornecedorService
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
    get prazoentrega() {
      return this.tecidoForm.get('prazoentrega')!;
    }
    get prazodesenvolvimento() {
      return this.tecidoForm.get('prazodesenvolvimento')!;
    }

  tecido!: TecidoInterface;
  btnText: string = 'Editar';
  tecidoData: TecidoInterface | null = null;
  tecidoForm!: FormGroup;

  ngOnInit(): void {
    this.fornecedorService.getFornecedores().subscribe((items) => {
      const data = items.data;
      this.fornecedores = data;
    });

    this.tecidoForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      composicao: new FormControl(''),
      image: new FormControl(''),

      caracteristica: new FormControl(''),
      tecnologia: new FormControl(''),
      favoritar: new FormControl(''),
      prazoentrega: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),// apenas numero
      prazodesenvolvimento: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),// apenas numero

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
  
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.tecidoService.getTecido(id).subscribe((item) => {
      this.tecidoData = item.data;
      this.tecidoForm.patchValue({nome: this.tecidoData?.nome});
      this.tecidoForm.patchValue({composicao: this.tecidoData?.composicao});
      this.tecidoForm.patchValue({image: this.tecidoData?.image});

      this.tecidoForm.patchValue({caracteristica: this.tecidoData?.caracteristica});
      this.tecidoForm.patchValue({tecnologia: this.tecidoData?.tecnologia});
      this.tecidoForm.patchValue({favoritar: this.tecidoData?.favoritar});
      this.tecidoForm.patchValue({prazoentrega: this.tecidoData?.prazoentrega});
      this.tecidoForm.patchValue({prazodesenvolvimento: this.tecidoData?.prazodesenvolvimento});

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

    if (tecido.caracteristica){formData.append("caracteristica", String(tecido.caracteristica));}
    if (tecido.tecnologia){formData.append("tecnologia", String(tecido.tecnologia));}
    if (tecido.favoritar){formData.append("favoritar", String(tecido.favoritar));}
    if (tecido.prazoentrega){formData.append("prazoentrega", String(tecido.prazoentrega));}
    if (tecido.prazodesenvolvimento){formData.append("prazodesenvolvimento", String(tecido.prazodesenvolvimento));}

    if (tecido.gramatura){formData.append("gramatura", String(tecido.gramatura).replace(',', '.'));}
    if (tecido.rendimento){formData.append("rendimento", String(tecido.rendimento).replace(',', '.'));}
    if (tecido.acabamento){formData.append("acabamento", String(tecido.acabamento));}
    if (tecido.referencia){formData.append("referencia", String(tecido.referencia));}
    if (tecido.avista){formData.append("avista", String(tecido.avista).replace(',', '.'));}
    if (tecido.prazo){formData.append("prazo", String(tecido.prazo).replace(',', '.'));}
    if (tecido.fornecedor){formData.append("fornecedor", tecido.fornecedor);}
    if (tecido.fornecedor_id){formData.append("fornecedor_id", String(tecido.fornecedor_id));}
    if (tecido.observacao){formData.append("observacao", tecido.observacao);}   
    
    await this.tecidoService.updateTecido(id!, formData).subscribe();
    this.messageService.add(`Tecido ${id} atualizado com sucesso!`);
    this.router.navigate(['/']);
  }
}