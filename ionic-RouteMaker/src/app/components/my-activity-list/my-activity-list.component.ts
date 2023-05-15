import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Actividad } from '../../models/actividades';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-activity-list',
  templateUrl: './my-activity-list.component.html',
  styleUrls: ['./my-activity-list.component.scss'],
})
export class MyActivityListComponent implements OnInit {

  activities: Actividad[] = [];
  user$ = this.userService.currentUserProfile$;
  showMap: boolean[] = [];
  subscription: Subscription = new Subscription();

  // Paginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  paginatedActivities: Actividad[] = [];
  pageIndex = 0;
  startIndex = 0;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.activities = user.activities || [];
        this.paginateActivities();
      }
    });
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  paginateActivities(event?: PageEvent): void {
    this.pageIndex = event ? event.pageIndex : 0;
    this.startIndex = this.pageIndex * this.pageSize;
    this.paginatedActivities = this.activities.slice(this.startIndex, this.startIndex + this.pageSize);
  }

  removeActivity(index: number): void {
    const confirmation = confirm('¿Está seguro de que desea eliminar esta actividad?');
    if (confirmation) {
      const activityIndex = this.startIndex + index;
      this.subscription = this.user$.subscribe(user => {
        if (user) {
          user.activities?.splice(activityIndex, 1);
          this.userService.updateUser(user);
          this.activities = user.activities || [];
          this.paginateActivities();
        }
        this.subscription.unsubscribe();
      });
    }
  }

}
