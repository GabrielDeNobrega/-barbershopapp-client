
import dateFormat from 'dateformat';
const toLocaleDateString = (date: Date) => {
    return new Date(date).toLocaleDateString()
}
const toFormatedDate = (date: Date, format:string = "dd/mm/yyyy") => {
    return dateFormat(date, format)
}

export {
    toLocaleDateString,
    toFormatedDate
}