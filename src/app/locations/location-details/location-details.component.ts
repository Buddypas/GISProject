import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MapService } from 'src/app/services/map.service';
import { Location } from 'src/app/models/location.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
})
export class LocationDetailsComponent implements OnInit, OnDestroy {
  location: Location = null;
  locationSub: Subscription;
  rating = new FormControl('', [
    Validators.min(1),
    Validators.max(5),
    Validators.required,
  ]);
  constructor(
    private mapService: MapService,
    public authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.locationSub = this.mapService.activeLocationUpdated.subscribe(
      (hasChanged) => {
        if (hasChanged) this.location = this.mapService.currentLocation;
      }
    );
  }

  onDeleteClicked() {
    console.log('my id: ' + this.authService.userData.value.userId);
    console.log('creator id: ' + this.location.creatorId);
    this.mapService.deleteLocation(this.location.id).subscribe(
      (result) => {
        console.log(result);
        this._snackBar.open('Location deleted!', 'Close', {
          duration: 2500,
        });
        this.mapService.updateLocation(null);
        this.mapService.getMarkers();
      },
      (err: HttpErrorResponse) => {
        // console.log(err.error);
        alert(err.error.error);
      }
    );
  }

  onRateClicked() {
    console.log(this.rating);
    this.mapService.rateLocation(this.location.id, this.rating.value).subscribe(
      (result) => {
        this._snackBar.open('Location rated!', 'Close', {
          duration: 2500,
        });
      },
      (err: HttpErrorResponse) => {
        // console.log(err.error);
        alert(err.error.error);
      }
    );
  }

  getErrorMessage(): string {
    if (this.rating.hasError('required')) return 'This field is required';
    else if (
      this.rating.hasError('minlength') ||
      this.rating.hasError('maxlength')
    ) {
      return 'Invalid rating value';
    } else return null;
  }

  ngOnDestroy(): void {
    this.locationSub.unsubscribe();
  }
}
