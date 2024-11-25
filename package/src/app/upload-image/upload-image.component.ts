import {Component, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {UploadImageService} from "../services/upload-image/upload-image.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatButton,
    FormsModule
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
  providers: [UploadImageService]
})
export class UploadImageComponent implements OnInit{
  selectedPicture: any;
  picture : string;

  constructor(private uploadImage : UploadImageService) {
  }
  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedPicture=event.target.files[0]
    if (this.selectedPicture){
      const reader = new FileReader()
      reader.onload=()=>{
        this.picture=reader.result as string
      }
      reader.readAsDataURL(this.selectedPicture)
    }
    else {console.error('No file selected!');
    }
  }

  uploadImages() {
    this.uploadImage.uplaoadImage(this.selectedPicture).subscribe(
      {
        next:res=>{

        }
      }
    )
  }
}

