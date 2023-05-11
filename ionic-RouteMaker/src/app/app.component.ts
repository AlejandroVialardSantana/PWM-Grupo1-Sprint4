import { Component, OnInit, NgZone } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  loading = false;

  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
      } else {
        this.loading = true;
        setTimeout(() => {
          this.ngZone.run(() => {
            this.loading = false; 
          });
        }, 3000); 
        
      }
    });
  }
}
