import { ConsumerUnitCommand } from '../models/consumer-unit-command';
import { ConsumerUnitResponse } from './../models/consumer-unit-response';
import { ConsumerUnit } from './../models/consumer-unit';
import { host } from './shared';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumerUnitService {

  basePath: string = '/unidadeConsumidora'
  url: string = host + this.basePath;

  constructor(private httpClient: HttpClient) { }

  list() {
    return from(this.httpClient.get<ConsumerUnitResponse[]>(this.url));
  }

  show(id: number) {
    return this.httpClient.get<ConsumerUnitResponse>(
      // `http://localhost:3000/unidadeConsumidora/${id}`,
      this.url + '/' + id
    );
  }

  create(consumerUnit: ConsumerUnit) {
    return this.httpClient.post<ConsumerUnitResponse>(
      this.url,
      consumerUnit
    );
  }

  update(consumerUnitCmd: ConsumerUnitCommand) {
    return this.httpClient.put<ConsumerUnitCommand>(
      this.url + '/' + consumerUnitCmd.id,
      consumerUnitCmd
    );
  }

  delete(id: number) {
    return this.httpClient.delete<ConsumerUnitResponse>(
      this.url + '/' + id
    );
  }
}
