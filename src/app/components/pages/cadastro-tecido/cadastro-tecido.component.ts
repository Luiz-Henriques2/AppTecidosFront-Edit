import { Component, OnInit, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-tecido',
  templateUrl: './cadastro-tecido.component.html',
  styleUrls: ['./cadastro-tecido.component.css']
})
export class CadastroTecidoComponent {
  btnText = 'Cadastrar';
  tecidoForm!: FormGroup;

  ngOnInit(): void{
    this.tecidoForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      //description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  get title() {
    return this.tecidoForm.get('title')!;
  }

  //get description() {
  //  return this.tecidoForm.get('description')!;
  //}

  OnFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.tecidoForm.patchValue({image: file});
  }
  submit() {
    if (this.tecidoForm.invalid){
      return;
    }
    
    console.log(this.tecidoForm.value);
  }
}
