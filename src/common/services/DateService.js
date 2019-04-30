import moment from 'moment';

export class DateService {
    static getTodayDate() {
        return moment().format('DD/MM/YYYY');
    }

    static getCurrentMonth() {
        return moment().format('MMMM');
    }

    static getCurrentYear() {
        return moment().format('YYYY');
    }
}
