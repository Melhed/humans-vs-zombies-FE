export interface Player {

    id: number;
    biteCode: string;
    isHuman: boolean;
    is_patient_zero: boolean;
    state: playerState; //TODO: does this enum work?
    game: number;
    hvzuser_id: number;
}


export enum playerState {
    ADMINISTRATOR,
    NO_SQUAD,
    SQUAD_MEMBER,
    UNREGISTERED
}
