import { ConsumerUnitCommand } from '../../models/consumer-unit-command';
import { ConsumerUnitResponse } from './../../models/consumer-unit-response';
import { ConsumerUnitService } from './../../service/consumer-unit.service';
import { ConsumerUnit } from './../../models/consumer-unit';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Output()
  onSend = new EventEmitter<any>();
  onFind = new EventEmitter<any>();

  foundConsumerUnitDisplay: boolean = false;
  commandDisplay: boolean = false;
  listDisplay: boolean = true;
  addDisplay: boolean = false;

  consumerUnitsList: ConsumerUnitResponse[] = [];
  consumerUnit: ConsumerUnit = {
    endereco: '',
    distribuidora: '',
    nome: '',
    numero: '',
  };
  consumerUnitResponse: ConsumerUnitResponse = {
    id: 0,
    endereco: '',
    distribuidora: '',
    nome: '',
    numero: '',
  };
  consumerUnitCmd: ConsumerUnitCommand = {
    id: 0,
    endereco: '',
    distribuidora: '',
    nome: '',
    numero: '',
  };
  foundConsumerUnit: ConsumerUnitResponse = {
    id: 0,
    endereco: '',
    distribuidora: '',
    nome: '',
    numero: '',
  };




  constructor(private service: ConsumerUnitService) { }

  ngOnInit(): void {
    this.getConsumerUnitList();
  }

  sendData() {
    this.onSend.emit(this.consumerUnitsList);
  }

  findConsumerUnit() {
    this.onFind.emit();
  }

  switchCommandDisplay() {
    if (this.commandDisplay) {
      this.commandDisplay = false;
    } else {
      this.commandDisplay = true;
      this.addDisplay = false;
    }
  }

  switchAddDisplay() {
    if (this.addDisplay) {
      this.addDisplay = false;
    } else {
      this.addDisplay = true;
      this.commandDisplay = false;
    }
  }

  switchListDisplay() {
    if (this.listDisplay) {
      this.listDisplay = false;
    } else {
      this.listDisplay = true;
      this.foundConsumerUnitDisplay = false;
    }
  }

  switchFoundDisplay() {
    this.foundConsumerUnitDisplay ? this.foundConsumerUnitDisplay = false : this.foundConsumerUnitDisplay = true;
  }



  resetToSTD() {
    this.consumerUnit = {
      endereco: '',
      distribuidora: '',
      nome: '',
      numero: '',
    };
    this.consumerUnitResponse = {
      id: 0,
      endereco: '',
      distribuidora: '',
      nome: '',
      numero: '',
    };
    this.consumerUnitCmd = {
      id: 0,
      endereco: '',
      distribuidora: '',
      nome: '',
      numero: '',
    };
  }

  getConsumerUnitList() {
    this.service.getConsumerUnits().toPromise().then(data => {
      this.consumerUnitsList = data;
    }).catch((err) => console.log(err));
  }

  getConsumerUnit() {
    this.service.getConsumerUnit(this.consumerUnitCmd.id).toPromise().then((data) => {
      this.foundConsumerUnit = data;
      this.switchListDisplay();
      this.switchFoundDisplay()
      this.resetToSTD();
      //falta apagar consulta de lista e mostrar somente uma unidade
      //falta apagar os campos de consulta
    }).catch((err) => console.log(err));
  }

  postConsumerUnitList() {
    this.service.setConsumerUnit(this.consumerUnit).toPromise().then(
      (data: ConsumerUnitResponse) => {
        this.consumerUnitResponse = data;
        this.getConsumerUnitList();
        alert("Adicionado com sucesso. ID da Unidade: " + this.consumerUnitResponse.id);
        this.resetToSTD();
      }).catch((err) => console.log(err));
  }

  putConsumerUnit() {
    this.service.updateConsumerUnit(this.consumerUnitCmd).toPromise().then(
      (data: ConsumerUnitResponse) => {
        this.consumerUnitResponse = data;
        this.getConsumerUnitList();
        alert("Unidade atualizada. ID da Unidade: " + this.consumerUnitResponse.id);
        this.resetToSTD();
      }).catch((err) => console.log(err));
  }

  delConsumerUnit() {
    this.service.deleteConsumerUnit(this.consumerUnitCmd.id).toPromise().then(() => {
      alert("Unidade deletada. ID da unidade: " + this.consumerUnitCmd.id);
      this.getConsumerUnitList();
      this.resetToSTD();
    }).catch((err) => console.log(err));
  }
}
