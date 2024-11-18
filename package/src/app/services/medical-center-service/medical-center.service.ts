import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicalCenterService {
  getMedicalCenters() {
    return [
      { lat: 51.505, lng: -0.09, name: 'Medical Center 1' },
      { lat: 51.515, lng: -0.1, name: 'Medical Center 2' },
    ];
  }
}
