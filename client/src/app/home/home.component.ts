import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

}
