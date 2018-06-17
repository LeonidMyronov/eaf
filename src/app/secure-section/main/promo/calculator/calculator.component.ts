import { Component, OnInit, OnDestroy } from '@angular/core';

import { MainStorageService } from '../../../services/main-storage.service';
import { MainService } from '../../../services/main.service';

import { PromoCalcView, PromoCalcColorScheme } from '../../../store/main.model';

@Component({
  selector: 'eaf-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass']
})
export class CalculatorComponent implements OnInit, OnDestroy {

  public calcViews: PromoCalcView[];
  public selectedCalcView: PromoCalcView;
  public calcColSchs: PromoCalcColorScheme[];
  public selectedcCalcColSch: PromoCalcColorScheme;
  public calcCustomStylesSnippet: string;
  private CALC_SCRIPT_ID = 'promo_calc_script';
  private CALC_CUSTOM_STYLES_ID = 'promo_calc_custom_styles';
  constructor(
    private mainStorage: MainStorageService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.addCalcStyleSheet();
    this.addCalcScripts();
    this.calcViews = this.mainStorage.getPromoCalcViews();
    this.selectedCalcView = this.calcViews[2];
    this.calcColSchs = this.mainStorage.getPromoCalcColorSchemes();
    this.selectedcCalcColSch = this.calcColSchs[1];
    this.applyCalColSch();
  }

  onSelectView(calcView: PromoCalcView) {
    this.selectedCalcView = calcView;

    // TODO remove previous style.id = CALC_CUSTOM_STYLES_ID
  }

  onSelectColSch(colSch: PromoCalcColorScheme) {
    this.selectedcCalcColSch = colSch;
    this.applyCalColSch();
  }

  onCopyToClipboard(value) {
    this.mainService.copyToClipboard(value)
      .then(resolve => console.log(`Text ${resolve} copied successefully`))
      .catch(error => console.log(`Error ${error} occured while copying text`));
  }

  addCalcStyleSheet() {
    const element = document.createElement('link');
    element.type = 'text/css';
    element.rel = 'stylesheet';
    // element.href = 'assets/calculator.css';
    element.href = 'https://s3.amazonaws.com/genericapps/resources/calculators/styles.css';
    document.getElementsByTagName('head')[0].appendChild(element);
  }

  addCalcScripts() {
    window['eduOptions'] = {
      'hostname': '99papers.com',
      'website_id': 432,
      'service_ids': '1674, 1675, 1673, 1690',
      'new_api': false,
      // 'apiMode': 'M',
      'segment_id': 'А',
      'no_stat': true,
      'email': false,
      'dsc': 'ESSAYFIRST5',
    };
    const element = document.createElement('script');
    element.type = 'text/javascript';
    element.id = this.CALC_SCRIPT_ID;
    element.src = 'https://s3.amazonaws.com/genericapps/resources/calculators/bundle41.js';
    document.getElementsByTagName('body')[0].appendChild(element);
  }

  applyCalColSch() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const el = document.getElementById(this.CALC_CUSTOM_STYLES_ID);
    if (el) {
      head.removeChild(el);
    }
    this.calcCustomStylesSnippet = this.createStyleSnippet();
    const calcCustomStylesEl: HTMLStyleElement = document.createElement('style');

    calcCustomStylesEl.id = this.CALC_CUSTOM_STYLES_ID;
    calcCustomStylesEl.type = 'text/css';
    calcCustomStylesEl.appendChild(document.createTextNode(this.calcCustomStylesSnippet));
    head.appendChild(calcCustomStylesEl);
  }

  createStyleSnippet(): string {
    const css = `
      .${this.selectedCalcView.calcClass}, .calc-lg-btn--qoute, .cl-counter-btn--plus, .cl-counter-btn--minus {
          background-color: ${this.selectedcCalcColSch.colors[0].color};
      }
      .cl-counter-btn--plus, .cl-counter-btn--minus {
        border-color: ${this.selectedcCalcColSch.colors[0].color};
      }
      .cl-select-item.active, .cl-range-popup, .cl-range-item__circle, .cl-range-item:after, .cl-range-item:before, .cl-counter, .cl-range-item.active:after, .cl-select-single {
        background-color: ${this.selectedcCalcColSch.colors[1].color};
      }
      .cl-select-item, .cl-single-price__value, .cl-dropdown-wrap {
        border-color: ${this.selectedcCalcColSch.colors[1].color};
      }
      .cl-search-wrap {
        border-bottom-color: ${this.selectedcCalcColSch.colors[1].color};
      }
      .cl-range-popup:after, .cl-range-item:first-child .cl-range-popup:after, .cl-range-item:last-child .cl-range-popup:after {
        border-top-color: ${this.selectedcCalcColSch.colors[1].color};
      }
      .cl-counter-btn--plus span:after, .cl-counter-btn--plus span:before, .cl-counter-btn--minus span:after {
        background-color: ${this.selectedcCalcColSch.colors[1].color};
      }
      .cl-title, .cl-select-title, .cl-single-price__title, .cl-single-price__value {
        color: ${this.selectedcCalcColSch.colors[2].color};
      }
      .active .cl-range-item__circle, .checked .cl-range-item__circle, .cl-range-item.active:before, .cl-range-item.checked:after, .cl-range-item.checked:before, .cl-dropdown::-webkit-scrollbar-thumb {
        background-color: ${this.selectedcCalcColSch.colors[2].color};
      }
      .cl-select-item, .cl-price-title, .cl-price, .cl-price--currency, .calc-lg-btn, .cl-search, .cl-dropdown__item {
        color: ${this.selectedcCalcColSch.colors[3].color};
      }
      .calc-lg-btn--qoute {
        border-color: ${this.selectedcCalcColSch.colors[3].color};
      }
      .calc-lg-btn--order {
        background-color: ${this.selectedcCalcColSch.colors[4].color};
      }
      .cl-search:hover {
        background-color: initial
      }
      .cl-search::-webkit-input-placeholder {
        color: ${this.selectedcCalcColSch.colors[3].color};
        opacity: 1
      }

      .cl-search:-moz-placeholder {
        color: ${this.selectedcCalcColSch.colors[3].color};
        opacity: 1
      }

      .cl-search::-moz-placeholder {
        color: ${this.selectedcCalcColSch.colors[3].color};
        opacity: 1
      }

      .cl-search:-ms-input-placeholder {
        color: ${this.selectedcCalcColSch.colors[3].color};
        opacity: 1
      }
      .calc-lg-btn {
        pointer-events: none;
      }
      @media (max-width: 767px) {
        .calc-lg-container {
          max-width: 320px;
        }
      }
    `;
    return css;
  }

  ngOnDestroy() {
    const el = document.getElementById('promo_calc_script');
    document.getElementsByTagName('body')[0].removeChild(el);
  }
}
