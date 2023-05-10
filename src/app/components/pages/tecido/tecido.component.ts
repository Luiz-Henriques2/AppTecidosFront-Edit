import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { TecidoService } from 'src/app/services/tecido.service';
import { TecidoInterface } from 'src/app/Tecido';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FornecedorInterface } from 'src/app/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';


@Component({
  selector: 'app-tecido',
  templateUrl: './tecido.component.html',
  styleUrls: ['./tecido.component.css']
})
export class TecidoComponent implements OnInit{
  tecido?: TecidoInterface;
  baseApiUrl = environment.baseApiUrl
  faTimes = faTimes
  faEdit = faEdit
  modalRef?: BsModalRef;
  fornecedor?: FornecedorInterface;
  favoritar:string = "";
  tecnologias:string = '1' + this.tecido?.dry;

  constructor(
    private tecidoService: TecidoService, 
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private fornecedorService: FornecedorService
    ){}

    get tecnologiasi() {
      return this.tecnologias;
    }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tecidoService.getTecido(id).subscribe((item) => (this.tecido = item.data));

  }

  formatarPreco(preco: any): string {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
  }


  exibirMensagemDeConfirmacao(id: number) {
    if (confirm("Tem certeza que deseja excluir o tecido?")) {
      this.removeHandler(id);
    }
  }
  
  async removeHandler(id: number) {
    await this.tecidoService.removeTecido(id).subscribe()

    this.messageService.add("Tecido excluido com sucesso!")

    this.router.navigate(['/']);
  }
  //---PROBLEMA A SER RESOLVIDO----ESTA FAZENDO 4 REQUISIÇOES NA API---ESSA FUNÇÃO E PUCHADA NO HTML EM FORNECEDOR:--
  //---OUTRO: QUANDO ABRE DUAS PAGINAS DIFERENTES COM O ID-FORNECEDOR IGUALÉ NOVAMENTE CHAMADO A API
  inFornecedor(id: number) {
    if (!this.fornecedor?.nome) { 
      this.fornecedorService.getFornecedor(id).subscribe((item) => (this.fornecedor = item.data));
    }
  }

  getTecnologias(): string {
    let result = '';
    if (this.tecido?.uv) {
      result += 'UV - ';
    }
    if (this.tecido?.dry) {
      result += 'DRY - ';
    }
    if (this.tecido?.insect) {
      result += 'INSECT - ';
    }
    if (this.tecido?.smart) {
      result += 'SMART - ';
    }
    if (this.tecido?.defense) {
      result += 'DEFENSE - ';
    }
    if (this.tecido?.chlomax) {
      result += 'CHLOMAX - ';
    }
    if (this.tecido?.hydro) {
      result += 'HYDRO - ';
    }
    if (this.tecido?.eco) {
      result += 'ECO - ';
    }
    if (this.tecido?.shield) {
      result += 'SHIELD - ';
    }
    if (this.tecido?.undertech) {
      result += 'UNDERTECH - ';
    }
    if (this.tecido?.ultraflex) {
      result += 'ULTRAFLEX - ';
    }
    if (this.tecido?.durabilidade) {
      result += 'DURABILIDADE - ';
    }
    if (this.tecido?.toqueaveludado) {
      result += 'TOQUE AVELUDADO - ';
    }
    if (this.tecido?.respirabilidade) {
      result += 'RESPIRABILIDADE - ';
    }
    if (this.tecido?.duplaface) {
      result += 'DUPLA FACE - ';
    }
    if (this.tecido?.leveza) {
      result += 'LEVEZA - ';
    }
    if (this.tecido?.altacobertura) {
      result += 'ALTA COBERTURA - ';
    }
    if (this.tecido?.elasticidade) {
      result += 'ELASTICIDADE - ';
      }
      if (this.tecido?.secagemrapida) {
      result += 'SECAGEM RÁPIDA - ';
      }
      if (this.tecido?.toquegelado) {
      result += 'TOQUE GELADO - ';
      }
      if (this.tecido?.toquemacio) {
      result += 'TOQUE MACIO - ';
      }
      if (this.tecido?.toquedebrilho) {
      result += 'TOQUE DE BRILHO - ';
      }
      if (this.tecido?.zerotransparencia) {
      result += 'ZERO TRANSPARÊNCIA - ';
      }
      if (this.tecido?.naoesgarca) {
      result += 'NÃO ESGARÇA - ';
      }
      if (this.tecido?.naopinica) {
      result += 'NÃO PINICA - ';
      }
      if (this.tecido?.oekotex) {
      result += 'OEKO-TEX - ';
      }
      if (this.tecido?.compressao) {
      result += 'COMPRESSÃO FIRME - ';
      }
      if (this.tecido?.controledeodor) {
      result += 'CONTROLE DE ODOR - ';
      }

      return result
    }

}
