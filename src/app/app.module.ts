import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EmrDetailsComponent } from './emrecords/emrecords/emr-details/emr-details.component';
import { EmrListComponent } from './emrecords/emrecords/emr-list/emr-list.component';


@NgModule({
  declarations: [
    AppComponent,
    EmrDetailsComponent,
    EmrListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
