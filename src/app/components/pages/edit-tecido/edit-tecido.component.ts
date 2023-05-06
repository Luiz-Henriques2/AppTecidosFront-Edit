import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TecidoInterface } from 'src/app/Tecido';
import { TecidoService } from 'src/app/services/tecido.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorInterface } from 'src/app/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LyDialog } from '@alyle/ui/dialog';
import { ImgCropperEvent } from '@alyle/ui/image-cropper';
import { CropperDialogComponent } from '../../cropper-dialog/cropper-dialog.component';

@Component({
  selector: 'app-edit-tecido',
  templateUrl: './edit-tecido.component.html',
  styleUrls: ['./edit-tecido.component.css']
})

export class EditTecidoComponent implements OnInit{
  fornecedores: FornecedorInterface[] = [];
  cropped?: string;

  constructor(
    private tecidoService: TecidoService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private fornecedorService: FornecedorService,
    private _dialog: LyDialog,
    private _cd: ChangeDetectorRef,
    ){}

    get nome() {
      return this.tecidoForm.get('nome')!;
    }
    get referencia() {
      return this.tecidoForm.get('referencia')!;
    }
    get fornecedor_id() {
      return this.tecidoForm.get('fornecedor_id')!;
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

    get uv() {
      return this.tecidoForm.get('uv')!;
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
      favoritar: new FormControl(''),
      prazoentrega: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),// apenas numero
      prazodesenvolvimento: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),// apenas numero

      uv: new FormControl(''),
      dry: new FormControl(''),
      insect: new FormControl(''),
      smart: new FormControl(''),
      defense: new FormControl(''),
      chlomax: new FormControl(''),
      hydro: new FormControl(''),
      eco: new FormControl(''),
      shield: new FormControl(''),
      undertech: new FormControl(''),
      ultraflex: new FormControl(''),

      durabilidade: new FormControl(''),
      toqueaveludado: new FormControl(''),
      respirabilidade: new FormControl(''),
      duplaface: new FormControl(''),
      leveza: new FormControl(''),
      altacobertura: new FormControl(''),
      elasticidade: new FormControl(''),
      secagemrapida: new FormControl(''),
      toquegelado: new FormControl(''),
      toquemacio: new FormControl(''),
      toquedebrilho: new FormControl(''),
      zerotransparencia: new FormControl(''),
      naoesgarca: new FormControl(''),
      naopinica: new FormControl(''),
      oekotex: new FormControl(''),
      compressao: new FormControl(''),
      controledeodor: new FormControl(''),

