import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'projects/tools/src/lib/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  constructor(private apiService: ApiService,
    private router: Router,
    private message: MessageService) {
}

  ngOnInit(): void {
    
  }

  logout() {
    this.apiService.logout().subscribe(res => {
      if (res.success) {
        this.message.add({
          severity: 'info',
          summary: 'Successful',
          detail: 'Logged out',
          life: 1500
        });
       setTimeout(()=>{
         this.router.navigateByUrl('/login').then();
       },1500);

      }
    })
  }

}
