import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatDisplayComponent } from './chat-display/chat-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
