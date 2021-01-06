import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { AddLocationSheetComponent } from '../locations/add-location/add-location-sheet.component';
import { MapService } from '../map.service';
import { Location } from '../models/location.model';
import { GeoJson } from '../models/map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  lat = 37.75;
  lng = -122.41;
  locationsSub: Subscription;
  locations: Location[] = [];

  constructor(
    private mapService: MapService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeMap();
    this.locationsSub = this.mapService.locationsUpdated.subscribe(
      (hasChanged) => {
        if (hasChanged) {
          if (
            this.mapService.currentLocations.length > this.locations.length &&
            this.locations.length > 0
          )
            this._snackBar.open('Location added!', 'Close', { duration: 2500 });
          this.locations = [...this.mapService.currentLocations];
          this.loadMarkers();
        }
      }
    );
    this.mapService.getMarkers();
  }

  private loadMarkers() {
    this.locations.forEach(loc =>
      new mapboxgl.Marker()
        .setLngLat([loc.longitude,loc.latitude])
        .addTo(this.map)
    )
  }

  private initializeMap() {
    /// locate the user
    this.buildMap();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat],
        });
      });
    }
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13,
      center: [this.lng, this.lat],
    });
    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    //// Add Marker on Click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      console.log(
        'longitude:' + coordinates[0] + ', latitude: ' + coordinates[1]
      );
      this.lng = coordinates[0];
      this.lat = coordinates[1];

      const marker = new mapboxgl.Marker()
        .setLngLat([coordinates[0], coordinates[1]])
        .addTo(this.map);
      this.openBottomSheet();
    });
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates,
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(AddLocationSheetComponent, {
      data: { lng: this.lng, lat: this.lat },
    });
  }
}
