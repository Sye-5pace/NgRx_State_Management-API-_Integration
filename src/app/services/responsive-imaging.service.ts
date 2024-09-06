import { Injectable } from '@angular/core';
import { ImageType } from '../model/product';

@Injectable({
  providedIn: 'root'
})

export class ResponsiveImagingService {

  getResponsiveImaging(image:ImageType): string {
    const screenWidth = window.innerWidth

    if (screenWidth >= 768) {
      return image["desktop"];
    } else if (screenWidth >= 480) {
      return image["tablet"];
    } else {
      return image["mobile"];
    }
  }
}
