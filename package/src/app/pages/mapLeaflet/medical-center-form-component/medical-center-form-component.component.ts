import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalCenterService, MedicalCenter } from '../../../services/medical-center-service/medical-center.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-medical-center-form',
  templateUrl: './medical-center-form-component.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./medical-center-form-component.component.scss']
})
export class MedicalCenterFormComponent implements OnInit {
  center: MedicalCenter = { name: '', lat: 0, lng: 0 };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private medicalCenterService: MedicalCenterService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadMedicalCenter(Number(id));
    }
  }

  private loadMedicalCenter(id: number): void {
    this.medicalCenterService.getMedicalCenters().subscribe(centers => {
      const center = centers.find(c => c.id === id);
      if (center) this.center = center;
    });
  }

  saveCenter(): void {
    if (this.isEditMode) {
      // Call the update API here
      this.medicalCenterService.updateMedicalCenter(this.center.id!, this.center).subscribe(() => {
        console.log('Medical center updated successfully');
        // Navigate to map or show success message
      });
    } else {
      // Call the add API here
      this.medicalCenterService.addMedicalCenter(this.center).subscribe(() => {
        console.log('Medical center added successfully');
        // Navigate to map or show success message
      });
    }
  }
}

