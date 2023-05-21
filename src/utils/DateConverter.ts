
const toLocaleDateString = (date: Date) => {
    return new Date(date).toLocaleDateString()
}

const toFormatedDate = (date: Date) => {
    const unformatedDate = new Date(date);
    return `${unformatedDate.toLocaleDateString()} ${unformatedDate.toLocaleTimeString()}` 
}

export {
    toLocaleDateString,
    toFormatedDate
}