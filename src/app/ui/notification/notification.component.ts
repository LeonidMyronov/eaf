import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'eaf-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {
  @Input() message;
  constructor() { }

  ngOnInit() {
  }

}
