import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCartComponent } from './product-cart.component';
import { ProductsFacadeService } from '../../services/cart.service';
import { ModalService } from '../../services/modal.service';
import { of } from 'rxjs';
import { CartItem } from '../../model/product';


const animeMock = {
  __esModule: true,
  default: jest.fn(() => Promise.resolve()),
  setDashoffset: jest.fn(),
  stagger: jest.fn(),
};

jest.mock('animejs/lib/anime.es.js', () => animeMock);

describe('ProductCartComponent', () => {
  let component: ProductCartComponent;
  let fixture: ComponentFixture<ProductCartComponent>;
  let mockProductsFacadeService: jest.Mocked<ProductsFacadeService>;
  let mockModalService: jest.Mocked<ModalService>;

  const mockCartItems: CartItem[] = [
    {
      name: 'Product 1', quantity: 2, price: 10,
      thumbnail: ''
    },
    {
      name: 'Product 2', quantity: 1, price: 20,
      thumbnail: ''
    },
  ];

  beforeEach(async () => {
    mockProductsFacadeService = {
      carts$: of(mockCartItems),
      deleteCartItem: jest.fn(),
    } as unknown as jest.Mocked<ProductsFacadeService>;

    mockModalService = {
      modalState$: of(false),
      openModal: jest.fn(),
    } as unknown as jest.Mocked<ModalService>;

    await TestBed.configureTestingModule({
      imports: [ProductCartComponent],
      providers: [
        { provide: ProductsFacadeService, useValue: mockProductsFacadeService },
        { provide: ModalService, useValue: mockModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart data on ngOnInit', () => {
    expect(component.cartLength).toBe(3);
    expect(component.cartTotal).toBe(40);
    expect(component.carts).toEqual(mockCartItems);
  });

  it('should update confirmModal based on modalState$', () => {
    expect(component.confirmModal).toBe(false);
    mockModalService.modalState$ = of(true);
    component.ngOnInit();
    expect(component.confirmModal).toBe(true);
  });

  it('should call deleteCartItem method of ProductsFacadeService', () => {
    component.deleteCartItem(0);
    expect(mockProductsFacadeService.deleteCartItem).toHaveBeenCalledWith(0);
  });

  it('should call openModal method of ModalService', () => {
    component.openModal();
    expect(mockModalService.openModal).toHaveBeenCalled();
  });

  it('should call anime in ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(animeMock.default).toHaveBeenCalledTimes(3);
    expect(animeMock.stagger).toHaveBeenCalledTimes(2);
  });
});
