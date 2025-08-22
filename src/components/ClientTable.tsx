"use client";

import { Client } from "@/types/client";
import { Table } from "@chakra-ui/react";
import { formatDateUTC } from "@/lib/date";

type Props = {
  clients: Client[];
};

export default function ClientTable({ clients }: Props) {
  return (
    <Table.ScrollArea>
      <Table.Root variant="line" striped colorPalette="gray" size="md" stickyHeader>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Created At</Table.ColumnHeader>
            <Table.ColumnHeader>Updated At</Table.ColumnHeader>
            <Table.ColumnHeader>Updated By</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.map((c) => (
            <Table.Row key={c.id}>
              <Table.Cell>{c.id}</Table.Cell>
              <Table.Cell>{c.name}</Table.Cell>
              <Table.Cell>{c.type}</Table.Cell>
              <Table.Cell>{c.email}</Table.Cell>
              <Table.Cell>{c.status}</Table.Cell>
              <Table.Cell>{formatDateUTC(c.createdAt)}</Table.Cell>
              <Table.Cell>{formatDateUTC(c.updatedAt)}</Table.Cell>
              <Table.Cell>{c.updatedBy ?? "-"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
