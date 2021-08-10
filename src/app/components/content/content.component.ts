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



  constructor(private service: ConsumerUnitService) { }

  ngOnInit(): void {
    this.getConsumerUnitList();
  }

  getConsumerUnitList() {
    this.service.getConsumerUnit().toPromise().then(data => {
      this.consumerUnitsList = data;
    }).catch((err) => console.log(err));
  }

  postConsumerUnitList() {

    this.service.setConsumerUnit(this.consumerUnit).toPromise().then(
      (data: ConsumerUnitResponse) => {
        this.consumerUnitResponse = data;
        this.getConsumerUnitList();
        alert("adicionado com sucesso, ID da Unidade: " + this.consumerUnitResponse.id);
      }).catch((err) => console.log(err));
  }
}
