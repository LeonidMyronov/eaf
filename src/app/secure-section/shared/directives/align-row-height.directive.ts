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
    console.log('headSide,bodySide =>', this.headSide, this.bodySide);
  }

  ngAfterContentChecked() {
    // align head column rows height of a table equally to body column rows
    for (let i = 0; i < this.bodySide.length; i++) {
      for (let j = 0; j < this.bodySide[i].children.length; j++) {
        // align table cell height equally to row height
        this.bodySide[i].children[j].style.height = this.bodySide[i].clientHeight + 'px';
      }
      this.headSide[i].style.height = this.bodySide[i].clientHeight + 'px';
      // align head table cell height equally to row height
      this.headSide[i].children[0].style.height = this.bodySide[i].clientHeight + 'px';
    }
  }

}
