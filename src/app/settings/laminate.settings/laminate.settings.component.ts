import { Component, Output, EventEmitter } from '@angular/core';
     
const BLACK = "#000000";

@Component({
    selector: 'laminate-settings-comp',
    templateUrl: './laminate.settings.component.html',
    styleUrls: ['./laminate.settings.component.css']
})

export class LaminateSettingsComponent { 

    length:number=0;
    width:number=0;
    colors: string[]=[BLACK];
    
    @Output() outputLaminateSettings = new EventEmitter();

    laminateChanged()
    {
        const laminateSettings = { 
            length: this.length, 
            width: this.width,
            colors:this.colors 
        }
        this.outputLaminateSettings.emit(laminateSettings);
    }

    addColor()
    {
        this.colors.push(BLACK);
        this.laminateChanged();
    }

    deleteColor()
    {
        if (this.colors.length>1)
            this.colors.pop();
            
        this.laminateChanged();
    }
}