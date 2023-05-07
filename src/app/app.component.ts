import { Component, Output, EventEmitter,ViewChild } from '@angular/core';
import { VisualizationComponent } from './visualization/visualization.component';
import { ResultComponent } from './result/result.component'
     
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent { 
    
    @ViewChild(VisualizationComponent) visualization:VisualizationComponent;
    @ViewChild(ResultComponent) result:ResultComponent;

    settingsChanged(settings)
    {
        this.visualization.startVisualization(settings);
    }

    visualizationChanged(laminateRows)
    {
        this.result.calculateResult(laminateRows);
    }

}