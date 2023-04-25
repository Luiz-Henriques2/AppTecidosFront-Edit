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


  constructor(
    private tecidoService: TecidoService, 
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private fornecedorService: FornecedorService
    ){}



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
}
