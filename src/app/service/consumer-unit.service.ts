import { ConsumerUnitComand } from './../models/consumer-unit-comand';
import { ConsumerUnitResponse } from './../models/consumer-unit-response';
import { ConsumerUnit } from './../models/consumer-unit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsumerUnitService {

  constructor(private httpClient: HttpClient) { }

  getConsumerUnits() {
    return this.httpClient.get<any>(
      'http://localhost:3000/unidadeConsumidora'
    );
  }

  getConsumerUnit(id: number) {
    return this.httpClient.get<any>(
      `http://localhost:3000/unidadeConsumidora/${id}`,

    );
  }

  setConsumerUnit(consumerUnit: ConsumerUnit) {
    return this.httpClient.post<ConsumerUnitResponse>(
      "http://localhost:3000/unidadeConsumidora",
      consumerUnit
    );
  }

  updateConsumerUnit(consumerUnitCmd: ConsumerUnitComand) {
    return this.httpClient.put<ConsumerUnitComand>(
      `http://localhost:3000/unidadeConsumidora/${consumerUnitCmd.id}`,
      consumerUnitCmd
    );
  }

  deleteConsumerUnit(id: number) {
    return this.httpClient.delete<any>(
      `http://localhost:3000/unidadeConsumidora/${id}`
    );
  }
}
