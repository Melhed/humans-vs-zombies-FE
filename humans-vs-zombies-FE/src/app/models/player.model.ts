export interface Player {
    player_id: number;
    bite_code: string;
    is_human: boolean;
    is_patient_zero: boolean;
    state: playerState; //TODO: does this enum work?
    game_id: number;
    hvzuser_id: number;
}

export enum playerState {
    ADMINISTRATOR,
    NO_SQUAD,
    SQUAD_MEMBER
}