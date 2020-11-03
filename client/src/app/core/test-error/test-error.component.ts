import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
 baseUrl  = environment.apiUrl;
 validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(): void
  {
     this.http.get(this.baseUrl + 'products/45').subscribe( (resp) => {
       console.log(resp);
     }, error => {
       console.log(error);
     });
  }
  get400Error(): void
  {
     this.http.get(this.baseUrl + 'buggy/badrequest').subscribe( (resp) => {
       console.log(resp);
     }, error => {
       console.log(error);
     });
  }
  get500Error(): void
  {
     this.http.get(this.baseUrl + 'buggy/servererror').subscribe( (resp) => {
       console.log(resp);
     }, error => {
       console.log(error);
     });
  }
  get400ValidationError(): void
  {
     this.http.get(this.baseUrl + 'products/45s').subscribe( (resp) => {
       console.log(resp);
     }, error => {
       this.validationErrors = error.error.errors;
       console.log(error);
     });
  }

}
