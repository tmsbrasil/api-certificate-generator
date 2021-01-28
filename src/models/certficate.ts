export interface IParticipant {
    name: string;
    email: string;
}

interface IEvent {
    title: string;
    date: string;
    duration: string;
}

export type ICertificate = IEvent & IParticipant;