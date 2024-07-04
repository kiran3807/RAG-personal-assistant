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
    
    const observer$ = this.llmService.queryLLM();
    observer$.subscribe(data=> {
      this.data = this.data + data;
    });
  }
}
