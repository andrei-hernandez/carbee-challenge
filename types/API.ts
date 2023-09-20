import { IAppointment } from "./Appointment"

export interface ILoginResponse {
    token: string
}

export interface ILoginRequestBody {
    username: string
    password: string
}

export type Cursor = string

export type Edge<Node> = {
    node: Node
    cursor: Cursor
}

export type PageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    previousCursor: Cursor;
    nextCursor: Cursor
}

export type Connection<Node> = {
    edges: Edge<Node>[]
    pageInfo: PageInfo
}

export type AppointmentConnection = Connection<IAppointment>
