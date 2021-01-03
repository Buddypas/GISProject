import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson } from '../models/map';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements OnInit {
  map: mapboxgl.Map;
  lat = 37.75;
  lng = -122.41;

  constructor(private mapService:MapService) {}

  ngOnInit(): void {
    this.initializeMap();
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
      center: [this.lng, this.lat]
    });
    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }
}
