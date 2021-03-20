export function checkPrice(price) {
    const expression = new RegExp(/^\d+.[0-9]{2}/g);
    return expression.test(price);
}

export function convertTime24to12(time) {
    if (time >= "01:00" && time <= "11:59")
        return `${time} AM`;
    else if (time >= "12:00" && time <= "12:59")
        return `${time} PM`;
    else {
        const hour = parseInt(time.slice(0, 2)) - 12;
        // check if the hour needs to be padded with an 0
        if (hour <= 9)
            return `0${hour}${time.slice(2, 5)} PM`;
        else
            return `${hour}${time.slice(2, 5)} PM`;
    }
}

export function getFileExtension(filename) {
    for (let i = filename.length - 1; i >= 0; i--) {
        if (filename.charAt(i) === ".") {
            // there is no extension, only a period
            if (i === filename.length - 1)
                return null;
            // treat everything from here to the right as the file extension
            return filename.slice(i + 1, filename.length + 1);
        }
    }

    return null;
}