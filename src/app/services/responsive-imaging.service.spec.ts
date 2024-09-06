import { TestBed } from '@angular/core/testing';
import { ResponsiveImagingService } from './responsive-imaging.service';
import { ImageType } from '../model/product';

describe('ResponsiveImagingService', () => {
  let service: ResponsiveImagingService;

  const mockImage: ImageType = {
    desktop: 'desktop-image.jpg',
    tablet: 'tablet-image.jpg',
    mobile: 'mobile-image.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponsiveImagingService]
    });
    service = TestBed.inject(ResponsiveImagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getResponsiveImaging', () => {
    let originalInnerWidth: number;

    beforeEach(() => {
      originalInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });
    });

    afterEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth
      });
    });

    it('should return desktop image for screen width >= 768px', () => {
      window.innerWidth = 1024;
      expect(service.getResponsiveImaging(mockImage)).toBe('desktop-image.jpg');

      window.innerWidth = 768;
      expect(service.getResponsiveImaging(mockImage)).toBe('desktop-image.jpg');
    });

    it('should return tablet image for screen width >= 480px and < 768px', () => {
      window.innerWidth = 600;
      expect(service.getResponsiveImaging(mockImage)).toBe('tablet-image.jpg');

      window.innerWidth = 480;
      expect(service.getResponsiveImaging(mockImage)).toBe('tablet-image.jpg');
    });

    it('should return mobile image for screen width < 480px', () => {
      window.innerWidth = 479;
      expect(service.getResponsiveImaging(mockImage)).toBe('mobile-image.jpg');

      window.innerWidth = 320;
      expect(service.getResponsiveImaging(mockImage)).toBe('mobile-image.jpg');
    });
  });
});
