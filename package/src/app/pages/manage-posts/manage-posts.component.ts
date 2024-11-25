import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PostRequest} from "../../services/post-service/model/PostRequest";
import {PostService} from "../../services/post-service/post.service";
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-manage-posts',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './manage-posts.component.html',
  styleUrl: './manage-posts.component.scss'
})
export class ManagePostsComponent {
  selectedPicture: string | undefined;
  postFile:any
  request: PostRequest = {};
  constructor(private postService:PostService,private router:Router
    ,private activateRoute:ActivatedRoute
    , private toastService:ToastrService) {
  }

  onFileSelected(event: any) {
    this.postFile = event.target.files[0]
    console.log(this.postFile)
    if (this.postFile){
      const reader = new FileReader()
      reader.onload = ()=>{
        this.selectedPicture = reader.result as string
      }
      reader.readAsDataURL(this.postFile)
    }


  }

  savePost() {
    this.postService.addPost(this.request).subscribe({
      next: (postId) => {
        this.postService.uploadFile(postId as number,this.postFile)
          .subscribe({
            next: () => {
              this.toastService.success("post has been successfully saved", "Done");
              this.router.navigate(['/posts/my-posts']);
            }
          });
      },
      error: (err) => {
        this.toastService.error("something went wrong","Oups !!")
      }
    });
  }


  // ngOnInit(): void {
  //   const bookId = this.activateRoute.snapshot.params['bookId']
  //   if (bookId){
  //     this.postService.getBookById({'book-id':bookId})
  //       .subscribe({
  //         next : (book)=>{
  //           this.bookRequest = {
  //             id : book.id,
  //             title: book.title as string,
  //             authorName: book.authorName as string,
  //             isbn: book.isbn as string,
  //             synopsis: book.synopsis as string,
  //             shareable: book.shareable
  //           }
  //           if (book.cover){
  //             this.selectedPicture = 'data:image/jpg;base64,'+book.cover
  //           }
  //         }
  //       })
  //   }
  // }

}
