import { InvoiceResponse } from './../../models/invoice-response';
import { InvoiceService } from './../../service/invoice.service';
import { ConsumerUnitCommand } from '../../models/consumer-unit-command';
import { ConsumerUnitResponse } from './../../models/consumer-unit-response';
import { ConsumerUnitService } from './../../service/consumer-unit.service';
import { ConsumerUnit } from './../../models/consumer-unit';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.2s ease-out',
              style({ height: 350, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 350, opacity: 1 }),
            animate('0.2s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})

export class InvoiceComponent implements OnInit {
  @Output()
  onSend = new EventEmitter<any>();

  foundConsumerUnitDisplay: boolean = false;
  updateDisplay: boolean = false;
  listDisplay: boolean = true;
  addDisplay: boolean = false;
  deleteDisplay: boolean = false;
  searchDisplay: boolean = false;

  invoicesList: InvoiceResponse[] = [];
  invoice: Invoice = {
    data_de_vencimento: '',
    consumo: undefined!,
    valor: undefined!,
    unidadeConsumidoraId: undefined!,
  };
  invoiceResponse: InvoiceResponse = {
    id: undefined!,
    data_de_vencimento: '',
    consumo: undefined!,
    valor: undefined!,
    unidadeConsumidoraId: undefined!,
  };
  invoiceCmd: InvoiceResponse = {
    id: undefined!,
    data_de_vencimento: '',
    consumo: undefined!,
    valor: undefined!,
    unidadeConsumidoraId: undefined!,
  };
  foundInvoicesList: InvoiceResponse[] = [];


  constructor(private service: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceCmd.id = undefined!;
    this.getConsumerUnitList();
  }

  sendData() {
    this.onSend.emit(this.invoicesList);
  }

  displaySwitcher(display: string) {
    this.addDisplay = false;
    this.updateDisplay = false;
    this.listDisplay = false;
    this.foundConsumerUnitDisplay = false;
    this.deleteDisplay = false;
    this.searchDisplay = false;

    switch (display) {
      case 'addDisplay':
        this.addDisplay = true;
        break;
      case 'updateDisplay':
        this.updateDisplay = true;
        break;
      case 'foundConsumerUnitDisplay':
        this.foundConsumerUnitDisplay = true;
        break;
      case 'deleteDisplay':
        this.deleteDisplay = true;
        break;
      case 'searchDisplay':
        this.searchDisplay = true;
        break;
      case 'listDisplay':
        this.listDisplay = true;
    }
  }

  switchSearchDisplay() {
    this.displaySwitcher('searchDisplay');
  }

  idMatchfilter({ id }: { id: any }) {
    let match;
    id == this.invoiceCmd.id ? match = true : match = false;

    return match;
  }

  ucMatchfilter({ unidadeConsumidoraId }: { unidadeConsumidoraId: any }) {
    let match;
    unidadeConsumidoraId == this.invoiceCmd.unidadeConsumidoraId ? match = true : match = false;

    return match;
  }

  valueMatchfilter({ valor }: { valor: any }) {
    let match;
    valor == this.invoiceCmd.valor ? match = true : match = false;

    return match;
  }

  dateMatchfilter({ data_de_vencimento }: { data_de_vencimento: any }) {
    let match;
    data_de_vencimento == this.invoiceCmd.data_de_vencimento ? match = true : match = false;

    return match;
  }

  resetToSTD() {
    this.invoice = {
      data_de_vencimento: '',
      consumo: undefined!,
      valor: undefined!,
      unidadeConsumidoraId: undefined!,
    };
    this.invoiceResponse = {
      id: undefined!,
      data_de_vencimento: '',
      consumo: undefined!,
      valor: undefined!,
      unidadeConsumidoraId: undefined!,
    };
    this.invoiceCmd = {
      id: undefined!,
      data_de_vencimento: '',
      consumo: undefined!,
      valor: undefined!,
      unidadeConsumidoraId: undefined!,
    };
  }

  getConsumerUnitList() {
    this.service.list().toPromise().then(data => {
      this.invoicesList = data;
      this.displaySwitcher('listDisplay');
    }).catch((err) => alert('Lista não encontrada: erro status ' + err.status));
  }

  getConsumerUnitByName() {
    if (!this.invoiceCmd.unidadeConsumidoraId) {
      alert("O campo Nome é obrigatório para esta busca.");
      return;
    }

    this.foundInvoicesList = this.invoicesList.filter((element) => this.ucMatchfilter(element));
    if (this.foundInvoicesList.length == 0) {
      alert('Nenhum resultado encontrado');
      this.displaySwitcher('searchDisplay');
      this.resetToSTD();
      return;
    }
    this.displaySwitcher('foundConsumerUnitDisplay');
    this.resetToSTD();
  }

  getConsumerUnitByDist() {
    if (!this.invoiceCmd.data_de_vencimento) {
      alert("O campo Nome é obrigatório para esta busca.");
      return;
    }

    this.foundInvoicesList = this.invoicesList.filter((element) => this.dateMatchfilter(element));
    if (this.foundInvoicesList.length == 0) {
      alert('Nenhum resultado encontrado');
      this.displaySwitcher('searchDisplay');
      this.resetToSTD();
      return;
    }
    this.displaySwitcher('foundConsumerUnitDisplay');
    this.resetToSTD();
  }

  getConsumerUnitByNumber() {
    if (!this.invoiceCmd.valor) {
      alert("O campo Número é obrigatório para esta busca.");
      return;
    }

    this.foundInvoicesList = this.invoicesList.filter((element) => this.valueMatchfilter(element));
    console.log(this.foundInvoicesList.length);
    if (this.foundInvoicesList.length == 0) {
      alert('Nenhum resultado encontrado');
      this.displaySwitcher('searchDisplay');
      this.resetToSTD();
      return;
    }
    this.displaySwitcher('foundConsumerUnitDisplay');
    this.resetToSTD();
  }

  getConsumerUnitById() {
    if (!this.invoiceCmd.id && this.invoiceCmd.id !== 0) {
      alert("O campo ID é obrigatório para esta busca.");
      return;
    }

    this.foundInvoicesList = this.invoicesList.filter((element) => this.idMatchfilter(element));
    if (this.foundInvoicesList.length == 0) {
      alert('Nenhum resultado encontrado');
      this.displaySwitcher('searchDisplay');
      this.resetToSTD();
      return;
    }
    this.displaySwitcher('foundConsumerUnitDisplay');
    this.resetToSTD();
  }

  postConsumerUnitList() {
    this.service.create(this.invoice).toPromise().then(
      (data: InvoiceResponse) => {
        this.invoiceResponse = data;
        this.getConsumerUnitList();
        alert("Adicionado com sucesso. ID da Unidade: " + this.invoiceResponse.id);
        this.resetToSTD();
      }).catch((err) => alert('Unidade não cadastrada: erro status ' + err.status));
  }

  putConsumerUnit() {
    if (!this.invoiceCmd.id && this.invoiceCmd.id !== 0) {
      alert("O campo ID é obrigatório para essa busca");
      return;
    }

    this.service.update(this.invoiceCmd).toPromise().then(
      (data: InvoiceResponse) => {
        this.invoiceResponse = data;
        this.getConsumerUnitList();
        alert("Unidade atualizada. ID da Unidade: " + this.invoiceResponse.id);
        this.resetToSTD();
      }).catch((err) => console.log(err));
  }

  delConsumerUnit() {
    if (!this.invoiceCmd.id && this.invoiceCmd.id !== 0) {
      alert("O campo ID é obrigatório para essa busca");
      return;
    }

    this.service.delete(this.invoiceCmd.id).toPromise().then(() => {
      alert("Unidade deletada. ID da unidade: " + this.invoiceCmd.id);
      this.getConsumerUnitList();
      this.resetToSTD();
    }).catch((err) => console.log(err));
  }

}
