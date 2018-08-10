import { WhitelabelComponent } from './whitelabel.component';
import { HelperService } from '../../../core/helper.service';
import { Store } from '@ngrx/store';

describe('Whitelabel form Unit Tests:', () => {
  let component: WhitelabelComponent;
  let helper: HelperService;
  let store: Store<any>;

  beforeEach(() => {
    store = new Store(null, null, null);
    helper = new HelperService(store);
    component = new WhitelabelComponent(helper, store);
    component.initForm();
  });

  it('should create formGroup instance in wLForm property', () => {
    expect(component.wLForm).not.toBeUndefined();
  });

  it('should create Contact-form with 3 controls', () => {
    expect(component.wLForm.contains('name')).toBeTruthy();
    expect(component.wLForm.contains('proto')).toBeTruthy();
    expect(component.wLForm.contains('details')).toBeTruthy();
  });

  it('should check NAME control as required field', () => {
    const control = component.wLForm.get('name');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should check DETAILS control as required field', () => {
    const control = component.wLForm.get('details');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should set wLForm to invalid if NAME field in empty', () => {
    const detailsControl = component.wLForm.get('details');

    detailsControl.setValue('test details');

    expect(component.wLForm.valid).toBeFalsy();
  });

  it('should set wLForm to invalid if DETAILS field in empty', () => {
    const nameControl = component.wLForm.get('name');

    nameControl.setValue('test name');

    expect(component.wLForm.valid).toBeFalsy();
  });

  it('should set wLForm to valid if NAME, DETAILS, PROTO fields are filled properly', () => {
    const nameControl = component.wLForm.get('name');
    const detailsControl = component.wLForm.get('details');
    const protoControl = component.wLForm.get('proto');

    nameControl.setValue('test name');
    detailsControl.setValue('test details');
    protoControl.setValue('https');

    expect(component.wLForm.valid).toBeTruthy();
  });

});


