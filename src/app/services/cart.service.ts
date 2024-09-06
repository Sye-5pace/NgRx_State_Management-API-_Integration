import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../model/product';

@Injectable({
  providedIn: 'root'
})


// Task 1: Implement Shopping Cart State Management
// using BehaviorSubject to implement add items to the cart
// remove items, clear the cart
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // an observable to track the total number of items in the cart
  private totalItemsSubject = new BehaviorSubject<number>(0)
  totalItems$ = this.totalItemsSubject.asObservable();


  // Task 4: This method in the cartService primarily adds item to the cart
  // it updates the cartItemsSubject  which acts a observable for the cart items,
  // with new item addition as the parameter passed to the addToCart method
  //  then updates the total cart items accordingly
  addToCart(item: CartItem): void {
    const carts = this.cartItemsSubject.value
    const existingCartItem = carts.find( cart => cart.name === item.name)
    if(existingCartItem) {
      existingCartItem.quantity += item.quantity
    }else{
      carts.push(item)
    }

    this.cartItemsSubject.next(carts);
    this.updateTotalItems();
  }

  // Task 5: Implement Remove from Cart functionality
  deleteCartItem(item: CartItem): void {
    const carts = this.cartItemsSubject.value;
    const existingCartItem = carts.find(cart => cart.name === item.name);

    if (existingCartItem) {
      existingCartItem.quantity -= item.quantity;
      if (existingCartItem.quantity <= 0) {
        const index = carts.indexOf(existingCartItem);
        carts.splice(index, 1);
      }
    }

    this.cartItemsSubject.next(carts);
    this.updateTotalItems();
  }

  // Task 5: Implement remove from cart
  removeFromCart(itemName: string):void{
    let carts = this.cartItemsSubject.value;
    carts = carts.filter( cartItem => cartItem.name !== itemName)
    this.cartItemsSubject.next(carts);
    this.updateTotalItems();
  }

  private updateTotalItems () : void {
    const total = this.cartItemsSubject.value.reduce((acc, item) => acc + item.quantity, 0);
    this.totalItemsSubject.next(total);
  }

}
