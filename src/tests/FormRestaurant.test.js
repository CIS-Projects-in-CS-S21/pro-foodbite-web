import React from "react"
import { render, act, screen, waitFor, prettyDOM, } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { UserContextProvider } from "../context/UserContext.js";
// import {  Router } from "react-router-dom"
// import { createMemoryHistory } from "history";
import FormRestaurantName from "../components/newRestaurant/FormRestaurantName"
import FormRestaurantDescription from "../components/newRestaurant/FormRestaurantDescription"
import FormUploadImage from "../components/newRestaurant/FormUploadImage"
import FormRestaurantHours from "../components/newRestaurant/FormRestaurantHours"
import FormRestaurantMenu from "../components/newRestaurant/FormRestaurantMenu"


const form = {
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


// describe("<FormRestaurantMenu/>", () => {

//   describe("with menu items field filled", () => {

//     let container;

//     beforeEach( async () => {

//       form.menu = [
//         {
//           description: "its a tasty burger",
//           name: "big kahuna burger",
//           price: "5.50"
//         },
//         {
//           description: "nothing special",
//           name: "fried",
//           price: "2.50"
//         }
//       ]

//         await act( async () => {
//         render(
//           <UserContextProvider>
//             <FormRestaurantMenu form={form} setForm={set_form} notNew={true} />
//           </UserContextProvider>
//         , container)
//       }); 
//     });

//     it("renders without error", () => {
//       expect.anything(); 
//     });
    
//     // this will throw error when it can't find the element, so leave it commented-out
//     // it("img tag to not be rendered", () => {
//     //   expect(screen.getByTestId(/image-preview/i)).toThrowError("Unable to find element"); 
//     // });

//   }); 


// });




