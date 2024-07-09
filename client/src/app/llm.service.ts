import { Injectable } from '@angular/core';
import { Observable, Subscriber, of, map } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InternalStorageService, Details } from './internal-storage.service';

enum SockEvents {
  SEND = "stream_response",
  RECIEVE = "server_stream_response"
}

export const RESP_TERMINAL = "RESP_TERMINAL_NULL";

export type ActiveLlms = {options : string[], selected : string};
@Injectable({
  providedIn: 'root'
})
export class LlmService {
  
  answerSubscriber: Subscriber<string> | null = null;
  answerObservable: Observable<string>;
  socketConn: Socket;
  addr: string | null = null;

  constructor(
    private internalStorage: InternalStorageService, 
    private http: HttpClient
  ) { 

    this.addr = this.internalStorage.get(Details.ADDRESS);
    this.answerObservable = new Observable(subscriber=> {
      this.answerSubscriber = subscriber;
    });

    this.socketConn = io(`http://${this.addr}`);
    this.socketConn.on(SockEvents.RECIEVE, (resp)=> {
      if(resp.end) {
        this.answerSubscriber?.next(` (total time taken: ${resp.time_taken})`);
        this.answerSubscriber?.next(`${RESP_TERMINAL}`);
        //this.answerSubscriber?.complete();
      }else {
        this.answerSubscriber?.next(resp.data);
      }
    });
  }

  getLlmAnswerObservable() {
    return this.answerObservable;
  }

  getLlmList(): Observable<ActiveLlms> {

    return this.http.get<ActiveLlms>(`http://${this.addr}/api/get_llm_list`);
  }

  setLlm(llmType: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data = {
      llm_type: llmType
    }
    return this.http.post<any>(`http://${this.addr}/api/set_llm`, data, { headers }).pipe(
      map(res=>res.message)
    )
  }

  checkAddressValidity(addr: string) {
    return this.http.get(`http://${addr}/api/check_connection`);
  }

  queryLLM(query: string) {
    this.socketConn.emit(SockEvents.SEND, query);
  }
}
