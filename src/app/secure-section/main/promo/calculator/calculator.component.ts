import { Component, OnInit } from '@angular/core';

import { MainStorageService } from '../../../services/main-storage.service';
import { MainService } from '../../../services/main.service';

import { PromoCalcView, PromoCalcColorScheme } from '../../../store/main.model';

@Component({
  selector: 'eaf-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass']
})
export class CalculatorComponent implements OnInit {

  public calcViews: PromoCalcView[];
  public selectedCalcView: PromoCalcView;
  public calcColSchs: PromoCalcColorScheme[];
  public selectedcCalcColSch: PromoCalcColorScheme;
  constructor(
    private mainStorage: MainStorageService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.calcViews = this.mainStorage.getPromoCalcViews();
    this.selectedCalcView = this.calcViews[2];
    this.calcColSchs = this.mainStorage.getPromoCalcColorSchemes();
    this.selectedcCalcColSch = this.calcColSchs[1];
  }

  onSelectView(calcView: PromoCalcView) {
    this.selectedCalcView = calcView;
  }

  onSelectColSch(colSch: PromoCalcColorScheme) {
    this.selectedcCalcColSch = colSch;
  }

  generateSnippet() {}

  onCopyToClipboard(value) {
    this.mainService.copyToClipboard(value)
      .then(resolve => console.log(`Text ${resolve} copied successefully`))
      .catch(error => console.log(`Error ${error} occured while copying text`));
  }

}
