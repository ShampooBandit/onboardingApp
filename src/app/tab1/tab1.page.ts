import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format, intervalToDuration, formatDuration } from 'date-fns';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{

  data: any;
  table: any;
  curTime: string;
  startTime: Date;
  endTime: Date;
  clockedIn: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private timeTable: TimetableService) {
    this.clockedIn = false;
    this.currentTime();

    this.route.queryParams.subscribe(params => {
      console.log('params: ', params);

      if(this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  ngOnInit(){
    this.table = this.timeTable;
  }

  currentTime(){
    var timeInterval = setInterval(function () {
      this.curTime = format(new Date(), 'p P');
    }.bind(this), 500)}

  clockIn(){
    this.startTime = new Date();
    this.clockedIn = true;
  }

  clockOut(){
    this.endTime = new Date();

    var slot: timeSlot;
    slot.date = new Date();
    slot.startTime = this.startTime;
    slot.endTime = this.endTime;
    slot.totalTime = intervalToDuration({
      start: this.startTime,
      end: this.endTime
    });

    this.table.addTime(slot);

    delete this.startTime;
    delete this.endTime;

    this.clockedIn = false;
  }
}

interface timeSlot {
  date: Date;
  startTime: Date;
  endTime: Date;
  totalTime: Duration;
  project: string;
}