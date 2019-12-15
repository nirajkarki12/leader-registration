import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

// Models
import { Leader } from '../models/leader.model';

@Injectable({
  providedIn: 'root'
})
export class LeaderFormService {

  constructor(
    private fb: FormBuilder
  ) { }

  createForm(leader: Leader) {
    return this.fb.group({
        id: [leader.id],
        name: [leader.name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        gender: [leader.gender, [Validators.required]],
        email: [leader.email, [Validators.required, CustomValidators.email]],
        number: [leader.number, [Validators.required, CustomValidators.number, Validators.minLength(10), Validators.maxLength(10)]],
        address: [leader.address, [Validators.required]],
        image: [leader.image],
      });
  }
}
