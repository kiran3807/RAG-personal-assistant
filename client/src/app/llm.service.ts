import { Injectable } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlmService {
  
  answerSubscriber: Subscriber<string> | null = null;
  answerObservable: Observable<string>;
  constructor() { 
    this.answerObservable = new Observable(subscriber=> {
      this.answerSubscriber = subscriber;
    })
  }

  getLlmAnswerObservable() {
    return this.answerObservable;
  }

  async getLlmList(): Promise<{options : string[], selected : string}> {
    return {
      options : ["PHI", "YI", "LLAMA"],
      selected : "PHI"
    } 
  }

  queryLLM() {

    const dataIterator = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Lacus suspendisse faucibus interdum posuere lorem ipsum. Enim nec dui nunc mattis enim ut tellus. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Nullam non nisi est sit amet. Tellus in hac habitasse platea. Eleifend donec pretium vulputate sapien nec sagittis. Adipiscing commodo elit at imperdiet dui accumsan sit amet.",
      "\n\n Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Accumsan tortor posuere ac ut. Consectetur lorem donec massa sapien faucibus et molestie ac. Lectus vestibulum mattis ullamcorper velit. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Id volutpat lacus laoreet non curabitur gravida arcu. Duis at tellus at urna condimentum. Auctor elit sed vulputate mi sit amet mauris commodo quis. Lectus mauris ultrices eros in cursus turpis massa. Quam viverra orci sagittis eu volutpat odio. Vitae semper quis lectus nulla at volutpat diam ut. Nibh sit amet commodo nulla facilisi. Iaculis eu non diam phasellus. Consectetur lorem donec massa sapien faucibus. Consequat semper viverra nam libero justo laoreet sit amet. Semper auctor neque vitae tempus quam pellentesque nec nam. Et malesuada fames ac turpis.",
      "\n\n Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Accumsan tortor posuere ac ut. Consectetur lorem donec massa sapien faucibus et molestie ac. Lectus vestibulum mattis ullamcorper velit. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Id volutpat lacus laoreet non curabitur gravida arcu. Duis at tellus at urna condimentum. Auctor elit sed vulputate mi sit amet mauris commodo quis. Lectus mauris ultrices eros in cursus turpis massa. Quam viverra orci sagittis eu volutpat odio. Vitae semper quis lectus nulla at volutpat diam ut. Nibh sit amet commodo nulla facilisi. Iaculis eu non diam phasellus. Consectetur lorem donec massa sapien faucibus. Consequat semper viverra nam libero justo laoreet sit amet. Semper auctor neque vitae tempus quam pellentesque nec nam. Et malesuada fames ac turpis.",
    ].values();
    
    setInterval(()=> {
      const next = dataIterator.next();
      if(!next.done) {
        this.answerSubscriber?.next(next.value);
      }else {
        this.answerSubscriber?.complete();
      }
    }, 2000);
  }
}
