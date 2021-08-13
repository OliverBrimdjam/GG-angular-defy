import { ConsumerUnitCommand } from '../models/consumer-unit-command';
import { ConsumerUnitResponse } from './../models/consumer-unit-response';
import { ConsumerUnit } from './../models/consumer-unit';
import { host } from './shared';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsumerUnitService {

  basePath: string = '/unidadeConsumidora'
  url: string = host + this.basePath;

  constructor(private httpClient: HttpClient) { }

  getConsumerUnits() {
    return this.httpClient.get<any>(
      this.url
    );
  }

  getConsumerUnit(id: number) {
    return this.httpClient.get<any>(
      // `http://localhost:3000/unidadeConsumidora/${id}`,
      this.url + '/' + id
    );
  }

  setConsumerUnit(consumerUnit: ConsumerUnit) {
    return this.httpClient.post<ConsumerUnitResponse>(
      this.url,
      consumerUnit
    );
  }

  updateConsumerUnit(consumerUnitCmd: ConsumerUnitCommand) {
    return this.httpClient.put<ConsumerUnitCommand>(
      this.url + '/' + consumerUnitCmd.id,
      consumerUnitCmd
    );
  }

  deleteConsumerUnit(id: number) {
    return this.httpClient.delete<any>(
      this.url + '/' + id
    );
  }
}
