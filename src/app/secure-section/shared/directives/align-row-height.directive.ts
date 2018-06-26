import { Directive, AfterContentChecked, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[eafAlignRowHeight]'
})
export class AlignRowHeightDirective implements OnInit, AfterContentChecked {
  headSide;
  bodySide;
  constructor(
    private elRef: ElementRef,
  ) { }

  ngOnInit() {
    // console.log('ngOnInit =>', this.elRef);
    this.headSide = this.elRef.nativeElement.children[0].children;
    this.bodySide = this.elRef.nativeElement.children[1].children;
    // console.log('headSide,bodySide =>', this.headSide, this.bodySide);
  }

  ngAfterContentChecked() {
    // console.log('ngAfterContentChecked =>', this.elRef);
    for (let i = 0; i < this.bodySide.length; i++) {
      this.headSide[i].style.height = this.bodySide[i].clientHeight + 'px';
    }
  }

}
