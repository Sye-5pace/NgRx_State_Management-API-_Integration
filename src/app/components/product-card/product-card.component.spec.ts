import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { ProductsFacadeService } from '../../services/cart.service';
import { ResponsiveImagingService } from '../../services/responsive-imaging.service';
import { of } from 'rxjs';
import { IProduct, CartItem, ImageType } from '../../model/product';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let mockProductsFacadeService: jest.Mocked<ProductsFacadeService>;
  let mockResponsiveImagingService: jest.Mocked<ResponsiveImagingService>;

  const mockProducts: IProduct[] = [
    {
      name: 'Product 1', price: 10, image: {} as ImageType,
      category: ''
    },
    {
      name: 'Product 2', price: 20, image: {} as ImageType,
      category: ''
    },
  ];

  const mockCartItems: CartItem[] = [
    {
      name: 'Product 1', quantity: 2,
      price: 0,
      thumbnail: ''
    },
  ];

  beforeEach(async () => {
    mockProductsFacadeService = {
      products$: of(mockProducts),
      error$: of(null),
      carts$: of(mockCartItems),
      loadProducts: jest.fn(),
      addToCart: jest.fn(),
    } as unknown as jest.Mocked<ProductsFacadeService>;

    mockResponsiveImagingService = {
      getResponsiveImaging: jest.fn().mockReturnValue('mock-image-url'),
    } as unknown as jest.Mocked<ResponsiveImagingService>;

    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        { provide: ProductsFacadeService, useValue: mockProductsFacadeService },
        { provide: ResponsiveImagingService, useValue: mockResponsiveImagingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ... (keep all the existing tests)

  // Update this test to use index instead of id
  it('should add to cart', () => {
    component.addCart(1);
    expect(mockProductsFacadeService.addToCart).toHaveBeenCalledWith(1, 1);
    expect(component.cartCounts[1]).toBe(1);
    expect(component.addTrigger[1]).toBe(false);
  });

  // Update this test to use index instead of id
  it('should remove from cart', () => {
    component.removeCart(0);
    expect(mockProductsFacadeService.addToCart).toHaveBeenCalledWith(0, -1);
    expect(component.cartCounts[0]).toBe(1);
    expect(component.addTrigger[0]).toBe(false);
  });

  // ... (keep all other tests the same)
});
