import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TecidoInterface } from 'src/app/Tecido';
import { TecidoService } from 'src/app/services/tecido.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';
import { FornecedorInterface } from 'src/app/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LyDialog } from '@alyle/ui/dialog';
import { ImgCropperEvent } from '@alyle/ui/image-cropper';
import { CropperDialogComponent } from '../../cropper-dialog/cropper-dialog.component';

@Component({
  selector: 'app-cadastro-tecido',
  templateUrl: './cadastro-tecido.component.html',
  styleUrls: ['./cadastro-tecido.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CadastroTecidoComponent implements OnInit{
  fornecedores: FornecedorInterface[] = [];
  cropped?: string;
  constructor(
    private tecidoService: TecidoService, 
    private messageService: MessagesService,
    private router: Router,
    private fornecedorService: FornecedorService,
    private _dialog: LyDialog,
    private _cd: ChangeDetectorRef,
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
get prazoentrega() {
  return this.tecidoForm.get('prazoentrega')!;
}
get prazodesenvolvimento() {
  return this.tecidoForm.get('prazodesenvolvimento')!;
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
    this.fornecedorService.getFornecedores().subscribe((items) => {
      const data = items.data;
      this.fornecedores = data;
    });

    this.tecidoForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      composicao: new FormControl(''),
      image: new FormControl(''),
      gramatura: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),// apenas numero
      rendimento: new FormControl('', [Validators.pattern(/^\d{1,3}(,\d{1,2})?$|^\d{1,3}(\.\d{1,2})?$/), Validators.max(100)]),//maior numero 100 
      acabamento: new FormControl(''),

      caracteristica: new FormControl(''),
      tecnologia: new FormControl(''),
      favoritar: new FormControl('0'),
      prazoentrega: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),// apenas numero
      prazodesenvolvimento: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),// apenas numero

      uv: new FormControl(false),
      dry: new FormControl(false),
      insect: new FormControl(false),
      smart: new FormControl(false),
      defense: new FormControl(false),
      chlomax: new FormControl(false),
      hydro: new FormControl(false),
      eco: new FormControl(false),
      shield: new FormControl(false),
      undertech: new FormControl(false),
      ultraflex: new FormControl(false),

      durabilidade: new FormControl(false),
      toqueaveludado: new FormControl(false),
      respirabilidade: new FormControl(false),
      duplaface: new FormControl(false),
      leveza: new FormControl(false),
      altacobertura: new FormControl(false),
      elasticidade: new FormControl(false),
      secagemrapida: new FormControl(false),
      toquegelado: new FormControl(false),
      toquemacio: new FormControl(false),
      toquedebrilho: new FormControl(false),
      zerotransparencia: new FormControl(false),
      naoesgarca: new FormControl(false),
      naopinica: new FormControl(false),
      oekotex: new FormControl(false),
      compressao: new FormControl(false),
      controledeodor: new FormControl(false),

      referencia: new FormControl(''),
      avista: new FormControl('', [Validators.pattern(/^\d{1,3}(,\d{1,2}|\.\d{1,2})?$/), Validators.max(999.99), Validators.maxLength(6)]),
      prazo: new FormControl('', [Validators.pattern(/^\d{1,3}(,\d{1,2}|\.\d{1,2})?$/), Validators.max(999.99), Validators.maxLength(6)]),
      fornecedor_id: new FormControl(''),
      observacao: new FormControl(''),
    });
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

    if (tecido.caracteristica){formData.append("caracteristica", String(tecido.caracteristica));}
    if (tecido.tecnologia){formData.append("tecnologia", String(tecido.tecnologia));}
    if (tecido.favoritar){formData.append("favoritar", String(tecido.favoritar));}
    if (tecido.prazoentrega){formData.append("prazoentrega", String(tecido.prazoentrega));}
    if (tecido.prazodesenvolvimento){formData.append("prazodesenvolvimento", String(tecido.prazodesenvolvimento));}

    if (tecido.uv){formData.append("uv", String(tecido.uv));}
    if (tecido.dry){formData.append("dry", String(tecido.dry));}
    if (tecido.insect){formData.append("insect", String(tecido.insect));}
    if (tecido.smart){formData.append("smart", String(tecido.smart));}
    if (tecido.defense){formData.append("defense", String(tecido.defense));}
    if (tecido.chlomax){formData.append("chlomax", String(tecido.chlomax));}
    if (tecido.hydro){formData.append("hydro", String(tecido.hydro));}
    if (tecido.eco){formData.append("eco", String(tecido.eco));}
    if (tecido.shield){formData.append("shield", String(tecido.shield));}
    if (tecido.undertech){formData.append("undertech", String(tecido.undertech));}
    if (tecido.ultraflex){formData.append("ultraflex", String(tecido.ultraflex));}

    if (tecido.durabilidade){formData.append("durabilidade", String(tecido.durabilidade));}
    if (tecido.toqueaveludado){formData.append("toqueaveludado", String(tecido.toqueaveludado));}
    if (tecido.respirabilidade){formData.append("respirabilidade", String(tecido.respirabilidade));}
    if (tecido.duplaface){formData.append("duplaface", String(tecido.duplaface));}
    if (tecido.leveza){formData.append("leveza", String(tecido.leveza));}
    if (tecido.altacobertura){formData.append("altacobertura", String(tecido.altacobertura));}
    if (tecido.elasticidade){formData.append("elasticidade", String(tecido.elasticidade));}
    if (tecido.secagemrapida){formData.append("secagemrapida", String(tecido.secagemrapida));}
    if (tecido.toquegelado){formData.append("toquegelado", String(tecido.toquegelado));}
    if (tecido.toquemacio){formData.append("toquemacio", String(tecido.toquemacio));}
    if (tecido.toquedebrilho){formData.append("toquedebrilho", String(tecido.toquedebrilho));}
    if (tecido.zerotransparencia){formData.append("zerotransparencia", String(tecido.zerotransparencia));}
    if (tecido.naoesgarca){formData.append("naoesgarca", String(tecido.naoesgarca));}
    if (tecido.naopinica){formData.append("naopinica", String(tecido.naopinica));}
    if (tecido.oekotex){formData.append("oekotex", String(tecido.oekotex));}
    if (tecido.compressao){formData.append("compressao", String(tecido.compressao));}
    if (tecido.controledeodor){formData.append("controledeodor", String(tecido.controledeodor));}

    if (tecido.avista){formData.append("avista", String(tecido.avista).replace(',', '.'));}
    if (tecido.prazo){formData.append("prazo", String(tecido.prazo).replace(',', '.'));}
    if (tecido.fornecedor_id){formData.append("fornecedor_id", String(tecido.fornecedor_id));}
    if (tecido.observacao){formData.append("observacao", tecido.observacao);}    

    await this.tecidoService.createTecido(formData).subscribe();

    this.messageService.add('Tecido adicionado com sucesso!');

    this.router.navigate(['/']);
    //this.tecidoForm.reset();
    //document.documentElement.scrollTop = 0;
    //document.body.scrollTop = 0;
  }

  
  submit() {
    if (this.tecidoForm.invalid){
      return;
    }
    console.log(this.tecidoForm.value);
    this.createHandler(this.tecidoForm.value);
  }
  /*
  OnFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.tecidoForm.patchValue({image: file});
  }
  */
  //-------------------------------------
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
