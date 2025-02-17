import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addassociate',
  standalone: false,
  templateUrl: './addassociate.component.html',
  styleUrl: './addassociate.component.css'
})
export class AddassociateComponent implements OnInit {
  title = 'Create Associate'
  isedit = false;
  dialogdata: any;


  associateform!: FormGroup;  

  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddassociateComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {

  }  

  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;

    // Initialize the form inside ngOnInit()
    this.associateform = this.builder.group({
      id: this.builder.control(0),
      name: this.builder.control('', Validators.required),
      email: this.builder.control('', [Validators.required, Validators.email]),
      phone: this.builder.control('', Validators.required),
      address: this.builder.control('', Validators.required),
      type: this.builder.control('CUSTOMER'),
      group: this.builder.control('level1'),
      status: this.builder.control(true)
    });
  }

  ClosePopup() {
    this.ref.close()
  }

  SaveAssociate() {}
}
