import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedorInterface } from 'src/app/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-fornecedor',
  templateUrl: './edit-fornecedor.component.html',
  styleUrls: ['./edit-fornecedor.component.css']
})
export class EditFornecedorComponent implements OnInit{


  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    ){}

    get nome() {
      return this.fornecedorForm.get('nome')!;
    }
    get gramatura() {
      return this.fornecedorForm.get('gramatura')!;
    }
    get rendimento() {
      return this.fornecedorForm.get('rendimento')!;
    }
    get prazo() {
      return this.fornecedorForm.get('prazo')!;
    }
    get avista() {
      return this.fornecedorForm.get('avista')!;
    }

  fornecedor!: FornecedorInterface;
  btnText: string = 'Editar';
  fornecedorData: FornecedorInterface | null = null;
  fornecedorForm!: FormGroup;

  ngOnInit(): void {
    this.fornecedorForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      telefone: new FormControl(''),
      whatsapp: new FormControl(''),
      endereco: new FormControl(''),
      site: new FormControl(''),
      image: new FormControl(''),
    });
  
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.fornecedorService.getFornecedor(id).subscribe((item) => {
      this.fornecedorData = item.data;
      this.fornecedorForm.patchValue({nome: this.fornecedorData?.nome});
      this.fornecedorForm.patchValue({email: this.fornecedorData?.email});
      this.fornecedorForm.patchValue({telefone: this.fornecedorData?.telefone});
      this.fornecedorForm.patchValue({whatsapp: this.fornecedorData?.whatsapp});
      this.fornecedorForm.patchValue({endereco: this.fornecedorData?.endereco});
      this.fornecedorForm.patchValue({site: this.fornecedorData?.site});
      this.fornecedorForm.patchValue({image: this.fornecedorData?.image});
    });
  
  this.fornecedorService.getFornecedor(id).subscribe((item) => {
    this.fornecedor = item.data;
  });

}
  

  OnFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fornecedorForm.patchValue({image: file});
  }
  
  submit() {
    if (this.fornecedorForm.invalid){
      return;
    }
    console.log(this.fornecedorForm.value);
    this.editHandler(this.fornecedorForm.value);
  }

  async editHandler(fornecedor: FornecedorInterface){
    const id = this.fornecedor.id

    const formData = new FormData()

    formData.append("nome", fornecedor.nome);
    if (fornecedor.email){formData.append("composicao", fornecedor.email);}
    if (fornecedor.image){formData.append("image", fornecedor.image);}
    if (fornecedor.telefone){formData.append("gramatura", String(fornecedor.telefone));}
    if (fornecedor.whatsapp){formData.append("rendimento", String(fornecedor.whatsapp));}
    if (fornecedor.endereco){formData.append("acabamento", String(fornecedor.endereco));}
    if (fornecedor.site){formData.append("referencia", String(fornecedor.site));}
 
    await this.fornecedorService.updateFornecedor(id!, formData).subscribe();
    this.messageService.add(`fornecedor ${id} atualizado com sucesso!`);
    this.router.navigate(['/']);
  }
}