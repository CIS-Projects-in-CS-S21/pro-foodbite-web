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

/**
     * Compares time values in the format HH:MM:SS to
     * make sure the time values don't overlap.
     * 
     * @param {string} a The value to compare against
     * @param {string} b The value to compare to
     * @returns If the time value a comes before the time value b
     */
export function checkTimeRange(a, b) {
    return (!a && !b) ? true : a < b;
}

/**
 * Checks to see if the current signed in account is
 * already associated with an restaurant.
 * 
 * @param {object} user
 * @return {boolean} Whether the account belongs to an
 * restaurant 
 */
export function shouldForceRestaurantSignup(user) {
    //console.log('shouldForceRestaurantSignup', user);

    //console.log('shouldForceRestaurantSignup', (user !== null && user.ownedRestaurants.length > 0) ? false : true);

    if(user === null) return true; 
    if(typeof user["ownedRestaurants"] === "undefined" ) return true;    

    return (user !== null && user.ownedRestaurants.length > 0) ? false : true;
}

/**
 * Limits file upload to the max size provided
 * 
 * @param {File} file A File object that repersents the object to be uploaded
 * @param {int} maxSize The max size allowed (exclusive) in kb
 * @returns Whether the file should be uploaded
 */
export function checkMaxFileSize(file, maxSize) {
    // the max size is in kb
    if (file === undefined || file === null || !file.size)
        return false;

    return (file.size / 1000) > maxSize ? false : true;
}



export function calc_amount(order){

    if(order.hasOwnProperty("menuItems")){
      // sum the price of each object in menuItems array
      let amount = order.menuItems.reduce( (a, b) => ({price: a.price + b.price}));
      return amount.price.toFixed(2); 
    }
  };
