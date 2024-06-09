import { fireEvent, render, screen } from "@testing-library/react";

import Input from ".";

describe(`Input`, () => {
  it(`renders the input with label`, () => {
    const text = `Hello World`;

    render(<Input label={text} />);

    const element = screen.getByLabelText(text);

    expect(element).toBeInTheDocument();
  });

  it(`check if onchange is called`, () => {
    const text = `Hello World`;

    const onChange = jest.fn();

    render(<Input label={text} onChange={onChange} />);

    const element: HTMLInputElement = screen.getByLabelText(text);

    fireEvent.change(element, { target: { value: `Hello` } });

    expect(onChange).toHaveBeenCalled();
  });

  it(`check if errors is rendered`, () => {
    const text = `Hello World`;
    const errors = [`Error 1`, `Error 2`];

    render(<Input _errors={errors} label={text} />);

    for (const error of errors) {
      const element = screen.getByText(error);

      expect(element).toBeInTheDocument();
    }
  });
});
