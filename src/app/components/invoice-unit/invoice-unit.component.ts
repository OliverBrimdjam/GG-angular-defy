import { InvoiceResponse } from './../../models/invoice-response';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-unit',
  templateUrl: './invoice-unit.component.html',
  styleUrls: ['./invoice-unit.component.scss']
})
export class InvoiceUnitComponent implements OnInit {
  @Input()
  invoice: InvoiceResponse = {
    id: undefined!,
    data_de_vencimento: '',
    consumo: undefined!,
    valor: undefined!,
    unidadeConsumidoraId: undefined!,
  };

  data: any = [];
  invoiceDisplay: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const chaves = Object.keys(this.invoice);
    const valores = Object.values(this.invoice);

    for (let i = 0; i < chaves.length; i++) {
      const dataObject: any = {};
      dataObject.label = chaves[i];
      dataObject.value = valores[i];

      this.data.push(dataObject);
    }
  }

  switchInvoiceDisplay() {
    const faturas = this.data.find((chave: any) => chave.label === 'faturas') || [];

    if (faturas.length === 0) {
      alert("Não existem faturas associadas a esta Unidade Consumidora");
    } else {
      this.invoiceDisplay ? this.invoiceDisplay = false : this.invoiceDisplay = true;
    }
  };
}
