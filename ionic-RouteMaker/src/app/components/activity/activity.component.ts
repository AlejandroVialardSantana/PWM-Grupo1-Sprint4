import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Actividad } from 'src/app/models/actividades';
import { Router } from '@angular/router';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, OnChanges {
  
  @Input() activities: Actividad[] = [];
  paginatedActivities: Actividad[] = [];

  // Paginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [5];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.processActivities();
    this.paginateActivities();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activities'] && changes['activities'].currentValue !== changes['activities'].previousValue) {
      this.processActivities();
      this.paginateActivities();
    }
  }

  processActivities(): void {
    this.activities.forEach(activity => {
      activity.stars_array = new Array(5).fill(false);
      for (let i = 0; i < activity.stars; i++) {
        activity.stars_array[i] = true;
      }
    });
  }

  paginateActivities(event?: PageEvent): void {
    const startIndex = event ? event.pageIndex * event.pageSize : 0;
    this.paginatedActivities = this.activities.slice(startIndex, startIndex + this.pageSize);
  }

  navigateToActivityDescription(activity: Actividad): void {
    this.router.navigate([`/activityDescription/${activity.id}`]);  
  }
  
}