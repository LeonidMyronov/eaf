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
  public calcCustomStylesSnippet: string[];
  private CALC_SCRIPT_ID = 'promo_calc_script';
  private CALC_CUSTOM_STYLES_ID = 'promo_calc_custom_styles';
  private CALC_CUSTOM_MEDIA_STYLES_ID = 'promo_calc_custom_media_styles';
  private CalcCustomStylesIDs = [this.CALC_CUSTOM_STYLES_ID, this.CALC_CUSTOM_MEDIA_STYLES_ID];
  constructor(
    private mainStorage: MainStorageService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.calcViews = this.mainStorage.getPromoCalcViews();
    this.calcColSchs = this.mainStorage.getPromoCalcColorSchemes();
    this.selectedcCalcColSch = this.calcColSchs[1];
    this.selectedCalcView = this.calcViews[0];
    this.addCalcOptionParamsObject();
    this.addCalcStyleSheet();
    // this.onSelectColSch(this.calcColSchs[1]);
    this.onSelectView(this.selectedCalcView);
    this.applyCalColSch();
  }

  onCopyToClipboard(value) {
    this.mainService.copyToClipboard(value)
      .then(resolve => console.log(`Text ${resolve} copied successefully`))
      .catch(error => console.log(`Error ${error} occured while copying text`));
  }

  onSelectView(calcView: PromoCalcView) {
    this.selectedCalcView = calcView;
    this.addCalcScripts();
    this.applyCalColSch();
  }

  onSelectColSch(colSch: PromoCalcColorScheme) {
    if (!colSch) { colSch = this.calcColSchs[1]; }
    if (colSch && colSch.id === this.selectedcCalcColSch.id) { return; }
    this.selectedcCalcColSch = colSch;
    this.applyCalColSch();
  }

  addCalcStyleSheet() {
    const element = document.createElement('link');
    element.type = 'text/css';
    element.rel = 'stylesheet';
    element.href = 'https://s3.amazonaws.com/genericapps/resources/calculators/styles.css';
    document.getElementsByTagName('head')[0].appendChild(element);
  }

  addCalcOptionParamsObject() {
    window['eduOptions'] = {
      'hostname': '99papers.com',
      'website_id': 432,
      'service_ids': '1674, 1675, 1673, 1690',
      'new_api': false,
      'segment_id': 'А',
      'no_stat': true,
      'email': false,
      'dsc': 'ESSAYFIRST5',
    };
  }

  addCalcScripts() {
    const el = document.getElementById('promo_calc_script');
    if (el) {
      document.getElementsByTagName('body')[0].removeChild(el);
    }
    const element = document.createElement('script');
    element.type = 'text/javascript';
    element.id = this.CALC_SCRIPT_ID;
    element.src = 'https://s3.amazonaws.com/genericapps/resources/calculators/bundle41.js';
    document.getElementsByTagName('body')[0].appendChild(element);
  }

  applyCalColSch() {
    this.calcCustomStylesSnippet = this.createStyleSnippet();
    this.CalcCustomStylesIDs.forEach((v, i) => {
      this.addCalcStyle(v, this.calcCustomStylesSnippet[i]);
    });
  }

  addCalcStyle(id: string, styleSnippet: string) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const els = document.getElementById(id);
    if (els) {
      head.removeChild(els);
    }
    const calcCustomStylesEl: HTMLStyleElement = document.createElement('style');
    calcCustomStylesEl.id = id;
    calcCustomStylesEl.type = 'text/css';
    calcCustomStylesEl.appendChild(document.createTextNode(styleSnippet));
    head.appendChild(calcCustomStylesEl);
  }

  createStyleSnippet(): string[] {
    let cssSnippet: string;
    let mediaSnippet: string;

    switch (this.selectedCalcView.name.toLowerCase()) {
      case 'big': {
        cssSnippet = `
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
          `;

        mediaSnippet = `
          .calc-lg-btn {
            pointer-events: none;
          }
          @media (max-width: 767px) {
            .calc-lg-container {
              max-width: 320px;
            }
            .cl-select-item {
              width: 96px;
              flex: none;
            }
            .service .cl-select-item:first-child {
              width: 98px;
              border-top-left-radius: 20px;
              border-bottom-left-radius: 0;
            }
            .service .cl-select-item:nth-child(2) {
              width: 98px;
              border-top-right-radius: 20px;
            }
            .service .cl-select-item:nth-child(3) {
              border-top-left-radius: 20px;
              border-bottom-left-radius: 20px;
            }
            .service .cl-select-item:nth-child(5) {
              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
            }
            .level5 .cl-select-item:first-child {
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
            }
            .level5 .cl-select-item:last-child {
                border-top-right-radius: 0;
                border-bottom-right-radius: 20px;
            }
            .level5 .cl-select-item:nth-child(3) {
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
            }
            .level5 .cl-select-item:nth-child(4) {
                border-top-left-radius: 0;
                border-bottom-left-radius: 20px;
            }
            .level4 .cl-select-item:first-child {
              border-top-left-radius: 20px;
              border-bottom-left-radius: 20px;
            }
            .level4 .cl-select-item:last-child {
                border-top-right-radius: 0;
                border-bottom-right-radius: 20px;
            }
            .level4 .cl-select-item:nth-child(3) {
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
            }
            .level4 .cl-select-item:nth-child(4) {
                border-top-left-radius: 0;
                border-bottom-left-radius: 20px;
            }
            .level2 .cl-select-item:first-child {
              border-top-left-radius: 20px;
              border-bottom-left-radius: 20px;
            }
            .level2 .cl-select-item:last-child {
              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
            }
            .calc-lg-btn {
              font-size: 16.1px;
              height: 56px;
            }
            .cl-counter-wrap {
              flex-direction: column;
            }
          }
        `;
        break;
      }
      case 'small': {
        break;
      }
      case 'table': {
        break;
      }
      case 'horizontal': {
        break;
      }
      default: {
        cssSnippet = mediaSnippet = '';
      }
    }
    return [cssSnippet, mediaSnippet];
  }

  ngOnDestroy() {
    const el = document.getElementById('promo_calc_script');
    document.getElementsByTagName('body')[0].removeChild(el);
  }
}
