import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { userData as user } from "./data";
import { paths } from "../../../../configs";
import { getAuthUserQueryOptions } from "../../../../lib";
import UpdateUserMainProfile from "../update-main-profile";

const queryClient = new QueryClient();

const router = createMemoryRouter(
  [
    {
      path: paths.protected.userSettings.getHref(),
      element: <UpdateUserMainProfile />,
    },
  ],
  { initialEntries: [paths.protected.userSettings.getHref()] }
);

const renderRouteComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

beforeAll(() => {
  queryClient.setQueryData(getAuthUserQueryOptions().queryKey, user);

  return () => queryClient.removeQueries();
});

describe("User Main Profile Form", () => {
  it("renders the user profile form", () => {
    renderRouteComponent();

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByLabelText("Display Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Display Name").value).toBe(user.profile.displayName);
    expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
    expect(screen.getByLabelText("Banner")).toBeInTheDocument();
    expect(screen.getByText("Change Avatar")).toBeInTheDocument();
    expect(screen.getByText("Change Banner")).toBeInTheDocument();
    expect(screen.getByLabelText("About Me")).toBeInTheDocument();
    expect(screen.getByLabelText("About Me").value).toBe(user.profile.aboutMe);
  });

  it("renders the user profiles' preview", () => {
    renderRouteComponent();

    expect(screen.getByTestId("user-profile-preview")).toBeInTheDocument();
    expect(screen.getByAltText("Profile background")).toBeInTheDocument();
    expect(screen.getAllByAltText("crno's avatar").length).toBe(2);
  });
});
