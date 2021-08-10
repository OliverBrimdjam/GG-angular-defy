import { ConsumerUnitResponse } from './../models/consumer-unit-response';
import { ConsumerUnit } from './../models/consumer-unit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumerUnitService {

  constructor(private httpClient: HttpClient) { }

  getConsumerUnit() {
    return this.httpClient.get<any>('http://localhost:3000/unidadeConsumidora');
  }

  setConsumerUnit(consumerUnit: ConsumerUnit) {
    return this.httpClient.post<ConsumerUnitResponse>("http://localhost:3000/unidadeConsumidora", consumerUnit);
  }

  updateConsumerUnit() {

  }

  deleteConsumerUnit() {

  }
}
