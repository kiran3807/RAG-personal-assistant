import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

import { LlmSelectorComponent } from '../llm-selector/llm-selector.component';
import { ChatDisplayComponent } from '../chat-display/chat-display.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LlmSelectorComponent, ChatDisplayComponent, ChatInputComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  querySentObservable: Observable<boolean>;
  querySentSubscriber: Subscriber<boolean> | null = null;

  constructor(private router: Router) {
    this.querySentObservable = new Observable((subscriber)=> {
      this.querySentSubscriber = subscriber;
    });
  }
  onQuerySend() {
    if(this.querySentSubscriber) {
      this.querySentSubscriber.next(true);
    }
  }
  navigateConnectionInit(event: any) {
    this.router.navigate(['/']);
  }
}
