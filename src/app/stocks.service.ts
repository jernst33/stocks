import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {Stock} from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient,
              private db: AngularFirestore) { }


  getStocks() {
    return this.db.collection('stocks').snapshotChanges();
  }

  createStock(stock: Stock) {
    return this.db.collection('stocks').add(stock);
  }

  deleteStock(stockId: string) {
    return this.db.collection('stocks').doc(stockId).delete();
  }

  getStockRealtimeData(stockString: string): Promise<void | any> {
    const paramString = '?region=US&lang=en&symbols=' + stockString;
    const url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes';
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        'x-rapidapi-key': 'fdea8daf24msha44d1bcce42b508p178036jsnba8760eb22b2'
      }),
    };

    let symbolPriceMap = {};
    let responseData = {};
    return this.http.get(url + paramString, httpOptions)
      .toPromise();
  }
}
