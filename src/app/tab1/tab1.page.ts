import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format, intervalToDuration, parseISO } from 'date-fns';
import { TimetableService } from '../timetable.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{

  data: any;
  table: any;
  curTime: any;
  startTime: Date;
  endTime: Date;
  project: string;
  note: string;
  clockedIn: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private timeTable: TimetableService, private http: HttpService) {
    this.clockedIn = false;
    //this.currentTime();
  }

  ngOnInit(){
    this.table = this.timeTable;

    if(typeof this.http.user == 'undefined') {
      this.http.getUser();
    }
  }

  currentTime(){
    var timeInterval = setInterval(function () {
      this.curTime = format(new Date(), 'p P');
    }.bind(this), 500)}

  clockIn(){
    this.startTime = parseISO(this.curTime);
    this.clockedIn = true;

    this.http.clockIn({
      startTime: this.startTime,
      project: this.project,
      note: this.note
    });
  }

  clockOut(){
    this.endTime = new Date();

    var slot: timeSlot = {
      startTime: this.startTime,
      endTime: this.endTime,
      totalTime: intervalToDuration({
      start: this.startTime,
      end: this.endTime
      }),
      project: this.project,
      note: this.note
    };

    this.table.addTime(slot);

    this.http.clockOut({
      endTime: this.endTime,
      project: this.project,
      note: this.note
    });

    delete this.startTime;
    delete this.endTime;

    this.clockedIn = false;
  }

  logout() {
    this.http.logout();
    this.router.navigate(['login']);
  }
}

interface timeSlot {
  startTime: Date;
  endTime: Date;
  totalTime: Duration;
  project: string;
  note: string;
}