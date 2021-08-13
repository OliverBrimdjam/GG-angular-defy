import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { UpperBannerComponent } from './components/upper-banner/upper-banner.component';
import { ContentComponent } from './components/content/content.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ConsumerUnitComponent } from './components/consumer-unit/consumer-unit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvoiceUnitComponent } from './components/invoice-unit/invoice-unit.component'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    UpperBannerComponent,
    ContentComponent,
    InvoiceComponent,
    ConsumerUnitComponent,
    InvoiceUnitComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
