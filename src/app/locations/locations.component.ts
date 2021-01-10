import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from '../services/map.service';
import { Location } from '../models/location.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, OnDestroy {

  locations: Location [] = [];
  locationsSub: Subscription;
  constructor(private mapService:MapService) { }

  ngOnInit(): void {
    this.locationsSub = this.mapService.locationsUpdated.subscribe(hasChanged => {
      if(hasChanged) this.locations = [...this.mapService.currentLocations];
    })
  }

  ngOnDestroy(): void {
    this.locationsSub.unsubscribe();
  }

}
