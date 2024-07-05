import { Component, AfterViewInit } from '@angular/core';
import { LlmService } from '../llm.service';
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

  constructor(private llmService: LlmService) {}

  getLlmList() {
    return this.llmList.filter(item=>item.value != this.selectedLlm.value)
  }

  changeLLM(llmItem: any) {
    this.selectedLlm = llmItem;
    console.log("sending this to server: ", this.selectedLlm);
  }

  toggleDropdown() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  ngAfterViewInit(): void {

      this.llmService.getLlmList().then(res=> {
        
        this.llmList = res.options.map(el=>{return {value: el, label: el}});
        const selectedLlm = this.llmList.find(el=>el.value === res.selected);
        if(!selectedLlm) {
          console.error("Could not set the selected LLM as server returned a non existent label");
        }else {
          this.selectedLlm = selectedLlm;
        }
      }).catch(error=> {
        console.error(error);
      });
  }
}
