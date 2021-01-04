import { Component, Inject,OnInit } from '@angular/core';
import { MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { Location } from '../../models/location.model';

@Component({
  selector: 'app-add-location-sheet',
  templateUrl: './add-location-sheet.component.html',
  styleUrls: ['./add-location-sheet.component.css'],
})
export class AddLocationSheetComponent implements OnInit {
  location = new Location(-1, -1, '','');
  categories = [
    { id: 1, type: 'bar' },
    { id: 2, type: 'hotel' },
  ];
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {lng:number,lat:number},
    private _bottomSheetRef: MatBottomSheetRef<AddLocationSheetComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data.lng + ',' + this.data.lat);
  }

  onSubmit() {
    console.log(this.location);
  }
}
