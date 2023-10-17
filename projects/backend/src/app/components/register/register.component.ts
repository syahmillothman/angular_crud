import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'projects/tools/src/lib/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private apiService: ApiService,
    private messageService: MessageService,
    private router: Router){}

  ngOnInit(): void {}


  registerUser(register: NgForm) {

    const registerData = {firstname: register.value.firstname, 
                          lastname: register.value.lastname,
                          email: register.value.email, 
                          password: register.value.password,
                          confirm_password: register.value.confirm_password};

    if (registerData.password !== registerData.confirm_password) {
      this.messageService.add({
        severity: 'error',
        summary: `Password not match`,
          detail: `Please check your password again`,
          life: 1500
      })
    }else{
this.apiService.register(registerData.firstname, registerData.lastname, registerData.email, registerData.password).subscribe(
      (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Authentication successful',
            life: 1500
          });

          setTimeout( () => {
            this.router.navigateByUrl('/login').then();
          }, 1500)
        },
      (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: `Failed ${err.error.message}`,
            detail: `${err.statusText}`,
            life: 1500
        })
      }
    )
    }
    
    
  }

  }