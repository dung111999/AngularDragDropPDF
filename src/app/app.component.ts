import { CdkDrag, CdkDragStart, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  PDFProgressData,
  PDFDocumentProxy,
  PDFSource,
} from 'ng2-pdf-viewer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pdfSrc: string | PDFSource;
  error: any;
  progressData: PDFProgressData;
  isLoaded = false;
  autoresize = true;
  renderText = false;
  stickToPage = true;
  showAll = true;
  zoom = 1.0;
  pdf: any;
  outline: any[];
  fitToPage = false;
  originalSize = true;
  rotation = 0;
  page = 1;
  showBorders: true;
  state = '';
  position = '';

  title = 'AngularDragDropPDF';

  onFileSelected() {
    const $pdf: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($pdf.files[0]);
    }
  }

  onProgress(progressData: PDFProgressData) {
    console.log(progressData);
    this.progressData = progressData;
    this.isLoaded = false;
    this.error = null; // clear error
  }

  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isLoaded = true;

    this.loadOutline();
  }

  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline = outline;
    });
  }

  onDragEnded(event) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    console.log('x: ' + (boundingClientRect.x - parentPosition.left), 'y: ' + (boundingClientRect.y - parentPosition.top));
  }

  getPosition(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  dragStarted(event: CdkDragStart<any[]>) {
    this.state = 'dragStarted';
  }

  dragEnded(event: CdkDragEnd<any[]>) {
    this.state = 'dragEnded';
    console.log(`State: ${this.state} ${this.position}`);
  }

  dragMoved(event: CdkDragMove<any[]>) {
    this.position = ` Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
  }


  // dragStart(event: CdkDragStart) {
  //   console.log("abc");
  // }

  // pagechanging(e: CustomEvent) {
  //   this.page = e.pageNumber; // the page variable
  // }
}
