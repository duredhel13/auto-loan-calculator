import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';
import { AmortizationScheduleComponent } from './components/amortization-schedule/amortization-schedule.component';

import { CeilPipe } from './pipes/ceil.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoanCalculatorComponent,
    AmortizationScheduleComponent,
    CeilPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
