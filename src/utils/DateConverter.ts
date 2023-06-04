
import dateFormat from 'dateformat';
const toLocaleDateString = (date: Date) => {
    return new Date(date).toLocaleDateString()
}
const toFormatedDate = (date: Date, format:string = "dd/mm/yyyy") => {
    return dateFormat(date, format)
}

const toFormatedDateString = (date: string, format:string = "dd/mm/yyyy") => {
    return dateFormat(date, format, true)
}

export {
    toLocaleDateString,
    toFormatedDate,
    toFormatedDateString
}