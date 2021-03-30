import React from "react"
import { render, act, screen,  } from '@testing-library/react';
import { UserContextProvider } from "../context/UserContext.js";
import FormRestaurantName from "../components/newRestaurant/FormRestaurantName"
import FormRestaurantDescription from "../components/newRestaurant/FormRestaurantDescription"
import FormUploadImage from "../components/newRestaurant/FormUploadImage"
import FormRestaurantHours from "../components/newRestaurant/FormRestaurantHours"
import FormRestaurantMenu from "../components/newRestaurant/FormRestaurantMenu"
import FormRestaurantPreview from "../components/newRestaurant/FormRestaurantPreview"
//import FormRestaurantSubmit from "../components/newRestaurant/FormRestaurantSubmit"
//import FormRestaurantUpdate from "../components/Restaurant/FormRestaurantUpdate"


let form = {
  "name": "Big Kahuna Burger"
};
const set_form = jest.fn();


describe("<FormRestaurantName/>", () => {

  let container; 

  beforeEach( async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <FormRestaurantName form={form} setForm={set_form} />
        </UserContextProvider>
      , container)
    }); 
  });

  it("renders without error", () => {
    expect.anything(); 
  });

  it("displays the correct name", () => {
    expect(screen.getByDisplayValue("Big Kahuna Burger")).toBeInTheDocument();
  });

}); 


describe("<FormRestaurantDescription/>", () => {

  describe("empty description", () => {

    let container;

    beforeEach( async () => {

      form.description = ""; // make empty

      await act( async () => {
        render(
          <UserContextProvider>
            <FormRestaurantDescription form={form} setForm={set_form} />
          </UserContextProvider>
        , container)
      }); 
    });

    it("renders without error", () => {
      expect.anything(); 
    });
    
    
    it("textarea displays the empty description", () => {
      const text_area = screen.getByTestId("description");
      expect(text_area.value).toBe("");
    });

  }); 

  describe("textarea matches form description", () => {

    beforeEach( async () => {

      form.description = "Hawaiian themed fastfood restaurant";

      await act( async () => {
        render(
          <UserContextProvider>
            <FormRestaurantDescription form={form} setForm={set_form} />
          </UserContextProvider>
        )
      }); 
    });

    it("renders without error", () => {
      expect.anything(); 
    });
    
    
    it("textarea displays the correct description", () => {
      const text_area = screen.getByTestId("description");
      expect(text_area.value).toBe(form.description);
    });

  }); 

}); 


describe("<FormUploadImage/>", () => {

  describe("no image", () => {

    let container;

    beforeEach( async () => {

      form.image = ""; // no image

        await act( async () => {
        render(
          <UserContextProvider>
            <FormUploadImage form={form} setForm={set_form} notNew={false} />
          </UserContextProvider>
        , container)
      }); 
    });

    it("renders without error", () => {
      expect.anything(); 
    });
    
    // this will throw error when it can't find the element, so leave it commented-out
    // it("img tag to not be rendered", () => {
    //   expect(screen.getByTestId(/image-preview/i)).toThrowError("Unable to find element"); 
    // });

  }); 

  describe("image already present", () => {


    beforeEach( async () => {

      form.image = "https://firebasestorage.googleapis.com/v0/b/foodbite-10690.appspot.com/o/images%2Fb772454f-b1e8-4664-b88a-01b6c8db0f94%2Fimage.jpg?alt=media&token=a0f84070-cb2d-4bdb-a73f-6ec6b99251de";

      await act( async () => {
        render(
          <UserContextProvider>
            <FormUploadImage form={form} setForm={set_form} notNew={true}/>
          </UserContextProvider>
        ,)
      }); 
    });

    it("img tag src to match form image", () => {
      const img = screen.getByTestId("image-preview");
      expect(img.src).toBe(form.image);
    });

  }); 

});


