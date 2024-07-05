import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatDisplayComponent } from './chat-display/chat-display.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { LlmSelectorComponent } from './llm-selector/llm-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, ChatDisplayComponent, ChatInputComponent, 
    LlmSelectorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
