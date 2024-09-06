import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from '../model/product';

@Injectable({
  providedIn: 'root'
})

// Task 2: Fetch Product Data
// The service below uses HttpClient to load the product data
// into state created with BehaviorSubject, which acts as an observable
// emitting values to its subscribers. Also use catchError for error handling
// in the observable from the Http request
export class ProductService {
  private productsSubject = new BehaviorSubject<IProduct[]>([]);
  products$ = this.productsSubject.asObservable();
  private errorSubject = new BehaviorSubject<string | null>(null)
  error$ = this.errorSubject.asObservable();

  private productListURL: string = '../../assets/data.json'

  constructor(private http: HttpClient) { }

  fetchProductList(): void{
    this.http.get<IProduct[]>(this.productListURL).pipe(
      tap((products) => this.productsSubject.next(products)),
      catchError((error: HttpErrorResponse) => {
        this.errorSubject.next(error.message);
        return []
      })
    ).subscribe();
  }
}
