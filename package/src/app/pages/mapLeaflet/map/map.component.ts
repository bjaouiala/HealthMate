import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MedicalCenterService } from '../../../services/medical-center-service/medical-center.service';

L.Icon.Default.mergeOptions({
  iconUrl: 'assets/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl: 'assets/images/marker-shadow.png',
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private medicalCenterService: MedicalCenterService) {}

  ngAfterViewInit(): void {
    // Delay map initialization to ensure the view is completely rendered
    setTimeout(() => {
      this.initializeMap();
      this.addMedicalCenters();
    }, 0); // Using setTimeout to defer the initialization for one turn of the event loop
  }

  private initializeMap(): void {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      this.map = L.map(mapContainer).setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    } else {
      console.error('Map container not found');
    }
  }

  private addMedicalCenters(): void {
    const centers = this.medicalCenterService.getMedicalCenters();
    centers.forEach(center => {
      L.marker([center.lat, center.lng]).addTo(this.map)
        .bindPopup(center.name);
    });
  }
}
