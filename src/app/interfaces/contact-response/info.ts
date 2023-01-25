import {Email} from "./email"
import {Phone} from "./phone"
import {InvoiceAddress} from "./invoice-address"

export interface Info{
    ID: number,
    Name?: string,
    InvoiceAddressID: number | undefined,
    DefaultPhoneID: number | undefined,
    DefaultEmailID: number | undefined,
    InvoiceAddress: InvoiceAddress | undefined,
    DefaultPhone: Phone,
    DefaultEmail: Email,
}