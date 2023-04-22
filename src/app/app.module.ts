import { NgModule, getNgModuleById } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CadastroFornecedorComponent } from './components/pages/cadastro-fornecedor/cadastro-fornecedor.component';
import { PesquisaFornecedorComponent } from './components/pages/pesquisa-fornecedor/pesquisa-fornecedor.component';
import { CadastroTecidoComponent } from './components/pages/cadastro-tecido/cadastro-tecido.component';
import { PesquisaTecidoComponent } from './components/pages/pesquisa-tecido/pesquisa-tecido.component';
import { MessageComponent } from './components/message/message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TecidoComponent } from './components/pages/tecido/tecido.component';
import { FornecedorComponent } from './components/pages/fornecedor/fornecedor.component';
import { EditTecidoComponent } from './components/pages/edit-tecido/edit-tecido.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    CadastroFornecedorComponent,
    PesquisaFornecedorComponent,
    CadastroTecidoComponent,
    PesquisaTecidoComponent,
    MessageComponent,
    TecidoComponent,
    FornecedorComponent,
    EditTecidoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
