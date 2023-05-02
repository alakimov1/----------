import { Component, Output, EventEmitter,ViewChild } from '@angular/core';
import { VisualizationComponent } from './visualization/visualization.component';
     
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent { 
    
    @ViewChild(VisualizationComponent) visualization:VisualizationComponent;

    settingsChanged(settings)
    {
        this.visualization.startVisualization(settings);
    }
}