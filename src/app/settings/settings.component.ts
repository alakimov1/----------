import { Component,Output,EventEmitter } from '@angular/core';
     
@Component({
    selector: 'settings-comp',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent { 

    roomWidth:number=1;
    roomLength:number=1;
    laminateWidth:number=1;
    laminateLength:number=1;
    laminateColors:string[] = ["#000000"];

    @Output() outputSettings = new EventEmitter();

    getRoomSize(size)
    {
        this.roomLength = size.length;
        this.roomWidth = size.width;
        this.settingsChanged();
    }

    getLaminateSettings(settings)
    {
        this.laminateLength = settings.length;
        this.laminateWidth = settings.width;
        this.laminateColors=settings.colors;
        this.settingsChanged();
    }

    settingsChanged()
    {
        if (this.roomLength>0
            && this.roomWidth>0
            && this.laminateLength>0
            && this.laminateWidth>0
            && this.laminateColors.length>0)
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

}