import { Component } from '@angular/core';

class laminateNom{
    constructor(
        public color:string,
        public length:number,
        public width:number,
        public qty:number
    ){}
}

class laminateCutting{
    constructor(
        public color:string,
        public lengths:number[],
        public width:number,
    ){}
}

@Component({
    selector: 'result-comp',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})

export class ResultComponent { 

    laminateNoms:laminateNom[];
    laminateWorkPieces:laminateCutting[];
    laminateWidth:number;
    laminateLength:number;

    calculateCutting()
    {
        this.laminateWorkPieces=[];
        this.laminateNoms.forEach(nom => {
            for(let i =0;i<nom.qty;i++)
            {
                this.laminateWorkPieces.push({
                    color:nom.color,
                    lengths:[nom.length],
                    width:nom.width
                });
            }
        });  
        this.laminateWorkPieces.sort((a,b)=>b.lengths.reduce((sum, current) => sum + current, 0)-a.lengths.reduce((sum, current) => sum + current, 0));
        for(let i=0;i<this.laminateWorkPieces.length-1;i++)
        {
            let maxLength = this.laminateWorkPieces[i].lengths.reduce((sum, current) => sum + current, 0)-this.laminateLength;
            
        }
    }

    calculateResult(laminateRows, laminateSettings)
    {
        this.laminateWidth = laminateSettings.width;
        this.laminateLength = laminateSettings.length;
        this.laminateNoms=[];
        if (!laminateRows)
            return;

        laminateRows.forEach(laminateRow => {
            if (laminateRow.laminates)
            {
                laminateRow.laminates.forEach(laminate=>{
                    let laminateNom = this.laminateNoms.find((laminateNom)=>
                        laminateNom.color===laminate.color
                        && laminateNom.length === laminate.length
                        && laminateNom.width === laminateRow.width
                    );

                    if (laminateNom)
                    {
                        laminateNom.qty++;
                    }
                    else
                    {
                        this.laminateNoms.push(
                            {
                                color:laminate.color,
                                length:laminate.length,
                                width:laminateRow.width,
                                qty:1
                            });
                    }
                });
            }
        });
        this.calculateCutting();
    }
}