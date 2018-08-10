import { DiscountComponent } from './discount.component';
import { HelperService } from '../../../core/helper.service';
import { Store } from '@ngrx/store';

class Router {}
class ActivatedRoute {}

describe('Discount form Unit Tests:', () => {
  let component: DiscountComponent;
  let helper: HelperService;
  let store: Store<any>;
  let router: any;
  let route: any;

  beforeEach(() => {
    store = new Store(null, null, null);
    helper = new HelperService(store);
    router = new Router();
    route = new ActivatedRoute();
    component = new DiscountComponent(store, helper, router, route);
    component.initForm();
  });

  it('should create formGroup instance in discountForm property', () => {
    expect(component.discountForm).not.toBeUndefined();
  });

  it('should create Contact-form with 4 controls', () => {
    expect(component.discountForm.contains('name')).toBeTruthy();
    expect(component.discountForm.contains('proto')).toBeTruthy();
    expect(component.discountForm.contains('details')).toBeTruthy();
    expect(component.discountForm.contains('amount')).toBeTruthy();
  });

  it('should check NAME control as required field', () => {
    const control = component.discountForm.get('name');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should check AMOUNT control as required field', () => {
    const control = component.discountForm.get('amount');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should check DETAILS control as required field', () => {
    const control = component.discountForm.get('details');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should set discountForm to invalid if NAME field in empty', () => {
    const detailsControl = component.discountForm.get('details');
    const amountControl = component.discountForm.get('amount');

    amountControl.setValue('123');
    detailsControl.setValue('test details');

    expect(component.discountForm.valid).toBeFalsy();
  });

  it('should set discountForm to invalid if AMOUNT field in empty', () => {
    const detailsControl = component.discountForm.get('details');
    const nameControl = component.discountForm.get('name');

    nameControl.setValue('test name');
    detailsControl.setValue('test details');

    expect(component.discountForm.valid).toBeFalsy();
  });

  it('should set discountForm to invalid if DETAILS field in empty', () => {
    const nameControl = component.discountForm.get('name');
    const amountControl = component.discountForm.get('amount');

    amountControl.setValue('123');
    nameControl.setValue('test name');

    expect(component.discountForm.valid).toBeFalsy();
  });

  it('should set discountForm to valid if NAME, DETAILS, AMOUNT, PROTO fields are filled properly', () => {
    const nameControl = component.discountForm.get('name');
    const detailsControl = component.discountForm.get('details');
    const protoControl = component.discountForm.get('proto');
    const amountControl = component.discountForm.get('amount');


    nameControl.setValue('test name');
    detailsControl.setValue('test details');
    protoControl.setValue('https');
    amountControl.setValue('123');

    expect(component.discountForm.valid).toBeTruthy();
  });

});


