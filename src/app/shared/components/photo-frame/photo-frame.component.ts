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
    //transforma o botão em um observable
    //coloco um atraso de 500 milisegundos
    //digo que quero ficar observando até acontencer a desinscrição
    //quando é clicado me inscrevo e emito o evento de liked
    this.debouceSubject
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.liked.emit())
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete()
  }

  public like(): void {
    this.debouceSubject.next()
  }
}
