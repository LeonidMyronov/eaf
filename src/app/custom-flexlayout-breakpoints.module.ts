import {NgModule} from '@angular/core';
import {DEFAULT_BREAKPOINTS, BreakPoint, BREAKPOINTS, validateSuffixes} from '@angular/flex-layout';

/**
 * For mobile and tablet, reset ranges
 */
function updateBreakpoints(bp: BreakPoint) {
  switch (bp.alias) {
    case 'xs' : bp.mediaQuery =  '(max-width: 767px)';   break;
    case 'sm' : bp.mediaQuery =  '(min-width: 768px) and (max-width: 1023px)'; break;
    case 'md' : bp.mediaQuery =  '(min-width: 1024px) and (max-width: 1399px)'; break;
    case 'lg' : bp.mediaQuery =  '(min-width: 1400px) and (max-width: 1919px)'; break;

    case 'lt-sm' : bp.mediaQuery =  '(max-width: 767px)'; break;
    case 'lt-md' : bp.mediaQuery =  '(max-width: 1023px)'; break;
    case 'lt-lg' : bp.mediaQuery =  '(max-width: 1399px)'; break;

    case 'gt-xs' : bp.mediaQuery =  '(min-width: 768px)';   break;
    case 'gt-sm' : bp.mediaQuery =  '(min-width: 1024px)'; break;
    case 'gt-md' : bp.mediaQuery =  '(min-width: 1400px)'; break;
  }
  return bp;
}

@NgModule({
  providers: [
    // register a Custom BREAKPOINT Provider
    {
      provide: BREAKPOINTS,
      useFactory: function customizeBreakPoints() {
        return validateSuffixes(DEFAULT_BREAKPOINTS.map(updateBreakpoints));
      }
    }
  ]
})
export class CustomFlexLayoutBreakPointsModule {}
