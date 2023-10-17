import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'projects/models/category.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy{
  cats: Category[] = [];
  sub$ = new Subject()
  constructor(private apiService: ApiService){}


  ngOnInit(): void{
    this.apiService.getAllCategories().pipe(
      takeUntil(this.sub$)
    ).subscribe(res => this.cats = res);
  //   ).subscribe(res => {this.cats = res.filter(c => c.title !== 'Work') nk hidekan
  // });
  }

  ngOnDestroy(): void {
    this.sub$.next(true);
    this.sub$.complete();
  }
}
