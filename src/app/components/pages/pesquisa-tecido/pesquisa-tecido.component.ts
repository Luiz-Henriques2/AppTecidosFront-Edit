import { Component, OnInit } from '@angular/core';
import { TecidoService } from 'src/app/services/tecido.service';
import { TecidoInterface } from 'src/app/Tecido';
import { environment } from 'src/app/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FornecedorInterface } from 'src/app/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { FormControl, FormGroup,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
value: string = "";
caract:string = "";
favorit:number = 0;
isLoading = false;

//---------------------

  constructor(
    private tecidoService: TecidoService,
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
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
    this.tecidoForm = new FormGroup({favoritar: new FormControl(''),});
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id!=0){
    this.tecidoService.getTecido(id).subscribe((item) => {
      this.tecidoForm.patchValue({favoritar: this.tecidoData?.favoritar});
      this.tecido = item.data;
    });}
  }
  search(e: Event):void {
    this.isLoading = true;
    //setTimeout(() => {
      // código de pesquisa aqui
    const target = e.target as HTMLInputElement
    const value = target.value.toLowerCase()
    console.log(this.value)

    this.tecidos = this.allTecidos.filter(tecido => {
      return tecido.nome.toLowerCase().includes(this.value) 
       && (tecido.fornecedor_id === undefined || 
        (this.maxID == 0 || tecido.fornecedor_id == this.maxID)) &&

        (tecido.favoritar === undefined || 
          (this.favorit == 0 || tecido.favoritar == this.favorit)) &&
          
          (tecido.caracteristica === undefined || 
        (this.caract == "" || tecido.caracteristica == this.caract)) &&

        (tecido.avista === undefined || 
          (this.minPrice == 0 || (tecido.avista !== undefined && tecido.avista >= this.minPrice)) && 
          (this.maxPrice == 0 || (tecido.avista !== undefined && tecido.avista <= this.maxPrice))) &&
          
         (tecido.gramatura === undefined || 
          (this.minGramatura == 0 || tecido.gramatura >= this.minGramatura) && 
          (this.maxGramatura == 0 || tecido.gramatura <= this.maxGramatura));

    });
    this.page = 1;
    this.isLoading = false;
  //}, 2000);
  }

  tecido!: TecidoInterface;
  tecidoData: TecidoInterface | null = null;
  tecidoForm!: FormGroup;
  async editHandler(tecido: TecidoInterface){
    tecido.favoritar = tecido.favoritar == 0 ? 1 : 0; // Alterna entre true (1) e false (0)
    const id = tecido.id
    const formData = new FormData()
    formData.append("favoritar", String(tecido.favoritar));
    await this.tecidoService.updateTecido(id!, formData).subscribe();
  }

}