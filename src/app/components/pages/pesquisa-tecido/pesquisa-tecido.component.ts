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

  // to do search

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
}
