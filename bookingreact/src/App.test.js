import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { configure, mount, shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import Login from './components/Login';
import { MemoryRouter, Route } from 'react-router';
import Flight from './components/Flight';
import Signup from './components/Signup';
import CheckStatus from './components/Passenger/CheckStatus';
import Booking from './components/Booking';
import SearchFlight from './components/Search/Search-flight';
import AddFlight from './components/Admin/AddFlight';
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
configure({ adapter: new Adapter() });


describe('Testing App components', () => {
  test('should get success', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('NavLink').first().text()).toBe("Home");
    //wrapper.find(".btn btn-success").simulate("click")
  })
})

describe('Testing Login components', () => {
  test('should get success', () => {
    const wrapper = mount(<App />);
    // wrapper.find("#btn btn-primary").first().simulate("click");
    expect(wrapper.find('label').first().text()).toBe("Source");

  })

});


describe('test of initial load', () => {
  test('testing flight router', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Route path="/" render={() => <Flight />} />
      </MemoryRouter>
    );
    process.nextTick(() => { // to wait for loadible component will be imported
      expect(wrapper.find(Flight).html())
    });
  });
})

describe('Testing router', () => {
  test('testing Signup page ', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/signup']} initialIndex={0}>
        <Route path="/signup" render={() => <Signup />} />
      </MemoryRouter>
    );
    process.nextTick(() => { // to wait for loadible component will be imported
      expect(wrapper.find(Signup).html());
    });
  });
})

describe('Testing router', () => {
  test('testing Search Flight page', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search/78458275025802375/jonathan']} initialIndex={0}>
        <Route path="/search/78458275025802375/jonathan" render={() => <SearchFlight />} />
      </MemoryRouter>
    );
    process.nextTick(() => { // to wait for loadible component will be imported
      expect(wrapper.find(SearchFlight).html());
    });
  });
})

describe('Testing router', () => {
  test('testing check status page', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/checkstatus/jojo47']} initialIndex={0}>
        <Route path="/checkstatus/jojo47" render={() => <CheckStatus />} />
      </MemoryRouter>
    );
    process.nextTick(() => { // to wait for loadible component will be imported
      expect(wrapper.find(CheckStatus).html());
    });
  });
})


describe('Testing router', () => {
  test('testing ', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/addflight/jojo47/jonathan']} initialIndex={0}>
        <Route path="/addflight/jojo47/jonathan" render={() => <AddFlight />} />
      </MemoryRouter>
    );
    process.nextTick(() => { // to wait for loadible component will be imported
      expect(wrapper.find(AddFlight).html());
    });
  });

})



