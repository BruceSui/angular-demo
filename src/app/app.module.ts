import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopupModule } from './popup/popup.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ImModule } from './im/im.module';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { MainComponent } from './layouts/main/main.component';
import { ErrorComponent } from './layouts/error/error.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ErrorComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PopupModule,
    CoreModule,
    SharedModule,
    ImModule,
    AdminModule,
    BootstrapModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
