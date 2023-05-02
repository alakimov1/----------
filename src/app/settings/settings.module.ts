import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { SettingsComponent }   from './settings.component';
import { RoomSettingsComponent } from './room.settings/room.settings.component';
import { LaminateSettingsComponent } from './laminate.settings/laminate.settings.component'

@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ SettingsComponent, RoomSettingsComponent, LaminateSettingsComponent ],
    bootstrap:    [ SettingsComponent ],
    exports:      [ SettingsComponent ]
})

export class SettingsModule { }