import { render, screen } from '@testing-library/react';
import Routes from "../Routes";
import App from '../App';
import Navigation from '../components/Navigation';
import { UserContext } from "../context/UserContext.js";



beforeEach(() => {
  document.body.innerHTML = "";
});


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("stuff ...");
  expect(linkElement).toBeInTheDocument();
});



/**
 * @summary Preforms the unit tests for the navigation links
 *          to make sure the correct links are display when a
 *          user is authenticated or not
 */
describe("Testing Navigation Component", () => {

  it("should not show protected routes", () => {
    let auth = false;
    let testElements = (
      <UserContext.Provider value={{ auth }}>
        <Routes>
          <Navigation />
        </Routes>
      </UserContext.Provider>
    );


    render(testElements);
    const linkElement = screen.getByText("Sign in");
    expect(linkElement).toBeInTheDocument();
  });

  it("should show protected routes", () => {
    let auth = true;
    let testElements = (
      <UserContext.Provider value={{ auth }}>
        <Routes>
          <Navigation />
        </Routes>
      </UserContext.Provider>
    );


    render(testElements);
    const linkElement = screen.getByText("Account");
    expect(linkElement).toBeInTheDocument();
  });
});