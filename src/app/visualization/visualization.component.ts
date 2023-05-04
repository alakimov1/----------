import { Component } from '@angular/core';
    
export class LaminateCell{
    constructor(
        public color:string,
        public width:number   
    ){}
}

export class LaminateRow{
    constructor(
        public height:number,
        public laminates:LaminateCell[]
    ){}
}

@Component({
    selector: 'visualization-comp',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.css']
})

export class VisualizationComponent { 

    colors:string[];
    scale:number;
    room:{
        width:number,
        height:number,
    };

    laminateRows:LaminateRow[]=[];

    currentColor:number=0;

    startVisualization(settings)
    {
        this.colors=settings.laminateColors;

        if (!this.colors)
        {
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

        while (height>0)
        {
            let rowHeight = height>settings.laminateLength
                ?settings.laminateLength
                :height;
            height -=rowHeight;
            
            let width = this.room.width;
            
            let laminatesRow:LaminateCell[]=[];
            let firstLaminate = true;

            while(width>0)
            {
                let laminateWidth = width>settings.laminateWidth
                    ?settings.laminateWidth
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
                    width:laminateWidth*100/this.room.width
                });
            }

            needShift = !needShift;

            this.laminateRows.push({
                height:rowHeight*100/this.room.height,
                laminates:laminatesRow
            });
        }
    }

    colorChanged(color)
    {
        this.currentColor = color;
    }

}