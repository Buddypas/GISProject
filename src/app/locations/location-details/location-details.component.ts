import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MapService } from 'src/app/services/map.service';
import { Location } from 'src/app/models/location.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit,OnDestroy {

  location:Location = null;
  locationSub: Subscription;
  rating = new FormControl('',[Validators.min(1),Validators.max(5)]);
  constructor(private mapService:MapService) { }

  ngOnInit(): void {
    this.locationSub = this.mapService.activeLocationUpdated.subscribe((hasChanged) => {
      if(hasChanged) this.location = this.mapService.currentLocation;
    })
  }

  onRateClicked() {
    // console.log(this.rating);
    this.mapService.rateLocation(this.location.id,this.rating.value).subscribe((result) => {
      alert(result.message);
    },
    (err:HttpErrorResponse) => {
      // console.log(err.error);
      alert(err.error.error);
    });
  }

  ngOnDestroy(): void {
    this.locationSub.unsubscribe();
  }

}
