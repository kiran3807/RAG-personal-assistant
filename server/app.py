from flask import Flask, request, jsonify
import time

from llm_interactor import LlmInteractor, LLM_TYPE
from errors import UNSUPPORTED_LLM

app = Flask(__name__)


llm_interactor = LlmInteractor()

@app.route('/api/set_llm', methods=['POST'])
def set_llm():
    try:
        llm_type = request.get_json().get("llm_type")
        llm_interactor.set_llm_type(llm_type)
        response = {
            "message" : f"LLM set to {LLM_TYPE[llm_type].value}"
        }
        return jsonify(response), 200
    
    except Exception as e:
        response = {
            "error" : UNSUPPORTED_LLM.get("error"),
            "code" : UNSUPPORTED_LLM.get("code")
        }
        return jsonify(response), 400
    
    

@app.route('/api/generate_response', methods=['POST'])
def generate_response():
    body = request.get_json()
    
    start = time.time()
    query_response = llm_interactor.invoke(body.get('query'))
    end = time.time()
    #print(f"time taken : {end-start}")
    
    response = {
        'answer' : f'{query_response}',
        'generation_time' :  f'{end-start}'
    }
    return jsonify(response), 200

if __name__ == "__main__":
    # app.run(host="0.0.0.0", port=3000, debug=True)
    llm_interactor.invoke_stream("The first man on the moon was")
