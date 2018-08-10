import { BalanceComponent } from './balance.component';
import { HelperService } from '../../../core/helper.service';
import { Store } from '@ngrx/store';
import { MainStorageService } from '../../services/main-storage.service';

describe('Balance form Unit Tests:', () => {
  let component: BalanceComponent;
  let helper: HelperService;
  let mainStorage: MainStorageService;
  let store: Store<any>;

  beforeEach(() => {
    store = new Store(null, null, null);
    helper = new HelperService(store);
    mainStorage = new MainStorageService();
    component = new BalanceComponent(store, mainStorage, helper);
    component.initForm();
  });

  it('should create formGroup instance in balanceForm property', () => {
    expect(component.balanceForm).not.toBeUndefined();
  });

  it('should create Contact-form with 4 controls', () => {
    expect(component.balanceForm.contains('amount')).toBeTruthy();
    expect(component.balanceForm.contains('details')).toBeTruthy();
    expect(component.balanceForm.contains('payment')).toBeTruthy();
    expect(component.balanceForm.contains('regular')).toBeTruthy();
  });

  it('should check AMOUNT control as required field', () => {
    const control = component.balanceForm.get('amount');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should set AMOUNT-control to pattern-error if AMOUNT-control value type is not a number', () => {
    const control = component.balanceForm.get('amount');
    const pattern = /\D/;

    control.setValue('aaa');
    expect(control.value.match(pattern)).toBeTruthy();
  });

  it('should set AMOUNT-control to valid if AMOUNT-control value type is a number', () => {
    const control = component.balanceForm.get('amount');
    const pattern = /\D/;

    control.setValue('123');
    expect(control.value.match(pattern)).toBeFalsy();
  });

  it('should set balanceForm to invalid if AMOUNT field in empty', () => {
    const control = component.balanceForm.get('amount');

    control.setValue('');

    expect(component.balanceForm.valid).toBeFalsy();
  });

  it('should set balanceForm to valid if AMOUNT, DETAILS, PAYMENT, REGULAR fields are filled properly', () => {
    const amountControl = component.balanceForm.get('amount');
    const detailsControl = component.balanceForm.get('details');
    const paymentControl = component.balanceForm.get('payment');
    const regularControl = component.balanceForm.get('regular');

    amountControl.setValue('123');
    detailsControl.setValue('test details');
    paymentControl.setValue('1');
    regularControl.setValue(true);

    expect(component.balanceForm.valid).toBeTruthy();
  });

});


