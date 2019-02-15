import {Component, Inject, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IPayment} from '../../store/reducers/data.reducer';
import {CurrencyService} from '../../services/currency.service';

const VISUALISE_BY_CURRENCY = 'byCurrency';
const VISUALISE_BY_DATE = 'byDate';

interface ICategoryVisualize {
  title: string;
  payments: IPayment[];
}

type IActiveTab = 'byDate' | 'byCurrency';

@Component({
  selector: 'app-category-visualize',
  templateUrl: './categoryVisualize.component.html',
  styleUrls: ['./categoryVisualize.component.less']
})
export class CategoryVisualizeComponent {
  activeTab: IActiveTab = VISUALISE_BY_CURRENCY;
  pieData: any;

  constructor(public dialogRef: MatDialogRef<CategoryVisualizeComponent>,
              private currencyService: CurrencyService,
              @Inject(MAT_DIALOG_DATA) public data: ICategoryVisualize) {
    this.getPieData()
  }

  get isByCurrencyActive(): boolean {
    return this.activeTab === VISUALISE_BY_CURRENCY;
  }

  get isByDateActive(): boolean {
    return this.activeTab === VISUALISE_BY_DATE;
  }

  close() {
    this.dialogRef.close();
  }

  setActiveTab(activeTab: IActiveTab) {
    this.activeTab = activeTab;
  }

  private getPieData() {
    // TODO need to optimize this data transforms
    const payments = this.data.payments.map((payment: IPayment) => {
      return {
        ...payment,
        amount: this.currencyService.exchangeCurrency(payment.amount, payment.currency)
      }
    });

    const chartDataEquialentUah = payments.reduce((acc, value) => {
      acc[value.currency] += Number(Number(value.amount).toFixed(2));
      return acc
    }, {
      USD: 0,
      EUR: 0,
      UAH: 0,
    });
    const chartDataReal = this.data.payments.reduce((acc, value) => {
      acc[value.currency] += Number(value.amount);
      return acc
    }, {
      USD: 0,
      EUR: 0,
      UAH: 0,
    });

    this.pieData = {
      data: {
        datasets: [{
          data: Object.values(chartDataEquialentUah),
          backgroundColor: ['blue', 'green', 'red']
        }],
        labels: [
          ...Object.keys(chartDataEquialentUah).map((label) => label !== 'UAH' ? `${label} is ${chartDataReal[label]}, ${label}  equivalent uah` : label),
        ]
      },
      options: {
        legend: {
          display: true
        },
      }
    };
  }
}
