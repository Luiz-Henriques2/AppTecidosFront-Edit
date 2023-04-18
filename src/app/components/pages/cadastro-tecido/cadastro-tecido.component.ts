import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tecidos } from 'src/app/Comment';
import { ApptecidoService } from 'src/app/services/apptecido.service';
@Component({
  selector: 'app-cadastro-tecido',
  templateUrl: './cadastro-tecido.component.html',
  styleUrls: ['./cadastro-tecido.component.css']
})
export class CadastroTecidoComponent implements OnInit{
  


get title() {
  return this.tecidoForm.get('title')!;
}

  btnText = 'Cadastrar';
  tecidoForm!: FormGroup;

  ngOnInit(): void {
    this.tecidoForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      composicao: new FormControl(''),
      image: new FormControl(''),
      gramatura: new FormControl(''),
      rendimento: new FormControl(''),
      acabamento: new FormControl(''),
      referencia: new FormControl(''),
      avista: new FormControl(''),
      aprazo: new FormControl(''),
      nomeFornecedor: new FormControl(''),
      fornecedor: new FormControl(''),
      complemento: new FormControl(''),
    });
  }

  createHandler(event: any){
    console.log('deu boa');
  }

  OnFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.tecidoForm.patchValue({image: file});
  }
  
  submit() {
    if (this.tecidoForm.invalid){
      return;
    }
    console.log(this.tecidoForm.value);
    this.createHandler(this.tecidoForm.value);
  }


}
