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

export const get_updated_timestamp = ( (order) => {
    // last order's status was updated (or initial createdAt if NEW)
  
    if(order.hasOwnProperty("updated")) {

      let time = new Date(0);
      time.setUTCSeconds(order.updated);

      //time = `${time.getHours()}:${time.getMinutes()}`; 

      const hours = ("0" + time.getHours()).slice(-2); 
      const minutes = ("0" + time.getMinutes()).slice(-2); 

      return convertTime24to12(`${hours}:${minutes}`);
    }
    else if(order.hasOwnProperty("createdAt")){

      let time = new Date(0);
      time.setUTCSeconds(order.createdAt);

      const hours = ("0" + time.getHours()).slice(-2); 
      const minutes = ("0" + time.getMinutes()).slice(-2); 

      return convertTime24to12(`${hours}:${minutes}`);
    }
  });

export function calc_amount(order){

    if(order.hasOwnProperty("menuItems")){    
        // sum the price of each object in menuItems array
        
        let amount = order.menuItems.reduce( (a, b) => ({price: parseFloat(a.price) + parseFloat(b.price)}));
        amount = parseFloat(amount.price).toFixed(2); 

        return amount; 
    }
  };

export function average(nums){
    return nums.reduce((a, b) => (a + b)) / nums.length;
}

export const get_date_full = (epoch) => {
    // ex. 4/14/21 13:56:01

    if(epoch === undefined) return ""; 

    let time = new Date(0);
    time.setUTCSeconds(epoch);
    
    return time.toLocaleString();
}

export const get_date_short = (epoch) => {
    // ex. 4/14/21 

    if(epoch === undefined) return ""; 

    let time = new Date(0);
    time.setUTCSeconds(epoch);
    
    return time.toLocaleDateString();
}

export function sort_today(orders){
    // given orders with epoch timestamps, return only those from today's date

    if(orders.length === 0) return []; 

    let today = new Date();
    today = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    const filtered = orders.filter( order => {

        const date = new Date(0);
        date.setUTCSeconds(order.createdAt);
        let formated = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`; 

        return formated === today; 
    });

    return filtered; 
}

export function sort_day(orders, day_selected){
    // given orders with epoch timestamps, return only those from day given (of the current week)

    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]; 
    day_selected = days.indexOf(day_selected); 

    let filtered = []; 

    if(orders.length === 0) return []; 

    let epoch_right = Math.round(Date.now() / 1000); // now
    let epoch_left = epoch_right - 604800; // 6.048e+8 ms in a week, take current epoch, go back week 

    // filter to get orders for the current week
    filtered = orders.filter( order => {
        return (epoch_left <= order.createdAt && order.createdAt <= epoch_right);
    });

    // filter to get orders for selected day
    filtered = orders.filter( order => {

        const date = new Date(0);
        date.setUTCSeconds(order.createdAt);
        let day = date.getDay(); 
 
        return day_selected === day; 
    });

    return filtered; 
}

export function get_today_sales(today_orders){

    if(today_orders.length === 0) return "0.00";

    let total = 0.00;

    today_orders = today_orders.filter( order => {
        return order.status === "DELIVERED" || order.status === "COMPLETED"; // might change status to picked-up instead of completed
    });

    today_orders.forEach( order => {
        let amount = order.menuItems.reduce( (a, b) => ({price: parseFloat(a.price) + parseFloat(b.price)}));
        total += parseFloat(amount.price);   
    });

    return total.toFixed(2);  
}


export function get_type_sales(today_orders, status){

    if(today_orders.length === 0) return "0.00"; 

    today_orders = today_orders.filter( order => {
        return order.status === status;
    });

    return get_today_sales(today_orders);
}

export function get_type_orders(today_orders, status){

    if(today_orders.length === 0) return 0; 

    today_orders = today_orders.filter( order => {
        return order.status === status;
    });

    return today_orders.length; 
}

export function sort_this_week(orders){
    // given orders with epoch timestamps, return only those from this week

    let filtered = []; 

    if(orders.length === 0) return []; 

    let epoch_right = Math.round(Date.now() / 1000); // now
    let epoch_left = epoch_right - 604800; // 6.048e+8 ms in a week, take current epoch, go back week 

    // filter to get orders for the current week
    filtered = orders.filter( order => {
        return (epoch_left <= order.createdAt && order.createdAt <= epoch_right);
    });

    return filtered; 
}

export function get_short_name(order){
    //if name too long, "..."

    if(order.hasOwnProperty("name")){

      let name = order.name.toUpperCase();  

      if(name.length > 10) {
        name = name.substr(0, 9);
        name += "..."; 
      }

      return name; 
    }

    return "NO NAME";
}

export function get_sales_this_month(orders){
    // each day up to current day will have value
    
    let month_current = new Date().getMonth();
    // month_current = 3; 

    let filtered = [];

    orders.forEach(order => {

        const time = parseFloat(order.createdAt) * 1000; 
        const date = new Date(time);
        
        if(date.getMonth() === month_current) filtered.push(order);
    });


    const date = new Date();
    const days_this_month = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    let sales = {}; 

    for(let i = 1; i <= days_this_month; ++i) sales[i] = 0;

    filtered.forEach(order => {

        const time = parseFloat(order.createdAt) * 1000; 
        const day = new Date(time).getDate();

        const amount = parseFloat(calc_amount(order)); 
         
        let temp = sales[day];
        temp += amount;

        sales[day] = temp; 
    });

    let month_obj = {
        month: month_current,
        data: sales
    }

    return month_obj;
}

export function get_sales_this_year(orders){
    // each month's sales of the current year

    let date = new Date();
    let year_current = date.getFullYear();
    
    let filtered = [];

    orders.forEach(order => {

        const time = parseFloat(order.createdAt) * 1000; 
        const date = new Date(time);
        
        if(date.getFullYear() === year_current) filtered.push(order);
    });

    let sales = {}

    for(let i = 1; i <= 12; ++i) sales[i] = 0;

    filtered.forEach(order => {

        const time = parseFloat(order.createdAt) * 1000; 
        let month = new Date(time).getMonth() + 1;

        const amount = parseFloat(calc_amount(order)); 
         
        let temp = sales[month];
        temp += amount;

        sales[month] = temp; 
    });

    let year_obj = {
        year: year_current,
        data: sales
    }

    return year_obj;
}