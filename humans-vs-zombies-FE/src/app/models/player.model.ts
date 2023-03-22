export interface Player {

    id: number;
    biteCode: string;
    human: boolean;
    is_patient_zero: boolean;
    state: playerState; //TODO: does this enum work?
    game: number;
    hvzuser_id: number;
}

export enum playerState {
    ADMINISTRATOR = "ADMINISTRATOR",
    NO_SQUAD = "NO_SQUAD",
    SQUAD_MEMBER = "SQUAD_MEMBER"
}
