import { Component, AfterViewInit } from '@angular/core';
import { LlmService, ActiveLlms } from '../llm.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type LlmItem = {value: string, label: string}

@Component({
  selector: 'app-llm-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './llm-selector.component.html',
  styleUrl: './llm-selector.component.css'
})
export class LlmSelectorComponent implements AfterViewInit {

  llmList: LlmItem[] = [];
  selectedLlm: LlmItem = {value: "", label : ""};
  isDropDownOpen = false;
  showLoader = false;

  constructor(
    private llmService: LlmService, 
  ) {}

  getLlmList() {
    return this.llmList.filter(item=>item.value != this.selectedLlm.value)
  }

  changeLLM(llmItem: any) {
    
    this.showLoader = true;
    this.llmService.setLlm(llmItem.value).subscribe({
      next : (msg)=> {
        console.log(msg);
        this.selectedLlm = llmItem;
      },
      error : (err)=> {
        console.error(err);
      },
      complete: ()=> {
        this.showLoader = false;
      }
    });
    
  }

  toggleDropdown() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  ngAfterViewInit(): void {

      this.llmService.getLlmList().subscribe({
        next: (res: ActiveLlms)=>{
        
          this.llmList = res.options.map((el: string)=>{return {value: el, label: el}});
          const selectedLlm = this.llmList.find(el=>el.value === res.selected);
          if(!selectedLlm) {
            console.error("Could not set the selected LLM as server returned a non existent label");
          }else {
            this.selectedLlm = selectedLlm;
          }
        },
        error : (error: any)=> {
          console.error(error);
        }
      });
  }
}
