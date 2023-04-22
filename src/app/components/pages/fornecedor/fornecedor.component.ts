import { Component, OnInit, ViewChild, TemplateRef   } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { FornecedorInterface } from 'src/app/Fornecedor';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit{
  fornecedor?: FornecedorInterface;
  baseApiUrl = environment.baseApiUrl
  faTimes = faTimes
  faEdit = faEdit
  modalRef?: BsModalRef;

  constructor(
    private fornecedorService: FornecedorService, 
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router
    ){}

    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.fornecedorService.getFornecedor(id).subscribe((item) => (this.fornecedor = item.data));
  
    }
  
    exibirMensagemDeConfirmacao(id: number) {
      if (confirm("Tem certeza que deseja excluir o fornecedor?")) {
        this.removeHandler(id);
      }
    }
    
    async removeHandler(id: number) {
      await this.fornecedorService.removeFornecedor(id).subscribe()
  
      this.messageService.add("Fornecedor excluido com sucesso!")
  
      this.router.navigate(['/']);
    }
  }
  