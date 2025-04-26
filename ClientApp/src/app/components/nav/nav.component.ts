import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/accountService';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule,RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  model: any = {}

  ngOnInit(): void { }

  constructor(private http: HttpClient,public accountService: AccountService,private router: Router) { }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigateByUrl('/list'); // Redirect to list after login
        }
      },
      error: (error) => {
        alert('Login failed: ' + error.error);
        console.error(error);
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/'); //  Redirect to home on logout
  }

}
