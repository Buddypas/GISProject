export class Location {
  id?: number;
  latitude: number;
  longitude: number;
  name: string;
  rating?:number;
  description?: string;
  categoryId?: number;

  constructor(
    longitude: number,
    latitude: number,
    name: string,
    description?: string,
    categoryId?: number,
    id?: number,
    rating?:number
  ) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.name = name;
    this.id = id;
    this.description = description;
    this.categoryId = categoryId;
    this.rating = rating;
  }
}
