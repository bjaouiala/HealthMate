  import {Component, OnInit} from '@angular/core';
  import {PostPageResponse} from "../../services/post-service/model/PostPageResponse";
  import {PostService} from "../../services/post-service/post.service";
  import {ToastrService} from "ngx-toastr";
  import {AppBlogComponent} from "../../components/apps-blog/apps-blog.component";
  import {CommonModule} from "@angular/common";

  @Component({
    selector: 'app-post-list',
    standalone: true,
    imports: [
      AppBlogComponent,
      CommonModule
    ],
    templateUrl: './post-list.component.html',
    styleUrl: './post-list.component.scss'
  })
  export class PostListComponent implements OnInit{
    postPageResponse:PostPageResponse={}
    page:number=0
    size:number=4
    constructor(private postService:PostService,private toast:ToastrService) {
    }


    findAllPosts(){
      this.postService.getAllPost({page:this.page,size:this.size}).subscribe({
        next : response =>{
          this.postPageResponse = response
        },
        error: err =>{

        }
      })
    }
    goToFirstPage() {
      this.page = 0
      this.findAllPosts()
    }

    previous() {
      this.page--
      console.log(this.page)
      this.findAllPosts()
    }

    goToPage(pageIndex: number) {
      this.page=pageIndex
      this.findAllPosts()
    }

    goToNextPage() {
      this.page++
      console.log(this.page)
      this.findAllPosts()

    }

    goToLastPage() {
      this.page = this.postPageResponse.totalPages as number  -1
      this.findAllPosts()
    }
    get isLastPage(){
      return this.page == this.postPageResponse.totalPages as number -1
    }

    ngOnInit(): void {
      this.findAllPosts()
    }




  }
