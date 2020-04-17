import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LodgingService } from './services/lodging/lodging.service';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, LayoutModule, HttpClientModule],
  providers: [LodgingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
