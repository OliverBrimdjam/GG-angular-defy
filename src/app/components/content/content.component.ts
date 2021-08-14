import { ConsumerUnitCommand } from '../../models/consumer-unit-command';
import { ConsumerUnitResponse } from './../../models/consumer-unit-response';
import { ConsumerUnitService } from './../../service/consumer-unit.service';
import { ConsumerUnit } from './../../models/consumer-unit';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
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
export class ContentComponent implements OnInit {

  @Output()
  onSend = new EventEmitter<any>();

  foundConsumerUnitDisplay: boolean = false;
  updateDisplay: boolean = false;
  listDisplay: boolean = true;
  addDisplay: boolean = false;
  deleteDisplay: boolean = false;
  searchDisplay: boolean = false;

  consumerUnitsList: ConsumerUnitResponse[] = [];
  consumerUnitsList$: Observable<any> = this.service.list();
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
  foundConsumerUnitList: ConsumerUnitResponse[] = [];


  constructor(private service: ConsumerUnitService) { }

  ngOnInit(): void {
    this.consumerUnitCmd.id = undefined!;
    console.table(this.service.list());
    this.getConsumerUnitList();
    // this.consumerUnitsList$ = this.service.list().pipe(tap(v => console.log(v))).subscribe();
  }

  sendData() {
    this.onSend.emit(this.consumerUnitsList);
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

  idMatchfilter({ id }: { id: any }) {
    let match;
    id == this.consumerUnitCmd.id ? match = true : match = false;

    return match;
  }

  nameMatchfilter({ nome }: { nome: any }) {
    let match;
    nome == this.consumerUnitCmd.nome ? match = true : match = false;

    return match;
  }

  numberMatchfilter({ numero }: { numero: any }) {
    let match;
    numero == this.consumerUnitCmd.numero ? match = true : match = false;

    return match;
  }

  distMatchfilter({ distribuidora }: { distribuidora: any }) {
    let match;
    distribuidora == this.consumerUnitCmd.distribuidora ? match = true : match = false;

    return match;
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
      id: undefined!,
      endereco: '',
      distribuidora: '',
      nome: '',
      numero: '',
    };
  }

  getConsumerUnitList() {
    this.service.list().subscribe((data) => {
      this.consumerUnitsList$ = data;

    });
    this.displaySwitcher('listDisplay');
    // -----------------
    // this.service.list().toPromise().then(data => {
    //   this.consumerUnitsList$ = data;
    //   console.log('retorno da promise');
    //   console.log(data);
    //   this.displaySwitcher('listDisplay');
    // }).catch((err) => alert('Lista não encontrada: erro status ' + err.status));
  }

  getConsumerUnitByName() {
    if (!this.consumerUnitCmd.nome) {
      alert("O campo Nome é obrigatório para esta busca.");
      return;
    }

    this.foundConsumerUnitList = this.consumerUnitsList.filter((element) => this.nameMatchfilter(element));
    if (this.foundConsumerUnitList.length == 0) {
      alert('Nenhum resultado encontrado');
      this.displaySwitcher('searchDisplay');
      this.resetToSTD();
      return;
    }
    this.displaySwitcher('foundConsumerUnitDisplay');
    this.resetToSTD();
  }

  getConsumerUnitByDist() {
    if (!this.consumerUnitCmd.distribuidora) {
      alert("O campo Nome é obrigatório para esta busca.");
      return;
    }

    this.foundConsumerUnitList = this.consumerUnitsList.filter((element) => this.distMatchfilter(element));
    if (this.foundConsumerUnitList.length == 0) {
      alert('Nenhum resultado encontrado');
      this.displaySwitcher('searchDisplay');
      this.resetToSTD();
      return;
    }
    this.displaySwitcher('foundConsumerUnitDisplay');
    this.resetToSTD();
  }

  getConsumerUnitByNumber() {
    if (!this.consumerUnitCmd.numero) {
      alert("O campo Número é obrigatório para esta busca.");
      return;
    }

    this.foundConsumerUnitList = this.consumerUnitsList.filter((element) => this.numberMatchfilter(element));
    console.log(this.foundConsumerUnitList.length);
    if (this.foundConsumerUnitList.length == 0) {
      alert('Nenhum resultado encontrado');
      this.displaySwitcher('searchDisplay');
      this.resetToSTD();
      return;
    }
    this.displaySwitcher('foundConsumerUnitDisplay');
    this.resetToSTD();
  }

  getConsumerUnitById() {
    if (!this.consumerUnitCmd.id && this.consumerUnitCmd.id !== 0) {
      alert("O campo ID é obrigatório para esta busca.");
      return;
    }

    this.foundConsumerUnitList = this.consumerUnitsList.filter((element) => this.idMatchfilter(element));
    if (this.foundConsumerUnitList.length == 0) {
      alert('Nenhum resultado encontrado');
      this.displaySwitcher('searchDisplay');
      this.resetToSTD();
      return;
    }
    this.displaySwitcher('foundConsumerUnitDisplay');
    this.resetToSTD();

    // this.service.getConsumerUnit(this.consumerUnitCmd.id).toPromise().then((data) => {
    //   this.foundConsumerUnitList = data;
    //   this.listDisplay = false;
    //   this.switchFoundDisplay();
    //   this.resetToSTD();
    // }).catch((err) => alert('Unidade não encontrada: erro status ' + err.status));
  }

  postConsumerUnitList() {
    this.service.create(this.consumerUnit).toPromise().then(
      (data: ConsumerUnitResponse) => {
        this.consumerUnitResponse = data;
        this.getConsumerUnitList();
        alert("Adicionado com sucesso. ID da Unidade: " + this.consumerUnitResponse.id);
        this.resetToSTD();
      }).catch((err) => alert('Unidade não cadastrada: erro status ' + err.status));
  }

  putConsumerUnit() {
    if (!this.consumerUnitCmd.id && this.consumerUnitCmd.id !== 0) {
      alert("O campo ID é obrigatório para essa busca");
      return;
    }

    this.service.update(this.consumerUnitCmd).toPromise().then(
      (data: ConsumerUnitResponse) => {
        this.consumerUnitResponse = data;
        this.getConsumerUnitList();
        alert("Unidade atualizada. ID da Unidade: " + this.consumerUnitResponse.id);
        this.resetToSTD();
      }).catch((err) => console.log(err));
  }

  delConsumerUnit() {
    if (!this.consumerUnitCmd.id && this.consumerUnitCmd.id !== 0) {
      alert("O campo ID é obrigatório para essa busca");
      return;
    }

    this.service.delete(this.consumerUnitCmd.id).toPromise().then(() => {
      alert("Unidade deletada. ID da unidade: " + this.consumerUnitCmd.id);
      this.getConsumerUnitList();
      this.resetToSTD();
    }).catch((err) => console.log(err));
  }
}
