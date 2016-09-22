import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerComponent} from './ng2-datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BrowserModule],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
  id: 'DPCM',
  bootstrap: [DatePickerComponent]
})

export class DatePickerComponentModule {}
