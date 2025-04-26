import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  model = { username: '', newPassword: '' };

  constructor(private http: HttpClient) {}

  resetPassword() {
    this.http.post('http://localhost:7001/api/account/forgot-password', this.model, { responseType: 'text' })
      .subscribe({
        next: response => alert(response),
        error: err => {
          console.error(err);
          alert('Password reset failed: ' + err.message);
        }
      });
  }
  
  
}
