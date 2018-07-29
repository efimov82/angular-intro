import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
