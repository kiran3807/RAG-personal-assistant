from enum import Enum

from langchain_community.llms import Ollama
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

class LLM_TYPE(Enum):
    PHI = "phi3:medium-128k"
    YI = "yi:9b"
    LLAMA = "llama3:latest"


class LlmInteractor:
    def __init__(self):
        self.llm_type = LLM_TYPE.PHI
        self.llm = Ollama(model=self.llm_type.value)
        self.llm_stream = Ollama(model=self.llm_type.value, callback_manager=CallbackManager([StreamingStdOutCallbackHandler()]))
                                                           
    def set_llm_type(self, llm_type):
        if hasattr(LLM_TYPE, llm_type):
            self.llm_type = LLM_TYPE[llm_type]
            self.llm = Ollama(model=self.llm_type.value)
            self.llm_stream = Ollama(model=self.llm_type.value, callback_manager=CallbackManager([StreamingStdOutCallbackHandler()]))
        else:
            raise Exception("llm type not supported")
    
    def invoke(self, query):
        return self.llm.invoke(query)
    
    def invoke_stream(self, query):
        self.llm_stream.invoke(query)
         
