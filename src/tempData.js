
export const doc = {
  name: "Big Kahuna Burger",
  image: "https://firebasestorage.googleapis.com/v0/b/foodbite-10690.appspot.com/o/images%2F196cf729-62f6-41da-a1d1-3573dd11da45%2Fimage.jpg?alt=media&token=37e8bc25-100f-4252-8776-00b2c5ee74d1",
  description: "Mmm, this is a tasty burger!",
  menuItems: [
    {
      description: "its a tasty burger",
      name: "big kahuna burger",
      price: "5.50"
    },
    {
      description: "nothing special",
      name: "fried",
      price: "2.50"
    }
  ],
  hours: {
      monday: {
          open: "22:00",
          close: "11:00"
      },
      tuesday: {
          open: "",
          close: ""
      },
      wednesday: {
          open: "",
          close: ""
      },
      thursday: {
          open: "",
          close: ""
      },
      friday: {
          open: "",
          close: ""
      },
      saturday: {
          open: "23:00",
          close: "10:00"
      },
      sunday: {
          open: "",
          close: ""
      },
  },
  screen: 1,
  submitting: false,
  success: false
};


export const defaultEmpty = {
  name: "",
  image: "",
  description: "",
  menu: [],
  hours: {
      monday: {
          open: "",
          close: ""
      },
      tuesday: {
          open: "",
          close: ""
      },
      wednesday: {
          open: "",
          close: ""
      },
      thursday: {
          open: "",
          close: ""
      },
      friday: {
          open: "",
          close: ""
      },
      saturday: {
          open: "",
          close: ""
      },
      sunday: {
          open: "",
          close: ""
      },
  },
  menuItems: [],
  screen: 1,
  submitting: false,
  success: false
};