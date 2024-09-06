import { ProductService } from '../../services/product.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import anime from 'animejs/lib/anime.es.js';
import { ResponsiveImagingService } from '../../services/responsive-imaging.service';
import { IProduct, CartItem, ImageType } from '../../model/product';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})


// Task 3: Display Products and Cart
// Component to display list of products

export class ProductCardComponent implements OnInit, AfterViewInit, OnDestroy {
  product$!: Observable<IProduct[]>;
  error$!: Observable<any>;
  carts$!: Observable<CartItem[]>;
  hoverIndex!: number | null;
  addTrigger: boolean[] = [];
  cartCounts: number[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private fetchService: ProductService,
    private imageService: ResponsiveImagingService
  ) {}

  ngOnInit() {
    this.product$ = this.fetchService.products$;
    this.error$ = this.fetchService.error$;

    this.fetchService.fetchProductList()

    //interactiveness for product-card
    this.product$.pipe(takeUntil(this.unsubscribe$)).subscribe((products) => {
      this.addTrigger = new Array(products.length).fill(false);
      this.cartCounts = new Array(products.length).fill(0);
    });


    this.carts$ = this.cartService.cartItems$;
    this.carts$.pipe(takeUntil(this.unsubscribe$)).subscribe((cartItems) => {
      this.cartCounts = this.cartCounts.map(() => 0);
      cartItems.forEach((cartItem) => {
        const productIndex = this.getProductIndexByName(cartItem.name);
        if (productIndex !== -1) {
          this.cartCounts[productIndex] = cartItem.quantity;
        }
      });
    });
  }

  ngAfterViewInit() {
    this.product$.pipe(takeUntil(this.unsubscribe$)).subscribe((products) => {
      setTimeout(() => {
        const elements = document.querySelectorAll('.card-container .card');
        if (elements.length > 0) {
          anime({
            targets: elements,
            translateX: [-400, 0],
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            delay: anime.stagger(300),
          });
        }
      }, 0);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getResponsiveImage(image: ImageType): string {
    return this.imageService.getResponsiveImaging(image);
  }

  onMouseEnter(index: number): void {
    this.hoverIndex = index;
  }

  onMouseLeave(): void {
    this.hoverIndex = null;
  }

  cartAddTrigger(i: number): void {
    this.addTrigger[i] = !this.addTrigger[i];
  }

  triggerHoverState(index: number): { [key: string]: boolean } {
    return {
      'border-tiamaria text-tiamaria': this.hoverIndex === index && !this.addTrigger[index],
      'border-pharlap text-graphite': this.hoverIndex !== index || this.addTrigger[index]
    };
  }

  addCart(i:number,product: IProduct): void {
    this.cartCounts[i]++;
    const cartItem: CartItem = {
      name: product.name,
      price: product.price,
      quantity: 1,
      thumbnail: product.image['thumbnail'],
    };
    this.cartService.addToCart(cartItem);
    this.addTrigger[i] = false;
  }

  // Task 5: Implement Remove from Cart functionality
  removeCart(i: number, product: IProduct): void {
    if (this.cartCounts[i] > 0) {
      this.cartCounts[i]--;
      const cartItem: CartItem = {
        name: product.name,
        price: product.price,
        quantity: 1,
        thumbnail: product.image['thumbnail'],
      };
      this.cartService.deleteCartItem(cartItem);
      this.addTrigger[i] = false;
    }
  }

  // Utility method to get product index by name
  private getProductIndexByName(productName: string): number {
    let productIndex = -1;
    this.product$.pipe(takeUntil(this.unsubscribe$)).subscribe((products) => {
      productIndex = products.findIndex((product) => product.name === productName);
    });
    return productIndex;
  }
}
