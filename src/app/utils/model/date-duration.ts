
export class DateDuration {

   constructor(
       private durationStr: string,
       private durationUnit: number
   ) {}

   getLabel() {
       return this.durationStr;
   }

   getUnit() {
       return this.durationUnit;
   }

}