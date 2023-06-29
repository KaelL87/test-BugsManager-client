import CardBug from ".";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { IBug } from "src/store/slices/bugsSlice";

describe("CardBug", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CardBug
            data={
              {
                id: 1,
                description: 'test',
                project: 'project 1',
                creationDate: new Date(Date.now()),
                username: 'test 1',
                _id: '12312qeq'
              } as unknown as IBug
            }
          />
        </BrowserRouter>
      </Provider>
    );
  });

  test("should show title all the time", () => {
    expect(screen.getByText(/test 1/i)).toBeDefined();
  });

  test("should show the content at the start", () => {
    expect(screen.queryByText(/project 1/i)).toBeDefined();
  });
});
