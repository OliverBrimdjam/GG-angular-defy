import { ConsumerUnitComand } from './../../models/consumer-unit-comand';
import { ConsumerUnitResponse } from './../../models/consumer-unit-response';
import { ConsumerUnitService } from './../../service/consumer-unit.service';
import { ConsumerUnit } from './../../models/consumer-unit';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

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
  consumerUnitCmd: ConsumerUnitComand = {
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
      this.consumerUnitResponse = data;
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
