import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StocksService} from '../stocks.service';
import {Stock} from '../stock.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-stock-form',
  templateUrl: './create-stock-form.component.html',
  styleUrls: ['./create-stock-form.component.scss']
})
export class CreateStockFormComponent implements OnInit {

  createStockForm: FormGroup;

  constructor(private fb: FormBuilder,
              private stocksService: StocksService,
              private router: Router) {
    this.createStockForm = this.fb.group({
      symbol: [null, Validators.required],
      numShares: [null, Validators.required],
      ppsPaid: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const data = {
      totalPricePaid: this.createStockForm.value.numShares * this.createStockForm.value.ppsPaid,
      ...this.createStockForm.value
    };
    this.stocksService.createStock(data as Stock)
      .then(res => {this.router.navigateByUrl('/dashboard'); })
      .catch(err => {throw err; });
  }

}
