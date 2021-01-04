import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Location } from '../../models/location.model';

@Component({
  selector: 'app-add-location-sheet',
  templateUrl: './add-location-sheet.component.html',
  styleUrls: ['./add-location-sheet.component.css'],
})
export class AddLocationSheetComponent {
  location = new Location(-1, -1, '','');
  categories = [
    { id: 1, type: 'bar' },
    { id: 2, type: 'hotel' },
  ];
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddLocationSheetComponent>
  ) {}

  onSubmit() {
    console.log(this.location);
  }
}
