import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { FornecedorInterface } from 'src/app/Fornecedor';
import { environment } from 'src/app/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-pesquisa-fornecedor',
  templateUrl: './pesquisa-fornecedor.component.html',
  styleUrls: ['./pesquisa-fornecedor.component.css']
})
export class PesquisaFornecedorComponent implements OnInit {
  allFornecedores: FornecedorInterface[] = []
  fornecedores: FornecedorInterface[] = []
  baseApiUrl = environment.baseApiUrl

  faSearch = faSearch
  searchTerm: string = '';

  constructor(private fornecedorService: FornecedorService) {}
  ngOnInit(): void {
    this.fornecedorService.getFornecedores().subscribe((items) => {
      const data = items.data;
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
          );
      });
      this.allFornecedores = data;
      this.fornecedores = data;
    });
  }

  search(e: Event):void {
    const target = e.target as HTMLInputElement
    const value = target.value

    this.fornecedores = this.allFornecedores.filter(fornecedor => {
      return fornecedor.nome.toLowerCase().includes(value);
    });
  }
}
