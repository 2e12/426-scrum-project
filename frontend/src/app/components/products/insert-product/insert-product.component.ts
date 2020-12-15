import {Component, OnInit, ViewChild} from '@angular/core';
import {MultiFileUploadComponent} from '../../file/multi-file-upload/multi-file-upload.component';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.scss'],
})
export class InsertProductComponent implements OnInit {
  @ViewChild(MultiFileUploadComponent) fileField: MultiFileUploadComponent;

  constructor() { }

  ngOnInit() {}

  upload(){
    const files = this.fileField.getFiles();
    const formData = new FormData();

    formData.append('somekey', 'some value'); // Add any other data you want to send

    files.forEach((file) => {
      formData.append('files[]', file.rawFile, file.name);
    });

    // POST formData to Server
  }

  submitProduct() {

  }
}
