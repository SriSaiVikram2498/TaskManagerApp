import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/accountService';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // For routing

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService, private router: Router) {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/list'); //  Redirect after successful registration
      },
      error: error => console.log(error)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