      gramatura: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),// apenas numero
      rendimento: new FormControl('', [Validators.pattern(/^\d{1,3}(,\d{1,2})?$|^\d{1,3}(\.\d{1,2})?$/), Validators.max(100)]),//maior numero 100 
      acabamento: new FormControl(''),
      referencia: new FormControl('', [Validators.required]),
      avista: new FormControl('', [Validators.pattern(/^\d{1,3}(,\d{1,2}|\.\d{1,2})?$/), Validators.max(999.99), Validators.maxLength(6)]),
      prazo: new FormControl('', [Validators.pattern(/^\d{1,3}(,\d{1,2}|\.\d{1,2})?$/), Validators.max(999.99), Validators.maxLength(6)]),
      fornecedor_id: new FormControl('', [Validators.required]),
      observacao: new FormControl(''),
    });
  
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.tecidoService.getTecido(id).subscribe((item) => {
      this.tecidoData = item.data;
      this.tecidoForm.patchValue({nome: this.tecidoData?.nome});
      this.tecidoForm.patchValue({composicao: this.tecidoData?.composicao});
      this.tecidoForm.patchValue({image: this.tecidoData?.image});

      this.tecidoForm.patchValue({caracteristica: this.tecidoData?.caracteristica});
      this.tecidoForm.patchValue({favoritar: this.tecidoData?.favoritar});
      this.tecidoForm.patchValue({prazoentrega: this.tecidoData?.prazoentrega});
      this.tecidoForm.patchValue({prazodesenvolvimento: this.tecidoData?.prazodesenvolvimento});

      this.tecidoForm.patchValue({uv: this.tecidoData?.uv});
      this.tecidoForm.patchValue({dry: this.tecidoData?.dry});
      this.tecidoForm.patchValue({insect: this.tecidoData?.insect});
      this.tecidoForm.patchValue({smart: this.tecidoData?.smart});
      this.tecidoForm.patchValue({defense: this.tecidoData?.defense});
      this.tecidoForm.patchValue({chlomax: this.tecidoData?.chlomax});
      this.tecidoForm.patchValue({hydro: this.tecidoData?.hydro});
      this.tecidoForm.patchValue({eco: this.tecidoData?.eco});
      this.tecidoForm.patchValue({shield: this.tecidoData?.shield});
      this.tecidoForm.patchValue({undertech: this.tecidoData?.undertech});
      this.tecidoForm.patchValue({ultraflex: this.tecidoData?.ultraflex});

      this.tecidoForm.patchValue({durabilidade: this.tecidoData?.durabilidade});
      this.tecidoForm.patchValue({toqueaveludado: this.tecidoData?.toqueaveludado});
      this.tecidoForm.patchValue({respirabilidade: this.tecidoData?.respirabilidade});
      this.tecidoForm.patchValue({duplaface: this.tecidoData?.duplaface});
      this.tecidoForm.patchValue({leveza: this.tecidoData?.leveza});
      this.tecidoForm.patchValue({altacobertura: this.tecidoData?.altacobertura});
      this.tecidoForm.patchValue({elasticidade: this.tecidoData?.elasticidade});
      this.tecidoForm.patchValue({secagemrapida: this.tecidoData?.secagemrapida});
      this.tecidoForm.patchValue({toquegelado: this.tecidoData?.toquegelado});
      this.tecidoForm.patchValue({toquemacio: this.tecidoData?.toquemacio});
      this.tecidoForm.patchValue({toquedebrilho: this.tecidoData?.toquedebrilho});
      this.tecidoForm.patchValue({zerotransparencia: this.tecidoData?.zerotransparencia});
      this.tecidoForm.patchValue({naoesgarca: this.tecidoData?.naoesgarca});
      this.tecidoForm.patchValue({naopinica: this.tecidoData?.naopinica});
      this.tecidoForm.patchValue({oekotex: this.tecidoData?.oekotex});
      this.tecidoForm.patchValue({compressao: this.tecidoData?.compressao});
      this.tecidoForm.patchValue({controledeodor: this.tecidoData?.controledeodor});

      this.tecidoForm.patchValue({gramatura: this.tecidoData?.gramatura});
      this.tecidoForm.patchValue({rendimento: this.tecidoData?.rendimento});
      this.tecidoForm.patchValue({acabamento: this.tecidoData?.acabamento});
      this.tecidoForm.patchValue({referencia: this.tecidoData?.referencia});
      this.tecidoForm.patchValue({avista: this.tecidoData?.avista});
      this.tecidoForm.patchValue({prazo: this.tecidoData?.prazo});
      this.tecidoForm.patchValue({fornecedor_id: this.tecidoData?.fornecedor_id});
      this.tecidoForm.patchValue({observacao: this.tecidoData?.observacao});
    });
  
  this.tecidoService.getTecido(id).subscribe((item) => {
    this.tecido = item.data;
  });

}
  
