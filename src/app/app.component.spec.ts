import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductPageComponent } from './view/product-page/product-page.component';
import { ConfirmModalComponent } from "./components/confirm-modal/confirm-modal.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ProductPageComponent, ConfirmModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Product-List-app' title`, () => {
    expect(component.title).toEqual('Product-List-app');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Product-List-app');
  });

  it('should include ProductPageComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-product-page')).toBeTruthy();
  });

  it('should include ConfirmModalComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-confirm-modal')).toBeTruthy();
  });

  it('should have correct selector', () => {
    const componentElement = fixture.debugElement.nativeElement;
    expect(componentElement.tagName.toLowerCase()).toBe('app-root');
  });
});
