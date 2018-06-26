import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

import { MainService } from '../../services/main.service';
import { HelperService } from '../../../core/helper.service';

import * as fromRoot from '../../../app.reducers';
import * as fromMain from '../../store/main.reducer';
import * as MainActions from '../../store/main.actions';
import * as UIActions from '../../../ui/ui.actions';
import { Discounts } from '../../store/main.model';

@Component({
  selector: 'eaf-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.sass']
})
export class DiscountComponent implements OnInit, OnDestroy {
  discountForm: FormGroup;
  discountsData: Discounts;
  isRequestSubmitted = false;

  private subs: Subscription[] = [];

  constructor(
    private store: Store<fromMain.MainState>,
    private mainService: MainService,
    private helper: HelperService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(fromMain.getDiscounts)
      .subscribe((response: Discounts) => {
        if (!response.visitorsLastMonth) {
          this.mainService.fetchDiscountIntro();
        } else {
          this.discountsData = response;
        }
      })
    );
    this.initForm();
  }

  initForm() {
    this.discountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      proto: new FormControl('http'),
      amount: new FormControl('', Validators.required),
      details: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.isRequestSubmitted = true;
    this.store.dispatch(new UIActions.IsLoading(true));
    this.helper.preventBodyToScroll(true);
    this.store.dispatch(new MainActions.DoDiscountRequest(this.discountForm.value));
    this.subs.push(
      this.store.select(fromRoot.getEraseFormState)
      .subscribe(response => {
        if (response === 'DiscountRequest is sent successefully') {
          this.router.navigate(['details'], {relativeTo: this.route});
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
