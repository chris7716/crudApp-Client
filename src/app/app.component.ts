import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  length: any;
  spacing: any;
  title = 'app';
  getData(message: any) {
    this.spacing = message.Spacing;
    this.length = message.Length;
  }
}
