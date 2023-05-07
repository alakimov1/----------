import { Component } from '@angular/core';

class laminateNom{
    constructor(
        public color:string,
        public length:number,
        public width:number,
        public qty:number
    ){}
}

@Component({
    selector: 'result-comp',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})

export class ResultComponent { 

    laminateNoms:laminateNom[];

    calculateResult(laminateRows)
    {
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
    }
}