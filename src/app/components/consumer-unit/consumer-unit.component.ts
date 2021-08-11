import { ConsumerUnitResponse } from './../../models/consumer-unit-response';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumer-unit',
  templateUrl: './consumer-unit.component.html',
  styleUrls: ['./consumer-unit.component.scss']
})
export class ConsumerUnitComponent implements OnInit {

  @Input()
  consumerUnit: ConsumerUnitResponse = {
    id: 0,
    endereco: '',
    distribuidora: '',
    nome: '',
    numero: '',
  };

  data: any = [];
  invoiceDisplay: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const chaves = Object.keys(this.consumerUnit);
    const valores = Object.values(this.consumerUnit);

    for (let i = 0; i < chaves.length; i++) {
      const dataObject: any = {};
      dataObject.label = chaves[i];
      dataObject.value = valores[i];

      this.data.push(dataObject);
    }
  }

  switchInvoiceDisplay() {
    if (this.data[5] == undefined) {
      alert("Não existem faturas associadas a esta Unidade Consumidora");
    } else if (this.data[5].label == 'faturas') {
      this.invoiceDisplay ? this.invoiceDisplay = false : this.invoiceDisplay = true;
    }
  };

}
