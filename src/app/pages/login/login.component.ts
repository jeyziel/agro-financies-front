import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  public loginForm: FormGroup;
  public submitted: Boolean;
  public wrongLogin: Boolean;

  constructor(
    private authService: AuthService, 
    private readonly fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
    ) {
    
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, [ Validators.required, Validators.min(6)])
    });


  }

 

  

  ngOnInit() {


    

  

   // this.login();

   

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login(){

    this.submitted = true


    if (this.loginForm.invalid)
      return;

    

    const credencials = this.loginForm.value



    this.authService.login(credencials)
      .subscribe(
        res => {
          
          this.authService.add(res)
          this.toastr.success('Login Realizado com sucesso', 'BEM VINDO!');

          this.router.navigate(['/dashboard'])

          
        },
        err => {
          this.wrongLogin = true
        }
      )


  }

  ngOnDestroy() {

  }



}
