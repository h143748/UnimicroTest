import {Email} from "./email"
import {Phone} from "./phone"
import {InvoiceAddress} from "./invoice-address"

export interface Info{
    Name?: string | undefined,
    InvoiceAddress?: InvoiceAddress | undefined,
    DefaultPhone?: Phone | undefined,
    DefaultEmail?: Email | undefined,
}