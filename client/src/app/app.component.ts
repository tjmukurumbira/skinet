
import { Component, OnInit } from '@angular/core';
import {IProduct} from './shared/models/product';
import {IPagination} from './shared/models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {

  }
}