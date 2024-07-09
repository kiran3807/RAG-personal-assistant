import { Component, EventEmitter, Output } from '@angular/core';

import { LlmService } from '../llm.service';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent {
  @Output() queryEvent = new EventEmitter<boolean>();

  constructor(private llmService: LlmService) {}

  sendQuery(query: string) {
    this.llmService.queryLLM(query);
    this.queryEvent.emit(true);
  }
}
