import {PostResponse} from "./PostResponse";


export interface PostPageResponse{
  content?:Array<PostResponse>
  number?:number
  size?:number
  totalElement?:number
  totalPages?:number
  first?:number
  last?:number
}
