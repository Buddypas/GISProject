import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import mapboxgl from 'mapbox-gl';
import { AddLocationSheet } from '../locations/add-location/add-location.component';
import { MapService } from '../map.service';
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

  constructor(private mapService: MapService, private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    this.initializeMap();
    this.mapService.getMarkers();
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
    this._bottomSheet.open(AddLocationSheet);
  }
}
