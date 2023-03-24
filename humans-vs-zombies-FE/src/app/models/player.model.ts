export interface Player {

    id: number;
    state: PlayerState,
    isHuman: boolean;
    biteCode: string;
    isPatientZero?: boolean;
    user: string;
    game: number;
}


export enum PlayerState {
    ADMINISTRATOR = "ADMINISTRATOR",
    NO_SQUAD = "NO_SQUAD",
    SQUAD_MEMBER = "SQUAD_MEMBER",
    UNREGISTERED = "UNREGISTERED"
}
