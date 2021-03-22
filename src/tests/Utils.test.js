import { checkPrice, convertTime24to12, getFileExtension, checkTimeRange } from '../utils/Utils'

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
    });

    it("has invalid time ranges", () => {
        expect(checkTimeRange("11:00", "01:00")).toBe(false)
        expect(checkTimeRange("21:00", "21:00")).toBe(false)
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