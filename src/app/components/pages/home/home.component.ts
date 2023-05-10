import { Component } from '@angular/core';
import { TecidoInterface } from 'src/app/Tecido';
import { OnInit } from '@angular/core';
import { TecidoService } from 'src/app/services/tecido.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { FornecedorInterface } from 'src/app/Fornecedor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  tecido!: TecidoInterface;
  tecidoData: TecidoInterface | null = null;
  tecidoForm!: FormGroup;
  valid:boolean= false
  //fornecedores: FornecedorInterface[] = [];
  //baseApiUrl = environment.baseApiUrl

  allTecidos: TecidoInterface[] = []
  tecidos: TecidoInterface[] = []
  value: string = ""
  fornecedores: FornecedorInterface[] = []

  constructor(
    private tecidoService: TecidoService,
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
  ) {}

  ngOnInit(): void {
    this.fornecedorService.getFornecedores().subscribe((items) => {
      const data = items.data;
      this.fornecedores = data;
    });
    this.tecidoService.getTecidos().subscribe((items) => {
      const data = items.data;
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleString(
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
    const target = e.target as HTMLInputElement
    const value = target.value
    if(this.tecidos){
      const tecido = this.allTecidos.find(tecido => {return tecido.nome.includes(this.value)})
    }
    console.log(this.tecido)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tecidoService.getTecido(id).subscribe((item) => {})
  }
  
}
//-------------------------------------------
