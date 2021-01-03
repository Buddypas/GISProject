export class Location {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;

  constructor(
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    description?: string
  ) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.description = description;
  }
}
