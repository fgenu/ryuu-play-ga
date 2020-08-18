import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ptcg-edit-avatars-popup',
  templateUrl: './edit-avatars-popup.component.html',
  styleUrls: ['./edit-avatars-popup.component.scss']
})
export class EditAvatarsPopupComponent implements OnInit {

  public displayedColumns: string[] = ['default', 'image', 'name', 'actions'];
  public loading = false;
  public defaultAvatar: any;
  public avatars: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditAvatarsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { name: string },
  ) {
  }

  ngOnInit() {
    this.avatars.push({ id: 1, fileName: '', name: 'Default' });
    this.avatars.push({ id: 2, fileName: '', name: 'Default' });
    this.avatars.push({ id: 3, fileName: '', name: 'Default' });
  }

}