import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ICategoryDialog} from '../dashboard.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './addCategory.component.html',
  styleUrls: ['./addCategory.component.less']
})
export class AddCategoryComponent {

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ICategoryDialog) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
