import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appAction]'
})
export class ActionDirective {
  @Output() public appAction: EventEmitter<Event> = new EventEmitter();

  //recebe o evento de click
  @HostListener('click', ['$event'])
  public handleClick(event: Event): void {
    this.appAction.emit(event)
  }

  //recebe o evento de keyup
  @HostListener('keyup', ['$event'])
  public handleKeyUp(event: KeyboardEvent): void {
    this.appAction.emit(event)
  }
}
