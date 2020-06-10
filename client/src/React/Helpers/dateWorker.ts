export const getTimeHHMMSS = (dateString: string) => {
    const date = new Date(dateString)
    const hh = date.getHours()
    const mm = date.getMinutes()
    const ss = date.getSeconds()
    const timeStr = hh + ':' + mm + ':' + ss
    return timeStr
}
