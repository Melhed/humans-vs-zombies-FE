export interface Player {

    id: number;
    state: string,
    biteCode: string;
    isHuman: boolean;
    isPatientZero?: boolean;
    user: string;
    game: number;
    hvzuser_id: number;
}


export enum playerState {
    ADMINISTRATOR,
    NO_SQUAD,
    SQUAD_MEMBER,
    UNREGISTERED
}
