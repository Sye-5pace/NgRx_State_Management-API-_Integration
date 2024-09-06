import { AfterViewInit, Component } from '@angular/core';
import { ProductListComponent } from './../../components/product-list/product-list.component';
import { ProductCartComponent } from "../../components/product-cart/product-cart.component";
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductListComponent, ProductCartComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})

export class ProductPageComponent implements AfterViewInit {
  ngAfterViewInit() {
    anime({
      targets: '#product-title',
      translateY: [-200,0],
      opacity: [0,1],
      easing: 'easeOutQuad',
      duration: 500,
      delay: 200
    })
  }

}
