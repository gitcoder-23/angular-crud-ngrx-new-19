import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { getassociatelist } from '../../Store/Associate/Associate.Selector';
import { Associates } from '../../Store/Model/Associate.model';
import { loadassociate } from '../../Store/Associate/Associate.Action';

@Component({
  selector: 'app-associatelisting',
  standalone: false,
  templateUrl: './associatelisting.component.html',
  styleUrl: './associatelisting.component.css'
})
export class AssociatelistingComponent implements OnInit {

  AssociateList!: Associates[];

  constructor(
    private dialog: MatDialog, 
    // store called
    private store: Store,
  ){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    // Before always dispatch the action
    // this.store.dispatch(loadassociate())


    // this.store.select(getassociatelist).subscribe((items) => {
    //   console.log('getAssociate-items=>', items);
    //   this.AssociateList = items;
    //   console.log('AssociateList=>', this.AssociateList);

      
    // })
  }

  getAllAssociates() {


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
