import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch product list successfully when fetchProductList is called', () => {
    const httpClientMock = {
      get: jest.fn().mockReturnValue(of([{ name: 'Product1', category: 'Category1', price: 100, image: 'image1' }]))
    };
    const productService = new ProductService(httpClientMock as any);
    productService.fetchProductList();
    productService.products$.subscribe(products => {
      expect(products).toEqual([{ name: 'Product1', category: 'Category1', price: 100, image: 'image1' }]);
    });
  });

  it('should emit updated product list when fetchProductList is called', () => {
    const httpClientMock = {
        get: jest.fn().mockReturnValue(of([{ name: 'Product1', category: 'Category1', price: 100, image: 'image1' }]))
    };
    const productService = new ProductService(httpClientMock as any);
    productService.fetchProductList();
    productService.products$.subscribe(products => {
        expect(products).toEqual([{ name: 'Product1', category: 'Category1', price: 100, image: 'image1' }]);
    });
  })

  it('should keep error$ observable as null after successful fetch', () => {
    const httpClientMock = {
      get: jest.fn().mockReturnValue(of([{ name: 'Product1', category: 'Category1', price: 100, image: 'image1' }]))
    };
    const productService = new ProductService(httpClientMock as any);
    productService.fetchProductList();
    productService.error$.subscribe(error => {
      expect(error).toBeNull();
    });
  });
});
