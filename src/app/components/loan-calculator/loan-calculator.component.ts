import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AmortizationPayment } from '../../interfaces/amortization-payment.interface';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.pug',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent implements OnInit {

  loanForm: FormGroup;
  monthyPayments: number = null;
  totalInterest: number = null;
  showAmortizationSchedule = false;

  dataSource: AmortizationPayment[] = [];

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.loanForm = new FormGroup({
      carValue: new FormControl(''),
      downPayment: new FormControl(''),
      years: new FormControl(''),
      months: new FormControl(''),
      interest: new FormControl('', [Validators.min(0), Validators.max(100)])
    });

    this.detectChanges();
  }

  seeAmortizationSchedule(): void {
    const balance = this.loanForm.get('carValue').value - this.loanForm.get('downPayment').value;
    const months = this.loanForm.get('months').value;
    const interestRate = this.loanForm.get('interest').value / 1200;

    this.dataSource = this.calculatorService.calculateAmortizationSchedule(balance, months, interestRate, this.monthyPayments);
    this.showAmortizationSchedule = true;
  }

  private detectChanges(): void {
    this.loanForm.valueChanges.pipe(
      debounceTime(400)
    ).subscribe(data => {
      if (this.loanForm.valid) {
        this.monthyPayments = this.calculatorService.calculateMontlyPaymentsLoan(
          data.carValue, data.downPayment, data.months, data.interest);

        this.totalInterest = this.calculatorService.calculateTotalInterestPaid(
          this.monthyPayments, data.carValue, data.downPayment, data.months);
      }
    });

    this.loanForm.get('years').valueChanges.subscribe(value => {
      this.loanForm.get('months').setValue(value ? value * 12 : '', {emitEvent: false});
    });

    this.loanForm.get('months').valueChanges.subscribe(value => {
      this.loanForm.get('years').setValue(value ? value / 12 : '', {emitEvent: false});
    });
  }
}
