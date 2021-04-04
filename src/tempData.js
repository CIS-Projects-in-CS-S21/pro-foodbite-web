
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


// similar to document fields
export const mock_pending_orders = [
    {
        timestamp: "4/4/2021, 3:25:41 PM", 
        status: "NEW",
        receivedDate : "3/29/2021",
        name: "Rustin Cohle",
        address: "4123 holder street",
        id: "123",
        eta: "TBA",
        menuItems: [
            {
                itemNumber: 1,
                name: "Big Kahuna Burger",
                price: 5.50,
                options: "no tomato"
                
            },
            {
                itemNumber: 6,
                name: "fries",
                price: 2.70
            },
            {
                itemNumber: 10,
                name: "sprite",
                price: 1.59
            }
        ]
    },
    {
        timestamp: "4/4/2021, 3:28:41 PM", 
        eta: "TBA",
        receivedDate : "3/29/2021",
        status: "NEW",
        name: "Joseph Cooper",
        address: "123 place holder street",
        id: "456",
        menuItems: [
            {
                itemNumber: 3,
                name: "Big Kahuna Chicken Sandwhich",
                price: 6.50,
                options: null
                
            },
            {
                itemNumber: 9,
                name: "Big Kahuna Chicken Fingers",
                price: 5.70
            },

        ]
    },
    {
        timestamp: "4/4/2021, 3:32:41 PM", 
        eta: "TBA",
        receivedDate : "3/29/2021",
        status: "NEW",
        name: "John Cassavetes",
        address: "123 place holder street",
        id: "789",
        menuItems: [
            {
                itemNumber: 4,
                name: "Big Kahuna Pinapple Sandwhich",
                price: 7.40,
                options: null
                
            },
        ]
    },
    {
        timestamp: "4/4/2021, 3:41:42 PM", 
        eta: "TBA",
        receivedDate : "3/29/2021",
        status: "NEW",
        name: "John Doe",
        address: "123 place holder street",
        id: "910",
        menuItems: [
            {
                itemNumber: 10,
                name: "sprite",
                price: 1.59,
                options: null
                
            },
        ]
    },
    {
        timestamp: "4/4/2021, 3:52:41 PM", 
        eta: "TBA",
        receivedDate : "3/29/2021",
        status: "NEW",
        name: "Jane Doe",
        address: "123 place holder street",
        id: "111",
        menuItems: [
            {
                itemNumber: 10,
                name: "sprite",
                price: 1.59,
                options: null
                
            },
        ]
    },
    {
        timestamp:"4/4/2021, 3:59:41 PM", 
        eta: "TBA",
        receivedDate : "3/29/2021",
        status: "NEW",
        name: "Frank Reynolds",
        address: "123 place holder street",
        id: "134",
        menuItems: [
            {
                itemNumber: 10,
                name: "sprite",
                price: 1.59,
                options: null
                
            },
            {
                itemNumber: 1,
                name: "Big Kahuna Burger",
                price: 5.50,
                options: null 
                
            },
        ]
    },
    {
        timestamp: "4/4/2021, 4:01:41 PM", 
        eta: "TBA",
        receivedDate : "3/29/2021",
        status: "NEW",
        name: "Dennis Reynolds",
        address: "123 place holder street",
        id: "134",
        menuItems: [
            {
                itemNumber: 1,
                name: "Big Kahuna Burger",
                price: 5.50,
                options: null 
                
            },
        ]
    },

]

export const mock_archived_orders = [
    {
        timestamp: "4/4/2021, 2:25:41 PM", 
        status: "DELIVERED",
        receivedDate : "3/29/2021",
        name: "Ben Simmons",
        address: "4123 holder street",
        id: "123",
        eta: "TBA",
        menuItems: [
            {
                itemNumber: 1,
                name: "Big Kahuna Burger",
                price: 5.50,
                options: "no tomato"
                
            },
            {
                itemNumber: 6,
                name: "fries",
                price: 2.70
            },
            {
                itemNumber: 10,
                name: "sprite",
                price: 1.59
            }
        ]
    },
    {
        timestamp: "4/4/2021, 2:28:41 PM", 
        eta: "TBA",
        receivedDate : "3/29/2021",
        status: "CANCELED",
        name: "TOBIAS HARRIS",
        address: "123 place holder street",
        id: "456",
        menuItems: [
            {
                itemNumber: 3,
                name: "Big Kahuna Chicken Sandwhich",
                price: 6.50,
                options: null
                
            },
            {
                itemNumber: 9,
                name: "Big Kahuna Chicken Fingers",
                price: 5.70
            },

        ]
    },
]