import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {StocksService} from '../stocks.service';
import {Stock} from '../stock.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading = false;
  stocks: Stock[] = [];
  displayedColumns: string[] = ['symbol', 'numShares', 'ppsPaid', 'totalPricePaid', 'currentPPS', 'currentTotal', 'difference', 'delete'];
  dataSource = new MatTableDataSource(this.stocks);

  constructor(private router: Router,
              private stocksService: StocksService) { }

  ngOnInit(): void {
    this.stocksService.getStocks().subscribe(stocks => {
      this.stocks = stocks.map(m => {
        return {
          id: m.payload.doc.id,
          ...(m.payload.doc.data() as object)
        } as Stock;
      });
    });
  }

  log() {
    console.log(this.stocks);
  }

  refresh() {
    this.dataSource.data = this.stocks;
  }

  delete(id: any) {
    this.stocksService.deleteStock(id);
  }

   getStockData() {
    this.isLoading = true;
    let stockString = '';
    for (const stock of this.dataSource.data) {
      stockString += stock.symbol + ',';
    }
    let responseData = {
      quoteResponse: undefined
    };
    const symbolPriceMap = this.stocksService.getStockRealtimeData(stockString)
      .then(res => {
        responseData = res;
        console.log({responseData});
        const quoteResponse = responseData.quoteResponse;
        const results = quoteResponse.result;
        console.log({results});
        const symbols = stockString.split(',');
        console.log({symbols});
        symbols.forEach(symbol => {
          results.forEach(result => {
            if (result.symbol === symbol) {
              symbolPriceMap[symbol] = result.regularMarketPrice;
            }
          });
        });
        console.log({symbolPriceMap});
        this.stocks.forEach(stock => {
          stock.currentPPS = symbolPriceMap[stock.symbol];
          stock.currentTotal = stock.currentPPS * stock.numShares;
        });
        this.refresh();
        this.isLoading = false;
      })
      .catch(err => console.error(err));
  }
}
