import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';

@Component({
  selector: 'app-associatelisting',
  standalone: false,
  templateUrl: './associatelisting.component.html',
  styleUrl: './associatelisting.component.css'
})
export class AssociatelistingComponent implements OnInit {
  constructor(private dialog: MatDialog){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  FunctionAdd() {
    this.OpenPopup(0, 'Create Associate');
  }

  OpenPopup(code: number, title: string){
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        code: code,
        title: title,
      }
    });

  }
}
