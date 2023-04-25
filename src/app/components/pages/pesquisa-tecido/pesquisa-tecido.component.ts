import { Component, OnInit } from '@angular/core';
import { TecidoService } from 'src/app/services/tecido.service';
import { TecidoInterface } from 'src/app/Tecido';
import { environment } from 'src/app/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FornecedorInterface } from 'src/app/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-pesquisa-tecido',
  templateUrl: './pesquisa-tecido.component.html',
  styleUrls: ['./pesquisa-tecido.component.css']
})
export class PesquisaTecidoComponent implements OnInit {
  fornecedores: FornecedorInterface[] = [];
  allTecidos: TecidoInterface[] = []
  tecidos: TecidoInterface[] = []
  baseApiUrl = environment.baseApiUrl

  faSearch = faSearch
  searchTerm: string = '';
  //----------------------
  page = 1;

minPrice: number = 0;
maxPrice: number = 0;
minGramatura: number = 0;
maxGramatura: number = 0;
minID: number = 0;
maxID: number = 0;
//---------------------

  constructor(
    private tecidoService: TecidoService,
    private fornecedorService: FornecedorService
  ) {}
  ngOnInit(): void {
    this.fornecedorService.getFornecedores().subscribe((items) => {
      const data = items.data;
      this.fornecedores = data;
    });
    this.tecidoService.getTecidos().subscribe((items) => {
      const data = items.data;
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
          );
      });
      this.allTecidos = data;
      this.tecidos = data;
    });
  }

  search(e: Event):void {
    const target = e.target as HTMLInputElement
    const value = target.value

    this.tecidos = this.allTecidos.filter(tecido => {
      return tecido.nome.toLowerCase().includes(value)
    });
    this.page = 1;
  }

  searchFiltro(e: Event):void {
    const target = e.target as HTMLInputElement
    const value = target.value

    this.tecidos = this.allTecidos.filter(tecido => {
      return (tecido.fornecedor_id === undefined || 
      (this.maxID == 0 || tecido.fornecedor_id == this.maxID));
});
    this.page = 1;
  }

  atribuir(id: number){
    this.maxID = id;
  }

  searchIntervalo(e: Event):void {
    const target = e.target as HTMLInputElement
    const value = target.value

    this.tecidos = this.allTecidos.filter(tecido => {
      return (tecido.avista === undefined || 
        (this.minPrice == 0 || (tecido.avista !== undefined && tecido.avista >= this.minPrice)) && 
        (this.maxPrice == 0 || (tecido.avista !== undefined && tecido.avista <= this.maxPrice))) &&
       (tecido.gramatura === undefined || 
        (this.minGramatura == 0 || tecido.gramatura >= this.minGramatura) && 
        (this.maxGramatura == 0 || tecido.gramatura <= this.maxGramatura));
});
    this.page = 1;
  }
}

