import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MedicalCenter, MedicalCenterService } from '../../../services/medical-center-service/medical-center.service';

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
    // Initialize the map after the view is fully loaded
    setTimeout(() => {
      this.initializeMap();
      this.loadMedicalCenters();
    }, 0);
  }

  private initializeMap(): void {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      this.map = L.map(mapContainer).setView([51.505, -0.09], 13);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Ensure map is fully visible (fix for partial rendering)
      setTimeout(() => this.map.invalidateSize(), 0);

      // Add click event to dynamically add markers
      this.map.on('click', (event: L.LeafletMouseEvent) => {
        const name = prompt('Enter medical center name:');
        if (name) {
          const newCenter: MedicalCenter = {
            name,
            lat: event.latlng.lat,
            lng: event.latlng.lng
          };
          this.addMedicalCenter(newCenter);
        }
      });
    } else {
      console.error('Map container not found');
    }
  }

  private loadMedicalCenters(): void {
    this.medicalCenterService.getMedicalCenters().subscribe(
      (centers) => {
        if (centers && centers.length > 0) {
          const bounds = L.latLngBounds([]);
          centers.forEach((center) => {
            const marker = L.marker([center.lat, center.lng])
              .addTo(this.map)
              .bindPopup(center.name);
            bounds.extend(marker.getLatLng()); // Adjust map bounds to include the marker
          });
          this.map.fitBounds(bounds); // Automatically adjust map to fit all markers
        }
      },
      (error) => console.error('Error fetching medical centers:', error)
    );
  }

  private addMedicalCenter(newCenter: MedicalCenter): void {
    this.medicalCenterService.addMedicalCenter(newCenter).subscribe(
      () => {
        L.marker([newCenter.lat, newCenter.lng])
          .addTo(this.map)
          .bindPopup(newCenter.name);
        console.log('Medical center added successfully:', newCenter);
      },
      (error) => console.error('Error adding medical center:', error)
    );
  }
}
