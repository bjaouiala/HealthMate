import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../auth-service/token.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UploadImageService {

  private apiUrl = 'http://localhost:8080/api/v1/uploadImages';

  constructor(private http: HttpClient,private tokenService : TokenService) {
  }

  uplaoadImage(file:File | null):Observable<any> {
    const formData = new FormData();

    if (file != null){
      formData.append("image",file);
    }
    return this.http.post(this.apiUrl,formData)
  }
}
