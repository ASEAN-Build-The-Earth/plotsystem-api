import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchBar from './components/SearchBar';
import Result from './components/Result';

const setup = () => {
  const utils = render(<SearchBar><Result/></SearchBar>);
  const input = screen.getByTestId("input");
  const button = screen.getByTestId("button");
  return { input, button, ...utils }
}

test("Should show a loader while fetching API", () => {
  const { ...utils } = setup();
  expect(utils.getByTestId("loader")).toBeInTheDocument();
})

test("After closing tutorial guide, should show an alert to search for plots", async () => {
  const { input, button, ...utils } = setup();
  const closeButton = await utils.findByRole("close_button")

  expect(closeButton).toBeInTheDocument();
  expect(utils.getByLabelText(/Plot ID:/i)).toBeInTheDocument();

  fireEvent.click(closeButton);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/Insert your in-progress Plot ID here/i);
});

test("Try inserting invalid number of zero to text box, should send an alert", async () => {
  const { input, button, ...utils } = setup();

  // focus and type value into search box
  expect(button).toBeDisabled();
  expect(input.value).toBe("");
  fireEvent.change(input, { target: { value: 0 }});
  expect(button).not.toBeDisabled();

  // click the search box, it should be disabled
  fireEvent.click(button);
  expect(button).toBeDisabled();

  // button re enable after a delay
  setTimeout(() => {
    expect(button).not.toBeDisabled();
  }, 3000)

  // an alert message should be fire since the test value of "0" is invalid
  const alert = await utils.findByRole("alert");
  expect(alert).toHaveTextContent(/Invalid Number/i);
});

test("Text input should be limited to 3 digits", async () => {
  const { input, button } = setup();
  expect(button).toBeDisabled();
  expect(input.value).toBe("");

  // Inserting 4 digits number straight should be blocked
  fireEvent.change(input, { target: { value: 1234 }}); expect(input.value).toBeFalsy();
  fireEvent.change(input, { target: { value: 1 }}); expect(input.value).not.toBeFalsy();

  // Editing from valid digits whould be limited to the current digits
  fireEvent.change(input, { target: { value: 12 }}); expect(input.value).toBe("12");
  fireEvent.change(input, { target: { value: 123 }}); expect(input.value).toBe("123");
  fireEvent.change(input, { target: { value: 1234 }}); expect(input.value).toBe("123");
  fireEvent.change(input, { target: { value: 12345 }}); expect(input.value).toBe("123");

  expect(button).not.toBeDisabled();
})