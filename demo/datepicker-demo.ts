import {Component} from '@angular/core';

@Component({
  selector: 'datepicker-demo',
  template: `
  <div><datepicker [expanded]="true"></datepicker></div> <br /> <br />
  <div><datepicker></datepicker></div> <br /> <br />
  <div><datepicker></datepicker></div>
  `
})

export class DatePickerDemo {}
