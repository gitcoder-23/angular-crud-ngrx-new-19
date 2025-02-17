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

  GetAssociateByCode(code: number) {
    return this.http.get<Associates>(`${this.baseUrl}/${code}`);
  }


  DeleteAssociateByCode(code: number) {
    return this.http.delete(`${this.baseUrl}/${code}`);
  }




  CreateAssociate(data:Associates) {
    return this.http.put(this.baseUrl, data);
  }


  UpdateAssociate(data:Associates) {
    return this.http.put(this.baseUrl+'/'+data.id, data);
  }
}
