import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit, OnDestroy {
  @Input() description = '';
  @Input() src = '';
  @Input() likes = 0;

  @Output() liked: EventEmitter<void> = new EventEmitter();

  private debouceSubject: Subject<void> = new Subject();
  private unsubscribe: Subject<void> = new Subject();

  constructor() {}

  ngOnInit(): void {

    //dobouce é um atraso que coloquei no botão de like para
    //o mesmo não seja clicado inumeras vezes seguidas
    //com esta estrategia eu coloco um atraso de click no botão
    this.debouceSubject
      //#region asObservable
      //Cria um novo Observable com este Subject como fonte.
      //Você pode fazer isso para criar uma lógica personalizada
      //do lado do Observador do Subject e ocultá-la do código que usa o Observable.
      //#endregion asObservable
      .asObservable()
      .pipe(debounceTime(500))           //coloco um atraso de 500 milisegundos
      .pipe(takeUntil(this.unsubscribe)) //digo que quero ficar observando até acontencer a desinscrição
      .subscribe(() => this.liked.emit())//inscrevo e emito o evento de liked
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete()
  }

  public like(): void {
    this.debouceSubject.next()
  }
}
