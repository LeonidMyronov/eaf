import { Directive, ElementRef, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[eafSelectRowOnHover]'
})
export class SelectRowOnHoverDirective implements OnInit {
  bgColor;
  childCells;
  @Input() defaultColor: string;
  @Input() hoverColor: string;
  constructor(
    private elRef: ElementRef,
  ) { }

  ngOnInit() {
    this.bgColor = this.defaultColor;
    this.childCells = this.elRef.nativeElement.children;
  }

  @HostListener('mouseenter', ['$event']) mouseover(event: Event) {
    this.bgColor = this.hoverColor;
    this.changeCellBgColor(this.bgColor);
  }

  @HostListener('mouseleave', ['$event']) mouseleave(event: Event) {
    this.bgColor = this.defaultColor;
    this.changeCellBgColor(this.bgColor);
  }

  changeCellBgColor(color: string) {
    for (let i = 0; i < this.childCells.length; i++) {
      this.childCells[i].style.backgroundColor = this.bgColor;
    }
  }

}
