import { Component, OnInit, VERSION } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { S3 } from 'aws-sdk';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  htmlContent: any = '';

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    //this.htmlContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.id);
  }

  private getS3Bucket(): any {
    const bucket = new S3({
      accessKeyId: 'AKIAQ546BEUDTCZ57PRA',
      secretAccessKey: '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',
      region: 'us-east-2',
    });
    return bucket;
  }

  getData() {
    const params = {
      Bucket: 'sambuckettest4',
      Key: 'files/demo1.html',
    };
    var thisObj = this;
    this.getS3Bucket().getObject(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }
      console.log('Successfully get files.', data);
      thisObj.setHTML(data);
    });
  }

  setHTML(htmlObj) {
    debugger;
    console.log('htmlObj :: ', htmlObj);
    this.htmlContent = this.sanitizer.bypassSecurityTrustResourceUrl(htmlObj);

    this.htmlContent = htmlObj;
    // this.htmlContent = URL.createObjectURL(htmlObj.Body);

    var binaryData = [];
    binaryData.push(htmlObj.Body);
    this.htmlContent = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(
      new Blob(binaryData, { type: 'text/html' })
    ));
    console.log('this.htmlContent :: ', this.htmlContent);
    // var href = this.request.httpRequest.endpoint.href;
    // var bucketUrl = href + albumBucketName + '/';
    // var photoUrl = bucketUrl + encodeURIComponent(photoKey);
    // this.htmlContent = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   'https://sambuckettest4.s3.us-east-2.amazonaws.com/files/demo1.html'
      
    // );
  }

  //sanitizeURL()
}
