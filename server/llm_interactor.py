from enum import Enum

from langchain_community.llms import Ollama

class LLM_TYPE(Enum):
    PHI3 : "phi3:medium-128k"
    YI : "yi:9b"
    LLAMA : "llama3:latest"


class LlmInteractor:
    def __init__(self):
        self.llm_type = LLM_TYPE.PHI3
        self.llm = Ollama(model=self.llm_type)
        
    def set_llm_type(llm_type):
        if hasattr(LLM_TYPE, llm_type):
            self.llm_type = llm_type
            self.llm = Ollama(model=self.llm_type)
        else:
            raise Exception("llm type not supported")
    
    def invoke(self, query):
        return self.llm.invoke(query)
         
