import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { HelperService } from '../../core/helper.service';

import * as fromRoot from '../../app.reducers';
import * as UserActions from '../../secure-section/user/store/user.actions';
import * as UIActions from '../../ui/ui.actions';

@Component({
  selector: 'eaf-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {
  contactsForm: FormGroup;
  constructor(
    private helper: HelperService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.contactsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('^([a-z0-9_\\+\\.-]+)@([a-z0-9\\.-]+)\\.([a-z\\.]{2,6})$')]),
      message: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.store.dispatch(new UIActions.IsLoading(true));
    this.helper.preventBodyToScroll(true);
    this.store.dispatch(new UserActions.DoSendMessage(this.contactsForm.value));
    this.store.select(fromRoot.getEraseFormState)
      .subscribe(form => {
        this.contactsForm.reset();
      });
  }
}
