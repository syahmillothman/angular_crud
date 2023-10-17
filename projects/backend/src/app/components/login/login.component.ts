import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'projects/tools/src/lib/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private router: Router){}

  ngOnInit(): void {
    
  }

  userLogin(login: NgForm){
    if(login.invalid){
      return;
    }

    const loginData = {email: login.value.email, password: login.value.password};

    // api service for auth
    this.apiService.login(loginData.email, loginData.password).subscribe(
      (res) => {
        if(res.user.roles === 'Admin' && res.success){
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Authentication successful',
            life: 1500
          });

          setTimeout( () => {
            this.router.navigateByUrl('/dashboard').then();
          }, 1500)
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Failed Attemp',
            detail: 'You are not Authentication',
            life: 1500
          });
        }
      },
      (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
            summary: `Failed ${err.status}`,
            detail: `${err.statusText}`,
            life: 1500
        })
      }
    )
  }
}
