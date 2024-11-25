import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../auth-service/base.service';
import { TokenService } from '../auth-service/token.service'; // Import TokenService

export interface MedicalCenter {
  id?: number;
  name: string;
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root',
})
export class MedicalCenterService {
  private readonly medicalCentersUrl = '/medical-centers'; // API endpoint

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
    private tokenService: TokenService // Inject TokenService
  ) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.token}`, // Add token to headers
    });
  }

  // Get all medical centers
  getMedicalCenters(): Observable<MedicalCenter[]> {
    return this.httpClient.get<MedicalCenter[]>(
      `${this.baseService.rootUrl}${this.medicalCentersUrl}`,
      { headers: this.headers }
    );
  }

  // Add a new medical center
  addMedicalCenter(center: MedicalCenter): Observable<MedicalCenter> {
    return this.httpClient.post<MedicalCenter>(
      `${this.baseService.rootUrl}${this.medicalCentersUrl}`,
      center,
      { headers: this.headers }
    );
  }

  // Update an existing medical center
  updateMedicalCenter(centerId: number, center: MedicalCenter): Observable<MedicalCenter> {
    return this.httpClient.put<MedicalCenter>(
      `${this.baseService.rootUrl}${this.medicalCentersUrl}/${centerId}`,
      center,
      { headers: this.headers }
    );
  }

  // Delete a medical center
  deleteMedicalCenter(centerId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.baseService.rootUrl}${this.medicalCentersUrl}/${centerId}`,
      { headers: this.headers }
    );
  }
}
