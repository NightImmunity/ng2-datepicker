import { Component, ViewContainerRef, forwardRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {DatePickerComponentModule} from './ng2-datepicker.module';
import * as moment_ from 'moment';

const moment: any = (<any>moment_).default || moment_;

interface CalendarDate {
  day: number;
  month: number;
  year: number;
  enabled: boolean;
  today: boolean;
  selected: boolean;
}

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

@Component({
  moduleId: 'DPCM',
  selector: 'datepicker',
  template: `
    <div [class]="class">
      <div class="input-group">
        <input class="form-control" type="text" [(ngModel)]="viewDate">
        <div class="input-group-addon">
          <span class="glyphicon glyphicon-calendar" [class.opened]="opened || expanded" (click)="toggle()"></span>
        </div>
      </div>

      <div class="ui-kit-calendar-cal-container" [class.opened]="opened">
        <div class="ui-kit-calendar-cal-top">
          <i class="ion-arrow-left-b" (click)="prevMonth()"></i>
          <span>{{ date.format('MMMM YYYY') }}</span>
          <i class="ion-arrow-right-b" (click)="nextMonth()"></i>
        </div>
        <div class="ui-kit-calendar-day-names">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
        <div class="ui-kit-calendar-days">
          <span *ngFor="let d of days; let i = index;" 
                (click)="selectDate($event, i)"
                [class.today]="d.today"
                [class.is-active]="d.selected">
            {{ d.day }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .ui-kit-calendar-container div.input-group {
      min-width: 190px;
      max-width: 275px;
      position: relative;
      z-index: 99;
    }
    span.glyphicon-calendar {
      cursor: pointer;
      padding: 6px 12px;
    }
    .input-group-addon {
      padding: 0px;
    }
    .ui-kit-calendar-container {
        position: relative;
        width: 170px;
        margin: 0 10px 0 0;
        display: block;
        float: left;
        z-index: 99;
    }
        .ui-kit-calendar-container .ui-kit-calendar-input {
          border: 1px solid #aec9de;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70px;
          height: 40px;
          background: #fcfcff;
          cursor: pointer;
          text-align: center;
          font-size: 0;
          transition: all 300ms ease; }
          .ui-kit-calendar-container .ui-kit-calendar-input i {
            color: #505b71;
            font-size: 20px; }
          .ui-kit-calendar-container .ui-kit-calendar-input.opened {
            width: 170px;
            border: 1px solid #44c8f9;
            color: #44c8f9;
            background: rgba(68, 200, 249, 0.15);
            font-size: 12px; }
            .ui-kit-calendar-container .ui-kit-calendar-input.opened i {
              color: #44c8f9; }
          .ui-kit-calendar-container .ui-kit-calendar-input span {
            display: none; }
            .ui-kit-calendar-container .ui-kit-calendar-input span.opened {
              display: inline;
              margin-right: 10px; }
        .ui-kit-calendar-container .ui-kit-calendar-cal-container {
          position: absolute;
          top: 55px;
          right: 0;
          color: #fff;
          background: #44c8f9;
          display: inline-block;
          width: 300px;
          border-radius: 3px;
          visibility: hidden;
          opacity: 0;
          z-index: 100;
          transition: visibility 0s, opacity 300ms linear 300ms; }
          .ui-kit-calendar-container .ui-kit-calendar-cal-container.opened {
            visibility: visible;
            opacity: 1;
            z-index: 100;
            position: absolute; }
          .ui-kit-calendar-container .ui-kit-calendar-cal-container:after {
            position: absolute;
            top: -15px;
            right: 28px;
            content: "";
            width: 0;
            height: 0;
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            border-left: 15px solid #44c8f9;
            transform: rotate(-90deg);
            z-index: 100; }
          .ui-kit-calendar-container .ui-kit-calendar-cal-container .ui-kit-calendar-cal-top {
            width: 100%;
            height: 40px;
            line-height: 40px; }
            .ui-kit-calendar-container .ui-kit-calendar-cal-container .ui-kit-calendar-cal-top i {
              display: block;
              float: left;
              font-size: 16px;
              width: 40px;
              height: 40px;
              text-align: center;
              cursor: pointer; }
            .ui-kit-calendar-container .ui-kit-calendar-cal-container .ui-kit-calendar-cal-top span {
              display: block;
              float: left;
              width: 220px;
              height: 40px;
              font-size: 14px;
              text-align: center; }
          .ui-kit-calendar-container .ui-kit-calendar-cal-container .ui-kit-calendar-day-names {
            width: 100%;
            height: 23px;
            background: #35b1e2; }
            .ui-kit-calendar-container .ui-kit-calendar-cal-container .ui-kit-calendar-day-names span {
              font-size: 10px;
              line-height: 23px;
              text-align: center;
              display: block;
              float: left;
              width: calc(100% / 7);
              height: 23px; }
          .ui-kit-calendar-container .ui-kit-calendar-cal-container .ui-kit-calendar-days {
            width: 100%;
            padding: 5px 0;
            margin-bottom: 15px; }
            .ui-kit-calendar-container .ui-kit-calendar-cal-container .ui-kit-calendar-days span {
              font-size: 12px;
              display: block;
              float: left;
              text-align: center;
              height: 40px;
              line-height: 40px;
              width: calc(100% / 7);
              cursor: pointer;
              border-radius: 50%; }
              .ui-kit-calendar-container .ui-kit-calendar-cal-container .ui-kit-calendar-days span.today {
                border: 1px solid #fff; }
              .ui-kit-calendar-container .ui-kit-calendar-cal-container .ui-kit-calendar-days span:hover, .ui-kit-calendar-container .ui-kit-calendar-cal-container .ui-kit-calendar-days span.is-active {
                background: #fff;
                color: #44c8f9; }
        .ui-kit-calendar-container .ui-kit-calendar-input {
          border: 1px solid #aec9de;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70px;
          height: 40px;
          background: #fcfcff;
          cursor: pointer;
          text-align: center;
          font-size: 0;
          transition: all 300ms ease; }
          .ui-kit-calendar-container .ui-kit-calendar-input i {
            color: #505b71;
            font-size: 20px; }
          .ui-kit-calendar-container .ui-kit-calendar-input.opened {
            width: 170px;
            border: 1px solid #44c8f9;
            color: #44c8f9;
            background: rgba(68, 200, 249, 0.15);
            font-size: 12px; }
            .ui-kit-calendar-container .ui-kit-calendar-input.opened i {
              color: #44c8f9; }
          .ui-kit-calendar-container .ui-kit-calendar-input span {
            display: none; }
            .ui-kit-calendar-container .ui-kit-calendar-input span.opened {
              display: inline;
              margin-right: 10px; }
        .ui-kit-calendar-container.danger .ui-kit-calendar-input.opened {
          color: #e2747e;
          background: rgba(226, 116, 126, 0.15);
          border: 1px solid #e2747e; }
          .ui-kit-calendar-container.danger .ui-kit-calendar-input.opened i {
            color: #e2747e; }
        .ui-kit-calendar-container.danger .ui-kit-calendar-cal-container {
          background: #e2747e; }
          .ui-kit-calendar-container.danger .ui-kit-calendar-cal-container:after {
            border-left: 15px solid #e2747e; }
          .ui-kit-calendar-container.danger .ui-kit-calendar-cal-container .ui-kit-calendar-day-names {
            background: #c72938; }
          .ui-kit-calendar-container.danger .ui-kit-calendar-cal-container .ui-kit-calendar-days span:hover, .ui-kit-calendar-container.danger .ui-kit-calendar-cal-container .ui-kit-calendar-days span.is-active {
            color: #e2747e; }
        .ui-kit-calendar-container.warning .ui-kit-calendar-input.opened {
          color: #f4bf4d;
          background: rgba(244, 191, 77, 0.15);
          border: 1px solid #f4bf4d; }
          .ui-kit-calendar-container.warning .ui-kit-calendar-input.opened i {
            color: #f4bf4d; }
        .ui-kit-calendar-container.warning .ui-kit-calendar-cal-container {
          background: #f4bf4d; }
          .ui-kit-calendar-container.warning .ui-kit-calendar-cal-container:after {
            border-left: 15px solid #f4bf4d; }
          .ui-kit-calendar-container.warning .ui-kit-calendar-cal-container .ui-kit-calendar-day-names {
            background: #ce910d; }
          .ui-kit-calendar-container.warning .ui-kit-calendar-cal-container .ui-kit-calendar-days span:hover, .ui-kit-calendar-container.warning .ui-kit-calendar-cal-container .ui-kit-calendar-days span.is-active {
            color: #f4bf4d; }
        .ui-kit-calendar-container.success .ui-kit-calendar-input.opened {
          color: #3fc59d;
          background: rgba(63, 197, 157, 0.15);
          border: 1px solid #3fc59d; }
          .ui-kit-calendar-container.success .ui-kit-calendar-input.opened i {
            color: #3fc59d; }
        .ui-kit-calendar-container.success .ui-kit-calendar-cal-container {
          background: #3fc59d; }
          .ui-kit-calendar-container.success .ui-kit-calendar-cal-container:after {
            border-left: 15px solid #3fc59d; }
          .ui-kit-calendar-container.success .ui-kit-calendar-cal-container .ui-kit-calendar-day-names {
            background: #257960; }
          .ui-kit-calendar-container.success .ui-kit-calendar-cal-container .ui-kit-calendar-days span:hover, .ui-kit-calendar-container.success .ui-kit-calendar-cal-container .ui-kit-calendar-days span.is-active {
            color: #3fc59d; }        
        .ui-kit-calendar-container.default .ui-kit-calendar-input.opened {
          color: DimGrey;
          background: rgba(231, 231, 231, 0.15);
          border: 1px solid #3fc59d; }
          .ui-kit-calendar-container.default .ui-kit-calendar-input.opened i {
            color: DimGrey; }
        .ui-kit-calendar-container.default .ui-kit-calendar-cal-container {
          background: DimGrey; }
          .ui-kit-calendar-container.default .ui-kit-calendar-cal-container:after {
            border-left: 15px solid DimGrey; }
          .ui-kit-calendar-container.default .ui-kit-calendar-cal-container .ui-kit-calendar-day-names {
            background: Orange; }
          .ui-kit-calendar-container.default .ui-kit-calendar-cal-container .ui-kit-calendar-days span:hover, .ui-kit-calendar-container.success .ui-kit-calendar-cal-container .ui-kit-calendar-days span.is-active {
            color: DimGrey;`
  ],
  providers: [CALENDAR_VALUE_ACCESSOR]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
  @Input() class: string;
  @Input() expanded: boolean;
  @Input() opened: boolean;
  @Input() format: string;
  @Input() viewFormat: string;
  @Input() firstWeekdaySunday: boolean;
  @Output() selectedDate: EventEmitter<any> = new EventEmitter<any>();

  private viewDate: string = null;
  private date: any = moment();
  private onChange: Function;
  private onTouched: Function;
  private el: Element;  
  private days: CalendarDate[] = [];

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  constructor(viewContainerRef: ViewContainerRef) {
    this.el = viewContainerRef.element.nativeElement;
  }

  get value(): any {
    return this.viewDate;
  }

  set value(value: any) {
    let date = (value instanceof moment) ? value : moment(value, this.format);
    this.viewDate = date.format(this.viewFormat);
    this.onChangeCallback(value);
  }

  ngOnInit() {
    this.class = `ui-kit-calendar-container ${this.class}`;
    this.opened = this.opened || false;
    this.format = this.format || 'YYYY-MM-DD';
    
    this.viewFormat = this.viewFormat || 'YYYY/MM/DD';
    this.firstWeekdaySunday = this.firstWeekdaySunday || false; 
    setTimeout(() => {
      if (!this.viewDate) {
        let value = moment();
        this.value = value;
        this.onChangeCallback(value.format(this.format));
      }
      this.generateCalendar();
    });

    let body = document.querySelector('body');
    body.addEventListener('click', e => {
      if (!this.opened || !e.target) { return; };
      if (this.el !== e.target && !this.el.contains((<any>e.target))) {
        this.close();
      }
    }, false);
  }

  generateCalendar() {
    let date = moment(this.date);
    let month = date.month();
    let year = date.year();
    let n: number = 1;
    let firstWeekDay: number = (this.firstWeekdaySunday) ? date.date(2).day() : date.date(1).day();

    if (firstWeekDay !== 1) {
      n -= (firstWeekDay + 6) % 7;
    }

    this.days = [];
    let selectedDate = moment(this.value, this.viewFormat);
    for (let i = n; i <= date.endOf('month').date(); i += 1) {
      let currentDate = moment(`${i}.${month + 1}.${year}`, 'DD.MM.YYYY');
      let today = (moment().isSame(currentDate, 'day') && moment().isSame(currentDate, 'month')) ? true : false;
      let selected = (selectedDate.isSame(currentDate, 'day')) ? true : false; 

      if (i > 0) {
        this.days.push({ 
          day: i,
          month: month + 1,
          year: year,
          enabled: true,
          today: today,
          selected: selected
        });
      } else {
        this.days.push({ 
          day: null,
          month: null,
          year: null,
          enabled:false,
          today: false,
          selected: selected 
        });
      }
    }
  }

  selectDate(e: MouseEvent, i: number) {
    e.preventDefault();

    let date: CalendarDate = this.days[i];
    let theSelectedDate = moment(`${date.day}.${date.month}.${date.year}`, 'DD.MM.YYYY');
    this.selectedDate.emit(theSelectedDate);
    this.value = theSelectedDate.format(this.format);
    this.viewDate = theSelectedDate.format(this.viewFormat);
    this.close();
    this.generateCalendar();
  }

  prevMonth() {
    this.date = this.date.subtract(1, 'month');
    this.generateCalendar();
  }

  nextMonth() {
    this.date = this.date.add(1, 'month');
    this.generateCalendar();
  }

  writeValue(value: any) {
    this.viewDate = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  toggle() {
    this.opened = !this.opened; 
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }
}
