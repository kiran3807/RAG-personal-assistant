import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LlmService } from '../llm.service';

@Component({
  selector: 'app-chat-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-display.component.html',
  styleUrl: './chat-display.component.css'
})
export class ChatDisplayComponent implements AfterViewInit {
  data = "";
  constructor(private llmService: LlmService) {}

  ngAfterViewInit() {
    const answerObservable = this.llmService.getLlmAnswerObservable();
    answerObservable.subscribe({
      next: (value)=> {
        this.data = this.data + value;
      },
      error: (err)=> {
        console.log("Error while chatting with LLM");
      }
    });
  }

  clearScreen() {
    this.data = "";
  }
}
