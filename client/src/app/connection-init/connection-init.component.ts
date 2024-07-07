import { Component, OnInit } from '@angular/core';
import { LlmService } from '../llm.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { InternalStorageService, Details } from '../internal-storage.service';

@Component({
  selector: 'app-connection-init',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './connection-init.component.html',
  styleUrl: './connection-init.component.css'
})
export class ConnectionInitComponent implements OnInit{

  address: string | null = null;
  form: FormGroup;

  constructor(
    private llmService: LlmService, 
    fb: FormBuilder, 
    private router: Router,
    private internalStorage: InternalStorageService
  ) {
    this.form = fb.group(
      {
        llmAddress : ['', [Validators.required, Validators.minLength(1)]]
      },
      {
        asyncValidators : [validateLlmConnection],
        updateOn: "blur"
      }
    );
  }

  ngOnInit(): void {}

  async onSubmit() {

    if(!this.form.pristine && (this.form.get("llmAddress")?.valid && !this.form.errors?.["input-address"]) && !this.form.pending) {
      this.internalStorage.set(Details.ADDRESS, this.form.get("llmAddress")?.value);
      this.router.navigate(['/home']);
    }
  }
}

function validateLlmConnection(control: AbstractControl): Promise<ValidationErrors> {

  const addr = control.get("input-address");
  return new Promise((res, rej)=> {
    setTimeout(()=> {
      res({ invalidAddress : true});
    }, 2000);
  });
}