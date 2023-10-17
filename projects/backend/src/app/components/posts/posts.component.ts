import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Category } from 'projects/models/category.interface';
import { Post } from 'projects/models/post.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {


  posts: Post[] = [];
  subs: Subscription[] = [];
  categories: Category[] = [];

  constructor(private apiService: ApiService, 
              private message: MessageService){

  }

  ngOnInit(): void {
    // this.subs.push(this.apiService.getAllPosts().subscribe());
    this.subs.push(this.apiService.getAllPosts().subscribe(b => this.posts = b));
  }

  remove(rowIndex: number, id: number) {
    this.subs.push(
      this.apiService.removePost(id).subscribe(res => {
        if (res.success) {
          this.message.add({
            severity: 'success',
            detail: 'Posts Removed',
            life: 1000,
            summary: 'Successful'
          })
        }
        this.posts.splice(rowIndex, 1);
      })
    )
  }
}

interface CellEventResponse {
  data: { id: number, title: string, content: string }
  field: string
  index: number
}
