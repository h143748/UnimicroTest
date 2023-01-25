import { Component, EventEmitter, OnInit, Output, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact-response/contact';
import { ContactService } from 'src/services/contact.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateOrUpdateContactComponent } from '../create-or-update-contact/create-or-update-contact.component';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})

export class ContactTableComponent implements OnInit {
  allContacts! : Contact[];
  contacts! : Observable<Contact[] | undefined>;
  filter = new FormControl('', {nonNullable:true});


constructor(private contactService : ContactService, public dialog:MatDialog, public pipe : DecimalPipe, private modalService: NgbModal, private authService : AuthService){
  //this.refreshContacts();
}

ngOnInit(): void{
    this.getContacts();
}

//log out

logOut(){
  this.authService.logout();
}

// edit existing contact. 
// should add some nullcheckers etc. 

editContact(contact : Contact){
  const modalRef = this.modalService.open(CreateOrUpdateContactComponent);
  modalRef.componentInstance.contact = contact;

  modalRef.componentInstance.contactEvent.subscribe(() => this.getContacts())

}

// create new contact 
createContact(){

  const modalRef = this.modalService.open(CreateOrUpdateContactComponent);
  modalRef.componentInstance.contact = this.defaultContact();
  modalRef.componentInstance.contactEvent.subscribe(() => this.getContacts())
}

private defaultContact() : Contact {
  var newContact  : Contact = {
    ID: 0,
    InfoID: 0,
    Info: undefined,
    Role: undefined,
    Deleted: false
  }

  return newContact;
}


// 1 search 
private search(text: string, pipe: PipeTransform): Contact[] | undefined {

  if(!this.allContacts){
    console.log("returning no contacts")
    return;
  }
	return this.allContacts.filter((contact) => {
    const term = text.toLowerCase();
    console.log("returning filtered contacts");
		return (
      pipe.transform(contact.ID).includes(term) ||
			contact.Role?.toLowerCase().includes(term) ||
			contact.Info?.Name?.toLowerCase().includes(term) ||
			contact.Info?.DefaultEmail.EmailAddress.toLowerCase().includes(term) ||
			contact.Info?.InvoiceAddress?.City.toLowerCase().includes(term) ||
			contact.Info?.InvoiceAddress?.Country.toLowerCase().includes(term) ||
			contact.Info?.InvoiceAddress?.PostalCode.toLowerCase().includes(term) ||
			contact.Info?.InvoiceAddress?.AddressLine1.toLowerCase().includes(term) ||
			contact.Info?.DefaultPhone.Number.toLowerCase().includes(term) 
      );
	});
}

private getContacts(){
  console.log("Getting contacts! ")
  this.contactService.getContacts().subscribe(contact => {
    this.allContacts = contact;
    
    this.contacts = this.filter.valueChanges.pipe(
    startWith(''),
    map((text) => this.search(text, this.pipe)),
    );
  });
}


}




