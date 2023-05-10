import { Component } from '@angular/core';

class LaminateNom{
    constructor(
        public color:string,
        public length:number,
        public width:number,
        public qty:number
    ){}
}

class LaminateSizes{
    constructor(
    public length:number,
    public width:number
    ){}
}

class LaminateCutting{
    constructor(
        public color:string,
        public sizes:LaminateSizes[],
    ){}
}

@Component({
    selector: 'result-comp',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})

export class ResultComponent { 

    laminateNoms:LaminateNom[];
    laminateWorkPieces:LaminateCutting[];
    laminateWidth:number;
    laminateLength:number;

    canAddToWorkPiece(laminateNom:LaminateNom)
    {
        for(let piece of this.laminateWorkPieces)
        {
            if (laminateNom.color==piece.color &&
                (this.laminateLength - piece.sizes.reduce((sum, current) => sum + current.length, 0))>=laminateNom.length)
                {
                    return piece;
                }
        }
        return null;
    }

    calculateCutting()
    {
        const qtyRemain=[];
        this.laminateWorkPieces=[];
        const laminateNomsRemain=this.laminateNoms.sort((a,b)=>(b.length-a.length));
        laminateNomsRemain.forEach(nom=>qtyRemain.push(nom.qty));
        while(qtyRemain.some(qty=>qty>0)){
            const laminateNomRemain = laminateNomsRemain.filter(nom=> qtyRemain[laminateNomsRemain.indexOf(nom)]>0)[0];
            let piece = this.canAddToWorkPiece(laminateNomRemain);
            
            if (piece==null)
            {
                this.laminateWorkPieces.push({
                    color:laminateNomRemain.color,
                    sizes:[{
                        length:laminateNomRemain.length,
                        width:laminateNomRemain.width
                    }]
                });
            }
            else
            {
                piece.sizes.push({
                    length:laminateNomRemain.length,
                    width:laminateNomRemain.width
                })
            }
            qtyRemain[laminateNomsRemain.indexOf(laminateNomRemain)]--;
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