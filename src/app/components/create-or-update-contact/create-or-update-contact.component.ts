import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ContactRequest } from '../../interfaces/contact-request/contact';
import { Contact } from '../../interfaces/contact-response/contact';
import { ContactService } from '../../../services/contact.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';


import { ContactTableComponent } from '../contact-table/contact-table.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-or-update-contact',
  templateUrl: './create-or-update-contact.component.html',
  styleUrls: ['./create-or-update-contact.component.css']
})
export class CreateOrUpdateContactComponent {

  @Input() contact! : Contact;
  @Output() contactEvent = new EventEmitter<string>();
  
  currentContact? : Contact ;
  Name : string | undefined;
  constructor(
    private contactService : ContactService,
    public activeModal : NgbActiveModal,
    public router:Router
  ) {}

  submit(data: any){
    if(this.currentContact?.ID){
      this.editContact(data)
    }else{
      this.createContact(data)
    }
  }

  private createContact(data: any){
    const newContact : ContactRequest ={
      Role: data.Role,
      Info: {
        Name: data.Name,
        DefaultEmail: {
          EmailAddress: data.EmailAddress
        },
        DefaultPhone: {
          Number: data.Number
        },
        InvoiceAddress: {
          AddressLine1: data.AddressLine1,
          PostalCode: data.PostalCode,
          City: data.City,
          Country: data.Country
      }
    }
  }
  this.contactService.createContact(newContact).subscribe(response =>{
   this.contactEvent.emit("contact edited")},
    err => console.log(err))
  }

  private editContact(contactInfo : any){
    const editContact : Contact = {

      ID:this.currentContact!.ID,
      Role: contactInfo.Role,
      Deleted:false,
      InfoID:this.currentContact!.InfoID,
      Info:{
        ID:this.currentContact!.InfoID,

        DefaultEmailID: this.currentContact?.Info?.DefaultEmailID,
        DefaultPhoneID: this.currentContact?.Info?.DefaultPhoneID,
        InvoiceAddressID: this.currentContact?.Info?.InvoiceAddressID,

        Name:contactInfo.Name,

        InvoiceAddress : {
          ID: this.currentContact?.Info?.InvoiceAddressID,
          AddressLine1: contactInfo.AddressLine1,
          PostalCode: contactInfo.PostalCode,
          City: contactInfo.City,
          Country: contactInfo.Country,
        },

        DefaultPhone:{
          ID:this.currentContact?.Info?.DefaultPhoneID,
          Number: contactInfo.Number
        },

        DefaultEmail:{
          ID:this.currentContact?.Info?.DefaultEmailID,
          EmailAddress:contactInfo.EmailAddress 
        }
      }
    }

    this.contactService.editContact(this.currentContact!.ID, editContact).subscribe(response => this.contactEvent.emit("contact edited"), err=> console.log(err));
  }

  ngOnInit(){
    this.currentContact = this.contact;
  }

  deleteContact(){
    const contactId = this.currentContact!.ID;
    if(contactId){
      this.contactService.deleteContact(contactId).subscribe(response => this.contactEvent.emit("contact edited"), err=> console.log(err));
    }
  }

}