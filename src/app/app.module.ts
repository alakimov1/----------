import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { SettingsModule } from './settings/settings.module';
import { VisualizationComponent } from './visualization/visualization.component';
import { ResultComponent } from './result/result.component'

@NgModule({
    imports:      [ BrowserModule, FormsModule, SettingsModule ],
    declarations: [ AppComponent, VisualizationComponent, ResultComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }