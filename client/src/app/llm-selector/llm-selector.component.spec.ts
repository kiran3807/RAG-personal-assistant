import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmSelectorComponent } from './llm-selector.component';

describe('LlmSelectorComponent', () => {
  let component: LlmSelectorComponent;
  let fixture: ComponentFixture<LlmSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlmSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlmSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
