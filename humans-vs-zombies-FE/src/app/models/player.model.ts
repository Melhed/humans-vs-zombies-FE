export interface Player {

    player_id: number;
    biteCode: string;
    is_human: boolean;
    is_patient_zero: boolean;
    state: playerState; //TODO: does this enum work?
    game_id: number;
    hvzuser_id: number;
    user: {
        id: number;
        firstName: string;
        lastName: string;
    };
}

export enum playerState {
    ADMINISTRATOR,
    NO_SQUAD,
    SQUAD_MEMBER
}
