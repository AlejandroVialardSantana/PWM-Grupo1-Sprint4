export interface Actividad {
    id?: string,
    name: string,
    description: string,
    image: string,
    location: string,
    city: string,
    location_map: string,
    category: string[],
    user_reviews: any[],
    duration: number;
    price: number;
    specificNeeds: string[];
    stars: number;
    stars_array: boolean[];
}