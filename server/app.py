#import eventlet
#eventlet.monkey_patch()

from flask import Flask, request, jsonify
import time
import asyncio
from flask_socketio import SocketIO, emit, disconnect

from llm_interactor import LlmInteractor, LLM_TYPE
from errors import UNSUPPORTED_LLM

app = Flask(__name__)
# socketio = SocketIO(app,debug=True,cors_allowed_origins='*',async_mode='eventlet')
socketio = SocketIO(app,debug=True,cors_allowed_origins='*')

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
    print(f"time taken : {end-start}")
    
    response = {
        'answer' : f'{query_response}',
        'generation_time' :  f'{end-start}'
    }
    return jsonify(response), 200


@socketio.on("stream_response")
def generate_stream_response(message):
    
    async def stream_response_task(query, sid):
        start = time.time()
        async for chunk in llm_interactor.invoke_stream(query):
            socketio.emit('server_stream_response', {"data": chunk, "end" : False}, room=sid)
        
        end = time.time()
        print(f"time taken : {end-start}")
        socketio.emit('server_stream_response', {"end" : True, "time_taken" : end-start}, room=sid)
        
        socketio.sleep(0)
        disconnect(sid=sid)
        
    asyncio.run(stream_response_task(message, request.sid))


if __name__ == "__main__":
    #app.run(host="0.0.0.0", port=3000, debug=True)
    socketio.run(app, host='0.0.0.0', port=3000)

# TODO : need to figure out how to get the LLM to be running before requests are already accepted
# to save on time