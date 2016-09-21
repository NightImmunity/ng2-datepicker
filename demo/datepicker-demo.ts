import {Component} from '@angular/core';

@Component({
  selector: 'datepicker-demo',
  template: `
  <div><datepicker class="default" [expanded]="true"></datepicker></div> <br /> <br />
  <div><datepicker></datepicker></div> <br /> <br />
  <div><datepicker class="default"></datepicker></div>
  `
})

export class DatePickerDemo {}
