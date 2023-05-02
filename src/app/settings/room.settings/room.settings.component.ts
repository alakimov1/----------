import { Component, Output, EventEmitter } from '@angular/core';
     

@Component({
    selector: 'room-settings-comp',
    templateUrl: './room.settings.component.html',
    styleUrls: ['./room.settings.component.css']
})

export class RoomSettingsComponent { 

    length:number=0;
    width:number=0;
    
    @Output() outputSize = new EventEmitter();

    roomSizeChanged()
    {
        const size = { length: this.length, width: this.width }
        this.outputSize.emit(size);
    }
}