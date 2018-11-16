import { Injectable } from '@angular/core';

import { AmortizationPayment } from '../interfaces/amortization-payment.interface';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  calculateMontlyPaymentsLoan(carValue: number, downPayment: number, months: number, interest: number): number {
    const monthyInterest = interest / 1200;

    const total = ((monthyInterest + (monthyInterest / (Math.pow((1 + monthyInterest), months) - 1)))
      * (carValue - (downPayment || 0))).toFixed(2);

    return parseFloat(total);
  }

  calculateTotalInterestPaid(monthyPayments: number, carValue: number, downPayment: number, months: number): number {
    return (monthyPayments * months) - (carValue - downPayment);
  }

  calculateAmortizationSchedule(
    balance: number,
    months: number,
    interestRate: number,
    monthyPayments: number): AmortizationPayment[] {

    const amortizationPayment: AmortizationPayment[] = [];

    for (let i = 0; i < months; i++) {
      const periodInterest = interestRate * balance;
      const principal = monthyPayments - periodInterest;
      balance = balance - principal;

      amortizationPayment.push({
        payment: i + 1,
        amount: Math.ceil(monthyPayments),
        principal: Math.round(principal),
        interest: Math.round(periodInterest),
        balance: Math.round(balance)
      });
    }

    return amortizationPayment;
  }
}
