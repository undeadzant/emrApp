import { Injectable } from '@angular/core';
import { Emr } from './emr';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmrService {
  private emrecordsUrl = '/api/emrecords';

  constructor(private http: Http) { }

  // get emrecords
  getEmrecords(): Promise<void | Emr[]>{
    return this.http.get(this.emrecordsUrl)
      .toPromise()
      .then(response => response.json() as Emr[])
      .catch(this.handleError);
  }

  // post emrecords (create)
  createEmr(newEmr: Emr): Promise<void | Emr> {
    return this.http.get(this.emrecordsUrl)
      .toPromise()
      .then(response => response.json() as Emr)
      .catch(this.handleError);
  }

  // delete emrecords /api/emrecords/:id

  deleteEmr(delEmrID: String): Promise<void | String> {
    return this.http.delete(this.emrecordsUrl + '/' + delEmrID)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put update emrecords /api/emrecords/:id

  updateEmr(putEmr: Emr): Promise<void | Emr> {
    var putUrl = this.emrecordsUrl + '/' + putEmr._id;
    return this.http.put(putUrl, putEmr)
      .toPromise()
      .then(response => response.json() as Emr)
      .catch(this.handleError);
  }





  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
