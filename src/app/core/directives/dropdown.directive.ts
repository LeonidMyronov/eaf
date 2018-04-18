import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[eafDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.opened') class = false;
  constructor(
    private elRef: ElementRef
  ) { }

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    if (this.elRef.nativeElement.contains(event.target)) {
      this.class = !this.class;
    } else {
      if (this.class) {
        this.class = false;
      }
    }
  }
}
