import { DiscountDetailsComponent } from './discount-details.component';
import { HelperService } from '../../../core/helper.service';
import { Store } from '@ngrx/store';
import { AppStorageService } from '../../../core/app-storage.service';

describe('DiscountDetails form Unit Tests:', () => {
  let component: DiscountDetailsComponent;
  let helper: HelperService;
  let store: Store<any>;
  let appStorage: AppStorageService;

  beforeEach(() => {
    store = new Store(null, null, null);
    helper = new HelperService(store);
    appStorage = new AppStorageService();
    component = new DiscountDetailsComponent(store, appStorage, helper);
    component.sitesArr = [];
    component.initForm();
  });

  it('should create formGroup instance in discountGeneratorForm property', () => {
    expect(component.discountGeneratorForm).not.toBeUndefined();
  });

  it('should create Contact-form with 6 controls', () => {
    expect(component.discountGeneratorForm.contains('site')).toBeTruthy();
    expect(component.discountGeneratorForm.contains('code')).toBeTruthy();
    expect(component.discountGeneratorForm.contains('group')).toBeTruthy();
    expect(component.discountGeneratorForm.contains('term')).toBeTruthy();
    expect(component.discountGeneratorForm.contains('discountRange')).toBeTruthy();
    expect(component.discountGeneratorForm.contains('discountValue')).toBeTruthy();
  });

  it('should check CODE control as required field', () => {
    const control = component.discountGeneratorForm.get('code');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should check GROUP control as required field', () => {
    const control = component.discountGeneratorForm.get('group');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should set discountGeneratorForm to invalid if GROUP field in empty', () => {
    const control = component.discountGeneratorForm.get('code');

    control.setValue('test code');

    expect(component.discountGeneratorForm.valid).toBeFalsy();
  });

  it('should set discountGeneratorForm to invalid if CODE field in empty', () => {
    const control = component.discountGeneratorForm.get('group');

    control.setValue('test group');

    expect(component.discountGeneratorForm.valid).toBeFalsy();
  });

  it('should set discountGeneratorForm to valid if CODE, GROUP fields are filled properly', () => {
    const codeControl = component.discountGeneratorForm.get('code');
    const groupControl = component.discountGeneratorForm.get('group');

    codeControl.setValue('test code');
    groupControl.setValue('test group');

    expect(component.discountGeneratorForm.valid).toBeTruthy();
  });

});


