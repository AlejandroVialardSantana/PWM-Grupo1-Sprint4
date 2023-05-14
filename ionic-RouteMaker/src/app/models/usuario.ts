import { Actividad } from "./actividades";

export interface Usuario {
    uid: string;
    email?: string;
    displayName?: string;
    displaySurname?: string;
    name?: string;
    surname?: string;
    photoURL?: string;
    activities?: Actividad[];
    password?: string;
}
