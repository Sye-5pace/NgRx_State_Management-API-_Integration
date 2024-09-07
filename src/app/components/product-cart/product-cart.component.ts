import { Component,OnInit,AfterViewInit } from '@angular/core';
import {  Observable } from 'rxjs';
import anime from 'animejs/lib/anime.es.js';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../model/product';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})


// Task 3: Display Products and Cart
// Component to display current state of the shopping cart
export class ProductCartComponent implements OnInit , AfterViewInit {
  cartLength$ = this.cartService.totalItems$;
  cartTotal: number = 0;
  carts$: Observable<CartItem[]> = this.cartService.cartItems$;
  carts: CartItem[] = [];

  constructor(private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartTotal = cartItems.reduce((total,item) =>
        total + (item.price * item. quantity),0
      )
      this.carts = cartItems;
    })
  }

  ngAfterViewInit(): void {
    anime({
      targets:'#cart-container ',
      translateX:[250,0],
      easing: 'easeInOutQuad',
      duration: 1200,
      opacity: [0,1],
      delay: 500
    })
    anime({
      targets: '.svg-demo path',
      strokeDasharray: [anime.setDashoffset, 0],
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 500,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(200),
      alternate: true
    });
    anime({
      targets: '.svg-demo path',
      translateY: [
        { value: -10, duration: 500, easing: 'easeInOutSine' },
        { value: 0, duration: 500, easing: 'easeInOutSine' }
      ],
      loop: true,
      delay: anime.stagger(100),
      alternate: true
    });
  }

  // Task 5: Impement remove from cartitems
  removeFromCart(itemName:string){
    this.cartService.removeFromCart(itemName)
  }

  // Task 5: Impement remove from cartitems
  //clear cart method from cart service:
  clearCart(){
    this.cartService.clearCart();
  }
}
