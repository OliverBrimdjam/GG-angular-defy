import { ConsumerUnitCommand } from '../models/consumer-unit-command';
import { ConsumerUnitResponse } from './../models/consumer-unit-response';
import { ConsumerUnit } from './../models/consumer-unit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsumerUnitService {

  baseUrl: string = 'http://localhost:3000/unidadeConsumidora';

  constructor(private httpClient: HttpClient) { }

  getConsumerUnits() {
    return this.httpClient.get<any>(
      this.baseUrl
    );
  }

  getConsumerUnit(id: number) {
    return this.httpClient.get<any>(
      // `http://localhost:3000/unidadeConsumidora/${id}`,
      this.baseUrl + '/' + id

    );
  }

  setConsumerUnit(consumerUnit: ConsumerUnit) {
    return this.httpClient.post<ConsumerUnitResponse>(
      this.baseUrl,
      consumerUnit
    );
  }

  updateConsumerUnit(consumerUnitCmd: ConsumerUnitCommand) {
    return this.httpClient.put<ConsumerUnitCommand>(
      this.baseUrl + '/' + consumerUnitCmd.id,
      consumerUnitCmd
    );
  }

  deleteConsumerUnit(id: number) {
    return this.httpClient.delete<any>(
      this.baseUrl + '/' + id
    );
  }
}
