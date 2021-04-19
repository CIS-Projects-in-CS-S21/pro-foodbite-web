import { 
        checkPrice, convertTime24to12, getFileExtension, checkTimeRange, checkMaxFileSize, 
        get_date_full, get_date_short, sort_today, sort_day, calc_amount, get_name_short, get_updated_timestamp, get_today_sales,
        get_type_sales, get_type_orders, sort_this_week
    } from '../utils/Utils'

import { today_archived } from "../tempData"

describe("Test price regex", () => {
    it("has a valid price", () => {
        expect(checkPrice("20.04")).toBe(true);
        expect(checkPrice("10.00")).toBe(true);
    });

    it("does not have a valid price", () => {
        expect(checkPrice("20")).toBe(false);
        expect(checkPrice("-10.00")).toBe(false);
        expect(checkPrice("10.0")).toBe(false);
    });
});

describe("Test time conversions", () => {
    it("has a valid 24hr to 12hr conversion", () => {
        expect(convertTime24to12("01:00")).toBe("01:00 AM")
        expect(convertTime24to12("08:23")).toBe("08:23 AM")
        expect(convertTime24to12("12:50")).toBe("12:50 PM")
        expect(convertTime24to12("22:21")).toBe("10:21 PM")
        expect(convertTime24to12("13:55")).toBe("01:55 PM")
    });
});

describe("Test for valid time ranges", () => {
    it("has a valid time ranges", () => {
        expect(checkTimeRange("01:00", "21:00")).toBe(true)
        expect(checkTimeRange("20:00", "21:00")).toBe(true)
        expect(checkTimeRange(undefined, undefined)).toBe(true)
        expect(checkTimeRange(null, null)).toBe(true)
    });

    it("has invalid time ranges", () => {
        expect(checkTimeRange("11:00", "01:00")).toBe(false)
        expect(checkTimeRange("21:00", "21:00")).toBe(false)
        expect(checkTimeRange(null, "21:00")).toBe(false)
        expect(checkTimeRange("21:00", undefined)).toBe(false)
    });
});

describe("Test file extension", () => {
    it("has a valid extension", () => {
        expect(getFileExtension("some-image-path.jpg")).toBe("jpg");
        expect(getFileExtension("some-image-path.trick.png")).toBe("png");
        expect(getFileExtension("some-image-path.trick.fsdfsdfsdf")).toBe("fsdfsdfsdf");
    });

    it("has no valid extension", () => {
        expect(getFileExtension("some-image-path")).toBe(null);
        expect(getFileExtension("some-image-path.")).toBe(null);
        expect(getFileExtension("")).toBe(null);
        expect(getFileExtension(".")).toBe(null);
    });
});

describe("Test max upload file size", () => {
    it("has a size less than max", () => {
        expect(checkMaxFileSize({ size: 100000 }, 100)).toBe(true);
        expect(checkMaxFileSize({ size: 90000 }, 100)).toBe(true);
    });

    it("has a size greater than or equal to max", () => {
        expect(checkMaxFileSize({ size: 900000 }, 100)).toBe(false);
        expect(checkMaxFileSize(null, 100)).toBe(false);
    });
});

describe("get_updated_timestamp()", () => {

    it("returns correct format given timestamp", () => {

        let order = {
            createdAt: 1618606760,
            updated: 1618613960
        }

        const time = get_updated_timestamp(order);
        expect(time).toBe("06:59 PM");
    });

    it("returns createdAt timestamp if order not updated", () => {
        let order = {
            createdAt: 1618606760,
        }

        const time = get_updated_timestamp(order);
        expect(time).toBe("04:59 PM");
    });
});

describe("calc_amount()", () => {

    const order = {
        menuItems: [
            {
                name: "burger",
                price: 6.70
            },
            {
                name: "salad",
                price: 5.55
            }
        ]
    }

    it("returns correct amount", () => {

        const amount = parseFloat((calc_amount(order)))
        expect(amount).toBe(12.25);
    });
});

