import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-location-sheet',
  templateUrl: './add-location-sheet.component.html',
  // styleUrls: ['./add-location.component.css']
})
export class AddLocationSheetComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<AddLocationSheetComponent>) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
