import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associates } from '../Store/Model/Associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  baseUrl = "http://localhost:3305/associate";

  constructor(private http: HttpClient) { }

  GetAllAssociate() {
    return this.http.get<Associates[]>(this.baseUrl);
  }

  GetAllAssociateByCode(code: number) {
    return this.http.get<Associates>(`${this.baseUrl}/${code}`);
  }


  deleteAssociateByCode(code: number) {
    return this.http.delete(`${this.baseUrl}/${code}`);
  }




  createAssociate(data:Associates) {
    return this.http.put(this.baseUrl, data);
  }


  updateAssociate(data:Associates) {
    return this.http.put(this.baseUrl+'/'+data.id, data);
  }
}
