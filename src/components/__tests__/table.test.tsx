import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";

afterEach(cleanup);

describe("Table", () => {
  it("SHOULD render headers and row content WHEN given data", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>PAR-001</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText("Name")).not.toBeNull();
    expect(screen.getByText("PAR-001")).not.toBeNull();
  });

  it("SHOULD render as a semantic table element", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>PAR-001</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole("table")).not.toBeNull();
  });
});
