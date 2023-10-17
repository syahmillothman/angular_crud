import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { User } from 'projects/models/user.interface';
import { Router } from '@angular/router';
import { Post } from 'projects/models/post.interface';
import { Category } from 'projects/models/category.interface';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'http://localhost:3000';
  private authState$ = new BehaviorSubject<boolean>(false);

  private user: User = {
    id: -1,
    email: '',
    firstname: '',
    lastname: '',
    profilePic: '',
    roles: ''
  }
  private user$ = new BehaviorSubject<User>(this.user);

  constructor(private http: HttpClient,
              private router: Router) { 
    
  }

  
  getAuthState(){
    return this.authState$.asObservable();
  }

  getUserObservable(){
    return this.user$.asObservable();
  }

  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.URL}/posts`);
  }

  getPostBySlug(slug: string | null): Observable<Post>{
    return this.http.get<Post>(`${this.URL}/posts/slug/${slug}`);
  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.URL}/category`)
  }

  login(email: string, password: string){
    return this.http.post<any>(`${this.URL}/auth/login`,{email,password},{
      withCredentials: true
    }).pipe(
      tap((value) => {
        if(value.success){
          this.authState$.next(true);
          this.user$.next(value.user);
        }else{
          this.authState$.next(false);
        }
      })
    )
  }

  register(firstname: string, lastname: string, email:string, password: string) {

    return this.http.post(`${this.URL}/auth/register`, {firstname, lastname, email, password})
    .pipe();
  }

  createPost(formData: any): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, formData, {
      withCredentials: true
    });
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }

  uploadFile(form: FormData) {
    return this.http.post(`${this.URL}/posts/upload-photo`, form, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updatePost(slug:string, postData: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.URL}/posts/${slug}`, postData, {
      withCredentials: true
    });
  }

  createCategory(title: string, description: string) {
    return this.http.post<Category>(`${this.URL}/category`, {title, description}, {
      withCredentials: true
    })
  }

  updateCategory(id: number, title: string, description: string) {
    return this.http.patch<Category>(`${this.URL}/category/${id}`, {title, description}, {
      withCredentials: true
    })
  }

  removeCategory(id: number) {
    return this.http.delete<{ success: boolean, category: Category }>(`${this.URL}/category/${id}`, {
      withCredentials: true
    });
  }

  removePost(id: number) {
    return this.http.delete<{ success: boolean, category: Category }>(`${this.URL}/posts/${id}`, {
      withCredentials: true
    });
  }

  /*logout*/
  logout() {
    return this.http.post<{ success: boolean }>(`${this.URL}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(res => {
        this.user$.next({
          email: '',
          id: -1,
          firstname: '',
          lastname: '',
          profilePic: '',
          roles: ''
        })
        localStorage.removeItem('user');
      })
    );
  }

}
