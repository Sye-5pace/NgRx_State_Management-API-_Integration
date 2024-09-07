import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { CartItem } from '../model/product';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new item to the cart and update the cart items list', () => {
    const cartService = new CartService();
    const newItem: CartItem = { name: 'Product 1', price: 100, quantity: 1, thumbnail: 'image1.jpg' };

    cartService.addToCart(newItem);

    cartService.cartItems$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0]).toEqual(newItem);
    });
  });

  it('should increase quantity of existing item when added', () => {
    const cartService = new CartService();
    const existingItem: CartItem = { name: 'Product 1', price: 100, quantity: 1, thumbnail: 'image1.jpg' };
    const newItem: CartItem = { name: 'Product 1', price: 100, quantity: 2, thumbnail: 'image1.jpg' };

    cartService.addToCart(existingItem);
    cartService.addToCart(newItem);

    cartService.cartItems$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].quantity).toBe(3);
    });
  });

  it('should update cart items when an item is added and removed', () => {
    const cartService = new CartService();
    const newItem: CartItem = { name: 'Product 1', price: 100, quantity: 1, thumbnail: 'image1.jpg' };

    // Add item to cart
    cartService.addToCart(newItem);

    // Check if item is added
    cartService.cartItems$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0]).toEqual(newItem);
    });

    // Remove item from cart
    cartService.removeFromCart('Product 1');

    // Check if item is removed
    cartService.cartItems$.subscribe(cartItems => {
      expect(cartItems.length).toBe(0);
    });
  });

  it('should decrease the quantity of the removed item from the cart', () => {
    const cartService = new CartService();
    const item: CartItem = { name: 'Product A', price: 50, quantity: 2, thumbnail: 'imageA.jpg' };
    cartService.addToCart(item);

    cartService.removeFromCart('Product A');

    cartService.cartItems$.subscribe(cartItems => {
      expect(cartItems.length).toBe(0);
    });
  });

  it('should clear the cart items list when cart is cleared', () => {
    const cartService = new CartService();
    const newItem: CartItem = { name: 'Product 1', price: 100, quantity: 1, thumbnail: 'image1.jpg' };

    cartService.addToCart(newItem);
    cartService.clearCart();

    cartService.cartItems$.subscribe(cartItems => {
      expect(cartItems.length).toBe(0);
    });
  });
});
