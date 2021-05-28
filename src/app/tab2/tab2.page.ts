import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{

  table: any;

  constructor(private timeTable: TimetableService) {}

  ngOnInit(){
    this.table = this.timeTable;
  }

}