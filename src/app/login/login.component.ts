import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginForm } from '../Interfaces/UserInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: LoginForm = ({
    email: '',
    password: ''
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.userLogin).subscribe(data => {
      console.log(data)
    })
  }


}

