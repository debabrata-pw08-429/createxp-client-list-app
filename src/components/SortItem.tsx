"use client";

import { SortCriteria } from "@/types/client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { LuGripVertical, LuArrowUp, LuArrowDown } from "react-icons/lu";

type Props = {
  item: SortCriteria;
  onSelectDirection: (id: string, direction: "asc" | "desc") => void;
  onRemove: (id: string) => void;
};

export default function SortItem({ item, onSelectDirection, onRemove }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  const isDate = item.key === "createdAt" || item.key === "updatedAt";

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      align="center"
      justify="space-between"
      p={2}
      borderWidth="1px"
      borderRadius="md"
      bg="white"
    >
      <Flex align="center" gap={3} cursor="grab" {...attributes} {...listeners}>
        <LuGripVertical />
        <Box fontWeight="medium">{item.label}</Box>
      </Flex>
      <Flex align="center" gap={2}>
        <Button
          size="sm"
          variant={item.direction === "asc" ? "solid" : "subtle"}
          colorPalette={item.direction === "asc" ? "blue" : "gray"}
          onClick={() => onSelectDirection(item.id, "asc")}
        >
          <Flex align="center" gap={2}>
            <LuArrowUp />
            <Box>{isDate ? "Newest to Oldest" : "A-Z"}</Box>
          </Flex>
        </Button>
        <Button
          size="sm"
          variant={item.direction === "desc" ? "solid" : "subtle"}
          colorPalette={item.direction === "desc" ? "blue" : "gray"}
          onClick={() => onSelectDirection(item.id, "desc")}
        >
          <Flex align="center" gap={2}>
            <LuArrowDown />
            <Box>{isDate ? "Oldest to Newest" : "Z-A"}</Box>
          </Flex>
        </Button>
        <IconButton aria-label="remove" variant="ghost" onClick={() => onRemove(item.id)}>
          <FaTimes />
        </IconButton>
      </Flex>
    </Flex>
  );
}
