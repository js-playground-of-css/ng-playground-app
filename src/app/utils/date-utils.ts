import { DateDuration } from './model/date-duration';
import { DateConstants } from '../constants/date-constants';
import { Today } from './today';

export class DateUtils {

    public static stringToDate(
        strDate: string
    ) : Date {
        const strArray : Array<string> = new String(strDate).split('-');
        return new Date(
            parseInt(strArray[0]),
            parseInt(strArray[1]) - 1,
            parseInt(strArray[2])
        );
    }

    public static compareDate(aLeftDate : Date, aRightDate : Date) : number {
        const leftTime = aLeftDate.getTime();
        const rightTime = aRightDate.getTime();

        if(leftTime < rightTime) {
            return DateConstants.FLAG_LEFT_DATE_IS_EARLIER_THAN_RIGHT_DATE;
        } else if(leftTime > rightTime) {
            return DateConstants.FLAG_LEFT_DATE_IS_LATER_THAN_RIGHT_DATE;
        } else {
            return DateConstants.FLAG_LEFT_DATE_IS_EQUAL_TO_RIGHT_DATE;
        }
    }

    public static computeDurationWithToday(anInputDate : Date) : DateDuration {
        return DateUtils.computeDurationWithTodayIndicator(anInputDate, true);
    }

    public static computeDurationFromToday(anInputDate : Date) : DateDuration {
        return DateUtils.computeDurationWithTodayIndicator(anInputDate, false);
    }

    private static computeDurationWithTodayIndicator(anInputDate : Date, isTodayEndDate : boolean) : DateDuration {
        const compareBeginDate = isTodayEndDate ?
            DateUtils.compareDate(anInputDate, Today.date()) :
            DateUtils.compareDate(Today.date(), anInputDate);
        let output = 'ATM'; // La rencontre est en cours...
        let unit = DateConstants.UNIT_DURATION_ATM;
        if(
            ! (
                (
                    compareBeginDate === DateConstants.FLAG_LEFT_DATE_IS_EARLIER_THAN_RIGHT_DATE ||
                    compareBeginDate === DateConstants.FLAG_LEFT_DATE_IS_EQUAL_TO_RIGHT_DATE
                )
            )
        ) {
            // La rencontre est à venir...
            const durationInMinutes : number = isTodayEndDate ?
                Math.ceil( (anInputDate.getTime() - Today.date().getTime()) / 60000 ) :
                Math.ceil( (Today.date().getTime() - anInputDate.getTime()) / 60000 );
            const oneDay = 1440;
            const oneHour = 60;
            if(durationInMinutes >= oneDay) {
                // Il y a un jour ou plus avant le début de la rencontre...
                output = `${Math.ceil(durationInMinutes / oneDay)}`;
                unit = DateConstants.UNIT_DURATION_DAY;
            } else if(durationInMinutes >= oneHour) {
                // Il y a une heure ou plus avant le début de la rencontre...
                output = `${Math.ceil(durationInMinutes / oneHour)}`;
                unit = DateConstants.UNIT_DURATION_HOUR;
            } else {
                // Il y a une minute ou plus avant le début de la rencontre...
                output = `${durationInMinutes}`;
                unit = DateConstants.UNIT_DURATION_MINUTE;
            }
        }
        return new DateDuration(output, unit);
    }
}