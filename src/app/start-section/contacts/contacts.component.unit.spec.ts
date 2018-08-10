import { ContactsComponent } from './contacts.component';
import { HelperService } from '../../core/helper.service';
import { Store } from '@ngrx/store';

describe('Contacts form Unit Tests:', () => {
  let component: ContactsComponent;
  let helper: HelperService;
  let store: Store<any>;

  beforeEach(() => {
    store = new Store(null, null, null);
    helper = new HelperService(store);
    component = new ContactsComponent(helper, store);
    component.ngOnInit();
  });

  it('should create formGroup instance in contactsForm property', () => {
    expect(component.contactsForm).not.toBeUndefined();
  });

  it('should create Contact-form with 3 controls', () => {
    expect(component.contactsForm.contains('email')).toBeTruthy();
    expect(component.contactsForm.contains('name')).toBeTruthy();
    expect(component.contactsForm.contains('message')).toBeTruthy();
  });

  it('should check EMAIL control as required field', () => {
    const control = component.contactsForm.get('email');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should check NAME control as required field', () => {
    const control = component.contactsForm.get('name');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should check MESSAGE control as required field', () => {
    const control = component.contactsForm.get('message');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should set contactsForm to invalid if EMAIL field in empty', () => {
    const nameControl = component.contactsForm.get('name');
    const messageControl = component.contactsForm.get('message');

    nameControl.setValue('leo');
    messageControl.setValue('test message');

    expect(component.contactsForm.valid).toBeFalsy();
  });

  it('should set contactsForm to invalid if NAME field in empty', () => {
    const emailControl = component.contactsForm.get('email');
    const messageControl = component.contactsForm.get('message');

    emailControl.setValue('leo@leo.com');
    messageControl.setValue('test message');

    expect(component.contactsForm.valid).toBeFalsy();
  });

  it('should set contactsForm to invalid if MESSAGE field in empty', () => {
    const emailControl = component.contactsForm.get('email');
    const nameControl = component.contactsForm.get('name');

    emailControl.setValue('leo@leo.com');
    nameControl.setValue('leo');

    expect(component.contactsForm.valid).toBeFalsy();
  });

  it('should set contactsForm to valid if EMAIL, NAME, MESSAGE fields are filled properly', () => {
    const emailControl = component.contactsForm.get('email');
    const nameControl = component.contactsForm.get('name');
    const messageControl = component.contactsForm.get('message');

    emailControl.setValue('leo@leo.com');
    nameControl.setValue('leo');
    messageControl.setValue('test message');

    expect(component.contactsForm.valid).toBeTruthy();
  });

});


