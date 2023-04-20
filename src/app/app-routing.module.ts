import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CadastroFornecedorComponent } from './components/pages/cadastro-fornecedor/cadastro-fornecedor.component';
import { CadastroTecidoComponent } from './components/pages/cadastro-tecido/cadastro-tecido.component';
import { PesquisaFornecedorComponent } from './components/pages/pesquisa-fornecedor/pesquisa-fornecedor.component';
import { PesquisaTecidoComponent } from './components/pages/pesquisa-tecido/pesquisa-tecido.component';
import { TecidoComponent } from './components/pages/tecido/tecido.component';
import { FornecedorComponent } from './components/pages/fornecedor/fornecedor.component';
import { EditTecidoComponent } from './components/pages/edit-tecido/edit-tecido.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'cadastro/fornecedor', component: CadastroFornecedorComponent},
  {path: 'cadastro/tecido', component: CadastroTecidoComponent},
  {path: 'pesquisa/fornecedor', component: PesquisaFornecedorComponent},
  {path: 'pesquisa/tecido', component: PesquisaTecidoComponent},
  {path: 'pesquisa/tecido/:id', component: TecidoComponent},
  {path: 'pesquisa/fornecedor/:id', component: FornecedorComponent},
  {path: 'tecido/edit/:id', component: EditTecidoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
