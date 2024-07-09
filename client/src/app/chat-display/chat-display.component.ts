import { Component, AfterViewInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LlmService, RESP_TERMINAL } from '../llm.service';
import { Observable } from 'rxjs';

enum DisplayStates {
  PRISTINE,
  LOADING,
  WRITING,
  END
}
@Component({
  selector: 'app-chat-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-display.component.html',
  styleUrl: './chat-display.component.css'
})
export class ChatDisplayComponent implements AfterViewInit {
  data = "";
  displayState = DisplayStates.PRISTINE;
  @Input()querySent: Observable<boolean> | null = null;

  constructor(private llmService: LlmService) {}

  ngAfterViewInit() {
    const answerObservable = this.llmService.getLlmAnswerObservable();
    
    if(this.querySent) {
      this.querySent.subscribe({
        next: (event)=> {
          if(
            this.displayState === DisplayStates.PRISTINE || 
            this.displayState === DisplayStates.END
          ) {
            this.displayState = DisplayStates.LOADING;
            this.data = "FETCHING RESPONSE.....";
          }
        }
      });
    }

    answerObservable.subscribe({
      next: (value)=> {
        
        switch(this.displayState) {

          case DisplayStates.PRISTINE:
            this.displayState = DisplayStates.WRITING;
            this.data = value;
            break;
          case DisplayStates.LOADING:
            if(value === RESP_TERMINAL) {
              this.displayState = DisplayStates.END;
              break;
            }
            this.data = value;
            this.displayState = DisplayStates.WRITING;
            break;
          case DisplayStates.WRITING:
            if(value === RESP_TERMINAL) {
              this.displayState = DisplayStates.END;
              break;
            }
            this.data = this.data + value;
            break;
          case DisplayStates.END:
            this.data = value;
            this.displayState = DisplayStates.WRITING;
            break;
        }
      },
      error: (err)=> {
        console.log("Error while chatting with LLM");
      }
    });
  }

  clearScreen() {
    this.data = "";
    this.displayState = DisplayStates.PRISTINE;
  }
}