/*
  OnFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.tecidoForm.patchValue({image: file});
  }
*/

  
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
    if (tecido.favoritar){formData.append("favoritar", String(tecido.favoritar));}
    if (tecido.prazoentrega){formData.append("prazoentrega", String(tecido.prazoentrega));}
    if (tecido.prazodesenvolvimento){formData.append("prazodesenvolvimento", String(tecido.prazodesenvolvimento));}

    if(tecido.uv==false){formData.append("uv", String(0));}else{formData.append("uv", String(tecido.uv));}
    if(tecido.dry==false){formData.append("dry", String(0));}else{formData.append("dry", String(tecido.dry));}
    if(tecido.insect==false){formData.append("insect", String(0));}else{formData.append("insect", String(tecido.insect));}
    if(tecido.smart==false){formData.append("smart", String(0));}else{formData.append("smart", String(tecido.smart));}
    if(tecido.defense==false){formData.append("defense", String(0));}else{formData.append("defense", String(tecido.defense));}
    if(tecido.chlomax==false){formData.append("chlomax", String(0));}else{formData.append("chlomax", String(tecido.chlomax));}
    if(tecido.hydro==false){formData.append("hydro", String(0));}else{formData.append("hydro", String(tecido.hydro));}
    if(tecido.eco==false){formData.append("eco", String(0));}else{formData.append("eco", String(tecido.eco));}
    if(tecido.shield==false){formData.append("shield", String(0));}else{formData.append("shield", String(tecido.shield));}
    if(tecido.undertech==false){formData.append("undertech", String(0));}else{formData.append("undertech", String(tecido.undertech));}
    if(tecido.ultraflex==false){formData.append("ultraflex", String(0));}else{formData.append("ultraflex", String(tecido.ultraflex));}
    if(tecido.durabilidade==false){formData.append("durabilidade", String(0));}else{formData.append("durabilidade", String(tecido.durabilidade));}
    if(tecido.toqueaveludado==false){formData.append("toqueaveludado", String(0));}else{formData.append("toqueaveludado", String(tecido.toqueaveludado));}
    if(tecido.respirabilidade==false){formData.append("respirabilidade", String(0));}else{formData.append("respirabilidade", String(tecido.respirabilidade));}
    if(tecido.duplaface==false){formData.append("duplaface", String(0));}else{formData.append("duplaface", String(tecido.duplaface));}
    if(tecido.leveza==false){formData.append("leveza", String(0));}else{formData.append("leveza", String(tecido.leveza));}
    if(tecido.altacobertura==false){formData.append("altacobertura", String(0));}else{formData.append("altacobertura", String(tecido.altacobertura));}
    if(tecido.elasticidade==false){formData.append("elasticidade", String(0));}else{formData.append("elasticidade", String(tecido.elasticidade));}
    if(tecido.secagemrapida==false){formData.append("secagemrapida", String(0));}else{formData.append("secagemrapida", String(tecido.secagemrapida));}
    if(tecido.toquegelado==false){formData.append("toquegelado", String(0));}else{formData.append("toquegelado", String(tecido.toquegelado));}
    if(tecido.toquemacio==false){formData.append("toquemacio", String(0));}else{formData.append("toquemacio", String(tecido.toquemacio));}
    if(tecido.toquedebrilho==false){formData.append("toquedebrilho", String(0));}else{formData.append("toquedebrilho", String(tecido.toquedebrilho));}
    if(tecido.zerotransparencia==false){formData.append("zerotransparencia", String(0));}else{formData.append("zerotransparencia", String(tecido.zerotransparencia));}
    if(tecido.naoesgarca==false){formData.append("naoesgarca", String(0));}else{formData.append("naoesgarca", String(tecido.naoesgarca));}
    if(tecido.naopinica==false){formData.append("naopinica", String(0));}else{formData.append("naopinica", String(tecido.naopinica));}
    if(tecido.oekotex==false){formData.append("oekotex", String(0));}else{formData.append("oekotex", String(tecido.oekotex));}
    if(tecido.compressao==false){formData.append("compressao", String(0));}else{formData.append("compressao", String(tecido.compressao));}
    if(tecido.controledeodor==false){formData.append("controledeodor", String(0));}else{formData.append("controledeodor", String(tecido.controledeodor));}

    if (tecido.gramatura){formData.append("gramatura", String(tecido.gramatura).replace(',', '.'));}
    if (tecido.rendimento){formData.append("rendimento", String(tecido.rendimento).replace(',', '.'));}
    if (tecido.acabamento){formData.append("acabamento", String(tecido.acabamento));}
    if (tecido.referencia){formData.append("referencia", String(tecido.referencia));}
    if (tecido.avista){formData.append("avista", String(tecido.avista).replace(',', '.'));}
    if (tecido.prazo){formData.append("prazo", String(tecido.prazo).replace(',', '.'));}

    if (tecido.fornecedor_id){formData.append("fornecedor_id", String(tecido.fornecedor_id));}
    if (tecido.observacao){formData.append("observacao", tecido.observacao);}   
    
    await this.tecidoService.updateTecido(id!, formData).subscribe();
    this.messageService.add(`Tecido ${id} atualizado com sucesso!`);
    this.router.navigate(['/']);
  }

  openCropperDialog(event: Event) {
    this.cropped = null!;
    this._dialog.open<CropperDialogComponent, Event>(CropperDialogComponent, {
      data: event,
      width: 320,
      disableClose: true
    }).afterClosed.subscribe((result?: ImgCropperEvent) => {
      if (result) {
        this.cropped = result.dataURL;
        const byteString = atob(this.cropped!.split(',')[1]);
        const mimeString = this.cropped!.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], "filename.jpg");
        console.log(file);
        this.tecidoForm.patchValue({image: file});
        this._cd.markForCheck();
      }
    });
  }
}