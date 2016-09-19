import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerComponentModule} from '../src/components/ng2-datepicker.module';
import {DatePickerDemo} from './datepicker-demo';

@NgModule({
  imports: [CommonModule, DatePickerComponentModule],
  declarations: [DatePickerDemo],
  exports: [DatePickerDemo],
  bootstrap: [DatePickerDemo]
})

export class DatePickerDemoModule {}
