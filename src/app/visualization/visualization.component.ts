import { Component } from '@angular/core';
     
@Component({
    selector: 'visualization-comp',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.css']
})

export class VisualizationComponent { 

    colors:string[];

    room:{
        width:number,
        height:number,
    };

    laminatesRows:{
        height:number,
        laminates:{
            color:string,
            width:number
        }
    }[];

    currentColor:number;

    startVisualization(settings)
    {
        this.colors=settings.laminateColors;
        if (!(this.currentColor>=0))
        {
            this.currentColor=0;
        }
        this.room = {
            width:settings.roomWidth,
            height:settings.roomLength
        }
        console.log(this.room);
    }

    colorChanged(color)
    {
        this.currentColor = color;
    }

}