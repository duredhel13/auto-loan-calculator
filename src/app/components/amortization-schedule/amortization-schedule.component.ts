import { Component, Input } from '@angular/core';

import { AmortizationPayment } from '../../interfaces/amortization-payment.interface';

@Component({
  selector: 'app-amortization-schedule',
  templateUrl: './amortization-schedule.component.pug',
  styleUrls: ['./amortization-schedule.component.scss']
})
export class AmortizationScheduleComponent {
  @Input() dataSource: AmortizationPayment[];

  displayedColumns: string[] = [
    'payment',
    'amount',
    'principal',
    'interest',
    'balance'
  ];
}
