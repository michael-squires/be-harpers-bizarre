// extract any functions you are using to manipulate your data, into this file
exports.formatTimeStamp = (data) => {
    formattedData = data.map(element => {
        const newElement = { ...element }
        const unixTime = newElement.created_at
        const outputDate = new Date(unixTime).toLocaleDateString('en-US')
        const outputTime = new Date(unixTime).toLocaleTimeString('en-US')
        const output = `${outputDate} ${outputTime}`
        newElement.created_at = output
        return newElement;
    })
    return formattedData;
}