describe("<FormRestaurantHours/>", () => {

  describe("with hours field filled", () => {

    let container;

    beforeEach( async () => {

     form.hours = {
        monday: {
            open: "21:00",
            close: "10:00"
        },
        tuesday: {
          open: "21:00",
          close: "10:00"
        },
        wednesday: {
          open: "21:00",
          close: "10:00"
        },
        thursday: {
          open: "21:00",
          close: "10:00"
        },
        friday: {
          open: "21:00",
          close: "10:00"
        },
        saturday: {
            open: "22:00",
            close: "09:00"
        },
        sunday: {
            open: "22:00",
            close: "09:00"
        },
      }

      await act( async () => {
        render(
          <UserContextProvider>
            <FormRestaurantHours form={form} setForm={set_form} notNew={true} />
          </UserContextProvider>
        , container)
      }); 
    });

    it("renders without error", () => {
      expect.anything(); 
    });

    it("displays the correct hours for notNew Restaurant for Monday", () => {
      const open = screen.getByTestId("monday-open");
      const close = screen.getByTestId("monday-close");

      expect(open.value).toBe(form.hours.monday.open);
      expect(close.value).toBe(form.hours.monday.close);
    });

    // do the rest of the days? if so just loop 

  }); 

});

describe("<FormRestaurantMenu/>", () => {

  describe("with menu items field filled, notNew restaurant", () => {

    let container;

    beforeEach( async () => {

      form.menuItems = [
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
      ]

        await act( async () => {
        render(
          <UserContextProvider>
            <FormRestaurantMenu form={form} setForm={set_form} notNew={true} />
          </UserContextProvider>
        , container)
      }); 
    });

    it("renders without error", () => {
      expect.anything(); 
    });
    
    it("displays correct menu items for notNew restaurant" , () => {
      expect(screen.getByText(form.menuItems[0].name)).toBeInTheDocument();
      expect(screen.getByText(form.menuItems[1].name)).toBeInTheDocument();
    });

  }); 
});

describe("<FormRestaurantPreview/>", () => {

  describe("with all form fields filled", () => {

    let container;

    beforeEach( async () => {

    form = {
      name: "Pizza planet",
      image: "firebasestorage.googleapis.com/some-image-url-string-here",
      description: "space themed family restaurant",
      menuItems: [
        {
          description: "...",
          name: "Medium cheese pizza",
          price: "8.50"
        },
        {
          description: "...",
          name: "Large cheese pizza",
          price: "10.48"
        }
        ],
        hours: {
            monday: {
                open: "11:00",
                close: "22:00"
            },
            tuesday: {
                open: "11:00",
                close: "22:00"
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
                open: "09:00",
                close: "23:00"
            },
            sunday: {
                open: "",
                close: ""
            },
        },
        screen: 1,
        submitting: false,
        success: false
    }

      await act( async () => {
        render(
          <UserContextProvider>
            <FormRestaurantPreview form={form} setForm={set_form} notNew={true} />
          </UserContextProvider>
        , container)
      }); 
    });

    it("renders without error", () => {
      expect.anything(); 
    });

    it("displays correct preview infromation for notNew restaurants", () => {

      const p = screen.getByTestId("name");
      expect(p).toHaveTextContent(form.name);

      expect(screen.getByTestId("image").src).toBe("http://localhost/firebasestorage.googleapis.com/some-image-url-string-here");

      const text_area = screen.getByTestId("description");
      expect(text_area).toHaveTextContent(form.description);

      expect(screen.getAllByText("11:00 AM to 10:00 PM")).toBeTruthy();
      expect(screen.getByText("09:00 AM to 11:00 PM")).toBeInTheDocument();
      
      expect(screen.getByText(form.menuItems[0].name)).toBeInTheDocument();
      expect(screen.getByText(form.menuItems[1].name)).toBeInTheDocument();
    });
  }); 

});

/*
describe("<FormRestaurantSubmit/>", () => {

  window.alert = jest.fn();

  describe("with all form fields filled", () => {

    const handle_submit = jest.fn( () => Promise.resolve(true)); // mock onSubmit (firebase call)
    window.alert.mockClear();  
    
    act( async () => {
      render(
        <UserContextProvider>
          <FormRestaurantSubmit form={form} setForm={set_form} notNew={true} />
        </UserContextProvider>
      )
    }); 

    //userEvent.click(screen.getByRole("button", { name: /submit/i })); 
    // have to update source code 

  });
});
*/ 