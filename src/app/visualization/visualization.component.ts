import { Component, Output, EventEmitter } from '@angular/core';
    
const MAX_LAMINATES=30000;

class LaminateCell{
    constructor(
        public color:string,
        public length:number   
    ){}
}

class LaminateRow{
    constructor(
        public width:number,
        public laminates:LaminateCell[]
    ){}
}

@Component({
    selector: 'visualization-comp',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.css']
})

export class VisualizationComponent { 

    @Output() outputVisualization = new EventEmitter();

    colors:string[];
    scale:number;
    room:{
        width:number,
        height:number,
    };

    laminateRows:LaminateRow[]=[];
    tooManyLaminates:boolean = false;
    currentColor:number=0;
    waiting:boolean = false;

    startVisualization(settings)
    {
        this.waiting = true;
        this.colors=settings.laminateColors;

        if (!this.colors)
        {
            this.waiting = false;
            return;
        }

        if (!(this.currentColor>=0))
        {
            this.currentColor=0;
        }
        this.room = {
            width:settings.roomWidth,
            height:settings.roomLength
        }

        this.scale=this.room.width/this.room.height;
        let height = this.room.height;
        this.laminateRows=[];
        let needShift = false;
        this.tooManyLaminates = this.room.height/settings.laminateLength*this.room.width/settings.laminateWidth>MAX_LAMINATES;

        if (this.tooManyLaminates)
        {
            this.waiting = false;
            return;                
        }

        while (height>0)
        {
            let rowHeight = height>settings.laminateWidth
                ?settings.laminateWidth
                :height;
            height -=rowHeight;
            
            let width = this.room.width;
            
            let laminatesRow:LaminateCell[]=[];
            let firstLaminate = true;

            while(width>0)
            {
                let laminateWidth = width>settings.laminateLength
                    ?settings.laminateLength
                    :width;

                if(firstLaminate
                    && needShift)
                    {
                        laminateWidth /=2;
                        firstLaminate = false;
                    }

                width -= laminateWidth;
                laminatesRow.push({
                    color:this.colors[this.currentColor].slice(),
                    length:laminateWidth
                });
            }

            needShift = !needShift;

            this.laminateRows.push({
                width:rowHeight,
                laminates:laminatesRow
            });
        }

        this.visualizationChanged();
        this.waiting = false;
    }

    colorChange(color)
    {
        this.currentColor = color;
    }

    laminateColorChange(laminate)
    {
        laminate.color = this.colors[this.currentColor].slice();
        this.visualizationChanged();
    }

    visualizationChanged()
    {
        if (this.laminateRows)
            this.outputVisualization.emit(this.laminateRows);
    }

}