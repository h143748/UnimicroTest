import {Info} from "./info"
export interface Contact {
    ID: number,
    InfoID: number,
    Info: Info | undefined,
    Role:string | undefined,
    Deleted:boolean
}
