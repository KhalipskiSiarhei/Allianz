import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AboutUsModule } from './features/about-us/about-us.module';
import { TodoModule} from './features/todo/todo.module';
import { HomeModule } from './features/home/home.module';
import { NotFoundModule } from './features/not-found/not-found.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AboutUsModule,
    TodoModule,
    HomeModule,
    NotFoundModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
