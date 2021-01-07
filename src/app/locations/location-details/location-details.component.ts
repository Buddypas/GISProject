import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from 'src/app/map.service';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit,OnDestroy {

  location:Location = null;
  locationSub: Subscription;
  constructor(private mapService:MapService) { }

  ngOnInit(): void {
    this.locationSub = this.mapService.activeLocationUpdated.subscribe((hasChanged) => {
      if(hasChanged) this.location = this.mapService.currentLocation;
    })
  }

  ngOnDestroy(): void {
    this.locationSub.unsubscribe();
  }

}
