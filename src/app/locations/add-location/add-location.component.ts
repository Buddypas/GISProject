import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  // styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent {

  constructor(private _bottomSheet: MatBottomSheet) { }

  openBottomSheet(): void {
    this._bottomSheet.open(AddLocationSheet);
  }

}

@Component({
  selector: 'app-add-location-sheet',
  templateUrl: './add-location-sheet.html',
  // styleUrls: ['./add-location.component.css']
})
export class AddLocationSheet {

  constructor(private _bottomSheetRef: MatBottomSheetRef<AddLocationSheet>) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
