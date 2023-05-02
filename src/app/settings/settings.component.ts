import { Component,Output,EventEmitter } from '@angular/core';
     
@Component({
    selector: 'settings-comp',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent { 

    roomWidth:number=0;
    roomLength:number=0;
    laminateWidth:number=0;
    laminateLength:number=0;
    laminateColors:string[] = ["#000000"];

    @Output() outputSettings = new EventEmitter();

    getRoomSize(size)
    {
        this.roomLength = size.length;
        this.roomWidth = size.width;
    }

    getLaminateSettings(settings)
    {
        this.laminateLength = settings.length;
        this.laminateWidth = settings.width;
        this.laminateColors=settings.colors;
    }

    settingsChanged()
    {
        const settings = 
        {
            roomLength:this.roomLength, 
            roomWidth:this.roomWidth,
            laminateLength:this.laminateLength,
            laminateWidth:this.laminateWidth,
            laminateColors:this.laminateColors
        }
        this.outputSettings.emit(settings);
    }

}