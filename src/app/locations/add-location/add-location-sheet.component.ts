import { Component, Inject,OnInit } from '@angular/core';
import { MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MapService } from 'src/app/services/map.service';

import { Location } from '../../models/location.model';


@Component({
  selector: 'app-add-location-sheet',
  templateUrl: './add-location-sheet.component.html',
  styleUrls: ['./add-location-sheet.component.css'],
})
export class AddLocationSheetComponent implements OnInit {
  location = new Location(this.data.lng, this.data.lat, '','','');
  categories = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {lng:number,lat:number},
    private bottomSheetRef: MatBottomSheetRef<AddLocationSheetComponent>,
    private mapService:MapService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.categories = this.mapService.categories;
  }

  onSubmit() {
    console.log(this.location);
    this.mapService.addLocation(this.authService.userData.value.userId,this.location).subscribe(response => {
      console.log("response from sheet: " + response);
      this.mapService.getMarkers();
      // this.mapService.locationsUpdated.next(true);
      this.bottomSheetRef.dismiss();
    })
  }
}
