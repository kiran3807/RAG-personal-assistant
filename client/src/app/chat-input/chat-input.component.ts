import { Component } from '@angular/core';

import { LlmService } from '../llm.service';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent {

  constructor(private llmService: LlmService) {}

  sendQuery(query: string) {
    this.llmService.queryLLM();
  }
}
