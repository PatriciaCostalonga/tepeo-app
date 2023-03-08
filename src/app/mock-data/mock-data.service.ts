import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const mockData = [
  { 
    id: "section1",
    title: 'Heating your home, not the planet', 
    description: 'The future of green sustainable heating is already here', 
    imageSrc: '.././assets/image_1.png', 
    blob: '.././assets/blob_1.svg'
  },
  { 
    id: "section2",
    title: 'The future of heating is clean, green and affordable', 
    description: 'Our patent pending Zero Emission Boiler (ZEB) technology is revolutionising the way we heat our homes', 
    imageSrc: '.././assets/image_2.png', 
    blob: '.././assets/blob_2.svg'
  },
  { 
    id: "section3",
    title: 'Use the power you generate', 
    description: 'If you have rooftop solar PV a ZEB can automatically store excess electricity produced so you don’t unnecessarily export it to the grid', 
    imageSrc: '.././assets/image_3.png', 
    blob: '.././assets/blob_3.svg'
  }
];

@Injectable({
  providedIn: 'root'
})

export class MockDataService {
  constructor() { }

  getMockData(): Observable<any[]> {
    return of(mockData).pipe(delay(1000)); 
  }
}

