import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../class/Entities';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor( private httpClient:HttpClient ) { }


  getTable(tableName){
    return this.httpClient.post<Map<String,Object>[]>('http://localhost:8080/getTable',tableName);
    //return this.httpClient.get<Employee[]>('http://localhost:8080/entities');
  }

  getForeignKeyColumns(table){
    
    return this.httpClient.post<String>('http://localhost:8080/fkc',table);
     
  }

  getIds(table){
    return this.httpClient.post<String>('http://localhost:8080/idList',table);
  }

  getType(table){
    return this.httpClient.post<String>('http://localhost:8080/getDataType',table);
  }
  postRow(elem:String){
    return this.httpClient.post<String>("http://localhost:8080/a",elem)
  }
}

