import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BalanceComponent } from './balance.component';
import { HelperService } from '../../../core/helper.service';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import * as fromRoot from '../../../app.reducers';
import { reducers } from '../../../app.reducers';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainStorageService } from '../../services/main-storage.service';
import { TermPickerPanelComponent } from '../../shared/term-picker-panel/term-picker-panel.component';
import { DropdownDirective } from '../../../core/directives/dropdown.directive';
import { CoreModule } from '../../../core/core.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
describe('Balance form Integration Tests:', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;
  let store: Store<fromRoot.State>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        CoreModule,
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      })
    ],
      declarations: [ BalanceComponent, TermPickerPanelComponent],
      providers: [HelperService, MainStorageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);

    spyOn(store, 'select').and.returnValue(Observable.from([ [1] ]));

    fixture.detectChanges();
  });

  it('should create BalanceComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initially set disabled property on submit button if form is invalid', () => {
    const button: HTMLElement = fixture.debugElement.query(By.css('.btn-lg')).nativeElement;

    expect(button.attributes['disabled']).toBeTruthy();
  });

  it('should remove disabled property on submit button if form is valid', () => {
    const control = component.balanceForm.get('amount');

    control.setValue('123');
    const button = fixture.debugElement.query(By.css('.btn-lg'));

    fixture.detectChanges();

    expect(button.properties.disabled).toBeFalsy();
  });

  it('should call onSubmit method if submit button is clicked', () => {
    const control = component.balanceForm.get('amount');
    const spy = spyOn(component, 'onSubmitBalanceForm');

    control.setValue('123');
    const button = fixture.debugElement.query(By.css('.btn-lg'));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.btn-lg')).nativeElement.click();

    expect(component.onSubmitBalanceForm).toHaveBeenCalled();
  });


  it('should dispatch action if form is submitted', () => {
    const spy = spyOn(store, 'dispatch');

    component.onSubmitBalanceForm();

    expect(spy).toHaveBeenCalled();
  });
});
