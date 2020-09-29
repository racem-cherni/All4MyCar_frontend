
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  @ViewChild('dt') table: Table;
  constructor() { }

  ngOnInit() {
    
  }

}