describe("get_date_full()", () => {

    it("returns correct format", () => {
        const time_of_test = 1618608375; 
        const day = get_date_full(time_of_test); 
        expect(day).toBe("4/16/2021, 5:26:15 PM"); 
    });
});

describe("get_date_short()", () => {

    it("returns correct format", () => {
        const time_of_test = 1618608375; 
        const day = get_date_short(time_of_test); 
        expect(day).toBe("4/16/2021"); 
    });
});

describe("sort_today()", () => {

    let orders = [
        {
            orderId: 1,
            createdAt: 1618610413 // today
        },
        {
            orderId: 2,
            createdAt: 1618498813 // not today
        },
        {
            orderId: 3,
            createdAt: 1618333213 // not today
        },
        {
            orderId: 4,
            createdAt: 1618606813 // today
        },
        {
            orderId: 5,
            createdAt: 1618585213 // today
        },
    ]

    it("returns empty array if no orders", () => {
        const filtered = sort_today([]);
        
        expect(filtered).toEqual([]);
    }); 

    // it("filters correctly", () => {
    //     const filtered = sort_today(orders);
    //     console.log(filtered);
    //     orders.splice(1, 2);

    //     expect(filtered).toEqual(orders);
    // });
});


describe("sort_day()", () => {

    let orders = [
        {
            orderId: 1,
            createdAt: 1618612376 // selected (Friday)
        },
        {
            orderId: 2,
            createdAt: 1618612370 // selected (Friday)
        },
        {
            orderId: 3,
            createdAt: 1618353176 // past Tuesday
        },
        {
            orderId: 4,
            createdAt: 1618259576 // past Monday
        },
        {
            orderId: 5,
            createdAt: 1618345976 // past Tuesday
        },
        {
            orderId: 6,
            createdAt: 1618598084 // selected(Friday)
        },
    ]

    it("returns empty array if no orders", () => {
        const filtered = sort_day([], "friday");
        
        expect(filtered).toEqual([]);
    }); 

    it("filters correctly", () => {
        const filtered = sort_day(orders, "friday");
        orders.splice(2, 3);

        expect(filtered).toEqual(orders);
    });
});


describe("get_today_sales()", () => {
  
    it("calculates correct amount for non-canceled archived orders", () => {

        const amount = get_today_sales(today_archived);
        expect(parseFloat(amount)).toEqual(36.8);
    });
});


describe("get_type_sales()", () => {
  
    it("calculates correct amount for non-canceled delivered archived orders", () => {

        const amount = get_type_sales(today_archived, "DELIVERED");
        expect(parseFloat(amount)).toEqual(24.40);
    });

    it("calculates correct amount for non-canceled picked-up archived orders", () => {

        const amount = get_type_sales(today_archived, "COMPLETED");
        expect(parseFloat(amount)).toEqual(12.40);
    });

});

describe("get_type_orders()", () => {
  
    it("filters correctly to return non-canceled delivered archived orders", () => {

        const expected = today_archived.filter(order => order.status === "DELIVERED");
        const length = get_type_orders(today_archived, "DELIVERED")
        expect(length).toBe(expected.length); 
    });

    it("filters correctly to return non-canceled picked-up archived orders", () => {

        const expected = today_archived.filter(order => order.status === "COMPLETED");
        const length = get_type_orders(today_archived, "COMPLETED");
        expect(length).toBe(expected.length); 
    });

});

describe("sort_this_week()", () => {

    let orders = [
        {
            orderId: 1,
            createdAt: 1618612376 
        },
        {
            orderId: 2,
            createdAt: 1618612370 
        },
        {
            orderId: 3,
            createdAt: 1618353176
        },
        {
            orderId: 4,
            createdAt: 1617326418 // weeks ago
        },
        {
            orderId: 5,
            createdAt: 1617499218 // weeks ago
        },
        {
            orderId: 6,
            createdAt: 1618598084 
        },
    ]

    it("filters correctly", () => {
        const filtered = sort_this_week(orders);
        orders.splice(3, 2);

        expect(filtered).toEqual(orders);
    });

});