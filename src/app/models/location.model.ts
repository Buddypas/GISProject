export class Location {
  id?: number;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  categoryId?: number;

  constructor(
    longitude: number,
    latitude: number,
    name: string,
    description?: string,
    categoryId?: number,
    id?: number,
  ) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.name = name;
    this.id = id;
    this.description = description;
    this.categoryId = categoryId;
  }
}
