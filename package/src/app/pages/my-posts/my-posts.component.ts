import {Component, OnInit} from '@angular/core';
import {AppBlogComponent} from "../../components/apps-blog/apps-blog.component";
import {PostPageResponse} from "../../services/post-service/model/PostPageResponse";
import {PostService} from "../../services/post-service/post.service";
import {ToastrService} from "ngx-toastr";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [
    AppBlogComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss'
})
export class MyPostsComponent implements OnInit{
  postPageResponse:PostPageResponse={}
  page:number=0
  size:number=4
  constructor(private postService:PostService,private toast:ToastrService) {
  }


  findMyPosts(){
    this.postService.getMyPost({page:this.page,size:this.size}).subscribe({
      next : response =>{
        this.postPageResponse = response
      },
      error: err =>{

      }
    })
  }
  goToFirstPage() {
    this.page = 0
    this.findMyPosts()
  }

  previous() {
    this.page--
    this.findMyPosts()
  }

  goToPage(pageIndex: number) {
    this.page=pageIndex
    this.findMyPosts()
  }

  goToNextPage() {
    this.page++
    this.findMyPosts()
  }

  goToLastPage() {
    this.page = this.postPageResponse.totalPages as number  -1
    this.findMyPosts()
  }
  get isLastPage(){
    return this.page == this.postPageResponse.totalPages as number -1
  }

  ngOnInit(): void {
    this.findMyPosts()
  }

}
