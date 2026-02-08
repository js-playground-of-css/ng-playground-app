
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
}