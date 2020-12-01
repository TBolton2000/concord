interface SockUser {
    name: string;
    room: string;
    id: string;
    participantNo: number;
    active: boolean;
}

interface Room {
    id: string;
    users: SockUser[];
    data: string[];
}