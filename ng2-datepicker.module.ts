import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerComponent} from './src/components/ng2-datepicker';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, FormsModule, BrowserModule],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
  id: 'DPCM'
  // bootstrap: [DatePickerComponent]
})

export class DatePickerComponentModule {}
