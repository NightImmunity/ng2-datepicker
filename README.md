# ng2-datepicker
Angular2 Datepicker Component

***ng2-datepicker*** is a datepicker component for Angular2.

## Demo

[http://ng2-datepicker.jankuri.com](http://ng2-datepicker.jankuri.com)

## Installation: 


````shell
npm install NightImmunity/ng2-datepicker --save
````

## Importing

```ts
import {DatePickerModule} from 'ng2-datepicker/ng2-datepicker';

@NgModule({
  imports: [..., DatePickerModule],
  ...
})

export class MyModule { }
```

## Example:

```html
<datepicker [(ngModel)]="data.date" [expanded]="true"></datepicker>
<datepicker [(ngModel)]="data2.date" [expanded]="true" class="danger"></datepicker>
<datepicker [(ngModel)]="data3.date" [expanded]="true" class="success"></datepicker>
<datepicker [(ngModel)]="data4.date" [expanded]="true" class="warning"></datepicker>
<datepicker [(ngModel)]="data5.date"></datepicker>
```

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

