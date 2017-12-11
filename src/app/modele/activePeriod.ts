export class ActivePeriod {
    idActivePeriod:number;
    date:Date;
    duration:number;
    fk_privilege:number;

    constructor(idActivePeriod:number, date:Date, duration:number, fk_privilege:number){
        this.idActivePeriod=idActivePeriod;
        this.date=date;
        this.duration=duration;
        this.fk_privilege=fk_privilege;
    }
}