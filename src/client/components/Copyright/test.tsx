import { render, screen } from "@testing-library/react";

import Copyright from ".";

describe(`Copyright`, () => {
  it(`renders the copyright with application name`, () => {
    render(<Copyright />);

    const element = screen.getByText(`Carlos Loureiro`);

    expect(element).toBeInTheDocument();
  });
});
