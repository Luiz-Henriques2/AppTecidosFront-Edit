import { Component, OnInit } from '@angular/core';
import { TecidoService } from 'src/app/services/tecido.service';
import { TecidoInterface } from 'src/app/Tecido';
import { environment } from 'src/app/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-pesquisa-tecido',
  templateUrl: './pesquisa-tecido.component.html',
  styleUrls: ['./pesquisa-tecido.component.css']
})
export class PesquisaTecidoComponent implements OnInit {
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
//---------------------

  constructor(private tecidoService: TecidoService) {}
  ngOnInit(): void {
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
      return tecido.nome.toLowerCase().includes(value) &&
             (tecido.avista === undefined || 
              (this.minPrice == 0 || tecido.avista >= this.minPrice) && 
              (this.maxPrice == 0 || tecido.avista <= this.maxPrice)) &&
             (tecido.gramatura === undefined || 
             (this.minGramatura == 0 || tecido.gramatura >= this.minGramatura) && 
             (this.maxGramatura == 0 || tecido.gramatura <= this.maxGramatura));
    });
    this.page = 1;
  }
}

