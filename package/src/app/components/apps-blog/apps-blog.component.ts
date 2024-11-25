import {Component, Input, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import {PostResponse} from "../../services/post-service/model/PostResponse";
import {CommonModule, DatePipe} from "@angular/common";
import {PostService} from "../../services/post-service/post.service";
import {CommentRequest} from "../../services/post-service/model/CommentRequest";
import {FormsModule} from "@angular/forms";
import {CommentResponse} from "../../services/post-service/model/CommentResponse";


interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, CommonModule,TablerIconsModule, MatButtonModule, MatIconModule, DatePipe, FormsModule],
  templateUrl: './apps-blog.component.html',
  styleUrl:'./apps-blog.component.scss'
})
export class AppBlogComponent implements OnInit{
  comments:Array<CommentResponse>=[]

  request:CommentRequest={}


  @Input()
  post:PostResponse={}
  private _postFile: string|undefined

  constructor(private postService:PostService) { }

  get postFile(): string | undefined {
    if (this.post.postFile){
      return 'data:image/jpg;base64,'+this.post.postFile

    }
    return this._postFile;
  }

  saveComment(id: number | undefined){
    this.request.postId = id
    this.postService.addComment(this.request).subscribe({
      next: res =>{
        this.comments.push(res)
        this.request.comment=''
        console.log("success")
      }
    })
  }

  ngOnInit(): void {
    this.postService.getAllCommentByPostId({postId:this.post.id}).subscribe({
      next: response =>{
        this.comments=response;
      }
    })
  }
}
