import { Component, Inject,OnInit } from '@angular/core';
import { MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { MapService } from 'src/app/map.service';
import { Category } from 'src/app/models/category.model';

import { Location } from '../../models/location.model';

@Component({
  selector: 'app-add-location-sheet',
  templateUrl: './add-location-sheet.component.html',
  styleUrls: ['./add-location-sheet.component.css'],
})
export class AddLocationSheetComponent implements OnInit {
  location = new Location(this.data.lng, this.data.lat, '','');
  categories: Category[] = [];
  categoriesSub: Subscription;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {lng:number,lat:number},
    private bottomSheetRef: MatBottomSheetRef<AddLocationSheetComponent>,
    private mapService:MapService
  ) {}

  ngOnInit(): void {
    this.categoriesSub = this.mapService.categoriesUpdated.subscribe(hasChanged => {
      if(hasChanged) {
        this.categories = this.mapService.categories;
        // console.log(this.categories);
      }
    })
    if(this.mapService.categories.length > 0) this.categories = this.mapService.categories;
    else this.mapService.getLocationCategories();
  }

  onSubmit() {
    console.log(this.location);
    this.mapService.addLocation(this.location).subscribe(response => {
      console.log("response from sheet: " + response);
      this.mapService.currentLocations.push(this.location);
      this.mapService.locationsUpdated.next(true);
      this.bottomSheetRef.dismiss();
    })
  }
}
