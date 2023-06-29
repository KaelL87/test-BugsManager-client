import AddBugModal from ".";
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe("AddBugModal", () => {
  const initialState = {output:10}
  const mockStore = configureStore()
  let store
  beforeEach(() => {
    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <AddBugModal />
      </Provider>
    );
  });

  test("should show title all the time", () => {
    expect(screen.getByText(/Add Bug/i)).toBeDefined();
  });

  test("should show the select label at the start", () => {
    expect(screen.queryByText(/Users/i)).toBeDefined();
  });
  test("should show the input label at the start", () => {
    expect(screen.queryByText(/Projects/i)).toBeDefined();
  });
  test("should show the input label at the start", () => {
    expect(screen.queryByText(/Description/i)).toBeDefined();
  });
});
