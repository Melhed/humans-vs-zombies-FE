import { SquadMember } from "./squad-member.model";

export interface SquadDetails {
    id: number;
    name: string;
    isHuman: boolean;
    squadMembers: SquadMember[];
}
