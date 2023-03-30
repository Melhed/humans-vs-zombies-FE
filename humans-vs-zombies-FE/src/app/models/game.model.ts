export interface Game {
    id?: number;
    name: string;
    state?: string; //TODO: make this an enum??
    startTime: string;
    endTime: string;
    nwLat: number;
    nwLng: number;
    seLat: number;
    seLng: number;
    registeredPlayers?: number;
}
