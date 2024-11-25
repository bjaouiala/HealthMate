import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageParams} from "../auth-service/model/authenticationModel/PageParams";
import {BaseService} from "../auth-service/base.service";
import {PostRequest} from "./model/PostRequest";
import {CommentRequest} from "./model/CommentRequest";
import {CommentResponse} from "./model/CommentResponse";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly postUrl:string="/posts"
  private readonly myPostUrl:string="/posts/my-post"
  private readonly mUploadPostUrl:string="/posts/post-file"
  private readonly commentUrl:string="/comments"

  constructor(private http:HttpClient,private baseUrl:BaseService) { }


  getAllPost(param:PageParams){
    return this.http.get(`${this.baseUrl.rootUrl}${this.postUrl}`,{params:{...param}})
  }

  getMyPost(param:PageParams){
    return this.http.get(`${this.baseUrl.rootUrl}${this.myPostUrl}`,{params:{...param}})
  }

  addPost(request:PostRequest){
    return this.http.post(`${this.baseUrl.rootUrl}${this.postUrl}`,request)
  }

  uploadFile(postId:number,file:File | null){
    const form = new FormData()
    if (file != null){
      form.append('file',file)
    }
    return this.http.post(`${this.baseUrl.rootUrl}${this.mUploadPostUrl}/${postId}`,form)
  }

  addComment(request:CommentRequest){
    return this.http.post<CommentResponse>(`${this.baseUrl.rootUrl}${this.commentUrl}`,request)
  }

  getAllCommentByPostId(postId:PostParam){
    return this.http.get<Array<CommentResponse>>(`${this.baseUrl.rootUrl}${this.commentUrl}`,{params:{...postId}})
  }

}

export interface PostParam{
  postId?:number
}
