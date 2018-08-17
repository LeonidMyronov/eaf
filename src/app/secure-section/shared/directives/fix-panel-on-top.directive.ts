import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[eafFixPanelOnTop]'
})
export class FixPanelOnTopDirective implements OnInit {
  scrollY;
  offsetTop;
  offsetWidth;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.offsetTop = this.elRef.nativeElement.offsetTop;
    this.offsetWidth = this.elRef.nativeElement.offsetWidth;
  }

  @HostListener('window:scroll', [])

  onWindowScroll() {
    if (window.scrollY >= this.offsetTop) {
      this.renderer.setStyle(this.elRef.nativeElement, 'position', 'fixed');
      this.renderer.setStyle(this.elRef.nativeElement, 'width', this.offsetWidth + 'px');
      this.renderer.setStyle(this.elRef.nativeElement, 'z-index', '500');
      this.renderer.setStyle(this.elRef.nativeElement, 'top', '0');
    }
    if (window.scrollY <= this.offsetTop) {
      this.renderer.setStyle(this.elRef.nativeElement, 'position', 'relative');
    }
  }
}
