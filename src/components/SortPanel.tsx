"use client";

import { Client, SortCriteria, SortDirection } from "@/types/client";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import PrimaryButton from "@/components/PrimaryButton";
import SortItem from "./SortItem";
import { LuCalendar, LuUser, LuHash, LuClock, LuArrowUp, LuArrowDown } from "react-icons/lu";

type Props = {
  criteria: SortCriteria[];
  setCriteria: (c: SortCriteria[]) => void;
  onApply?: () => void;
  position?: string;
  top?: string;
  right?: string;
  zIndex?: number;
  w?: string;
  maxH?: string;
  overflowY?: string;
};

type Option = {
  key: keyof Client;
  label: string;
  icon: React.ComponentType;
  defaultDirection: SortDirection;
};

const ALL_OPTIONS: Option[] = [
  { key: "name", label: "Client Name", icon: LuUser, defaultDirection: "asc" },
  { key: "createdAt", label: "Created At", icon: LuCalendar, defaultDirection: "desc" },
  { key: "updatedAt", label: "Updated At", icon: LuClock, defaultDirection: "desc" },
  { key: "id", label: "Client ID", icon: LuHash, defaultDirection: "asc" },
];

export default function SortPanel({ criteria, setCriteria, onApply, ...boxProps }: Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = criteria.findIndex((c) => c.id === active.id);
    const newIndex = criteria.findIndex((c) => c.id === over.id);
    setCriteria(arrayMove(criteria, oldIndex, newIndex));
  };

  const selectDirection = (id: string, direction: SortDirection) => {
    setCriteria(criteria.map((c) => (c.id === id ? { ...c, direction } : c)));
  };

  const removeCriteria = (id: string) => {
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const addCriteria = (opt: Option, direction?: SortDirection) => {
    setCriteria([
      ...criteria,
      { id: `${opt.key}-${Date.now()}`,
        key: opt.key,
        label: opt.label,
        direction: direction ?? opt.defaultDirection },
    ]);
  };

  const selectedKeys = new Set(criteria.map((c) => c.key));
  const available = ALL_OPTIONS.filter((o) => !selectedKeys.has(o.key));

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="xl" 
      p={6} 
      bg="white" 
      boxShadow="2xl" 
      w="full" 
      maxW="xl"
      {...boxProps}
    >
      <Text fontSize="lg" fontWeight="bold" mb={3}>Sort By</Text>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={criteria.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          <Box display="flex" flexDirection="column" gap={3}>
            {criteria.map((c) => (
              <SortItem
                key={c.id}
                item={c}
                onSelectDirection={selectDirection}
                onRemove={removeCriteria}
              />
            ))}
          </Box>
        </SortableContext>
      </DndContext>

      <Box my={4} h="1px" bg="gray.200" />

      <Box display="flex" flexDirection="column" gap={2}>
        {available.map((opt) => (
          <Flex
            key={opt.key as string}
            align="center"
            justify="space-between"
            p={2}
            borderWidth="1px"
            borderRadius="md"
            bg="gray.50"
          >
            <Flex align="center" gap={3}>
              <Icon as={opt.icon} />
              <Box>{opt.label}</Box>
            </Flex>
            <Flex gap={2}>
              <Button size="sm" variant="subtle" onClick={() => addCriteria(opt, "asc")}>
                <Flex align="center" gap={2}>
                  <Icon as={LuArrowUp} />
                  <Box>
                    {opt.key === "name" || opt.key === "id" ? "A-Z" : "Newest to Oldest"}
                  </Box>
                </Flex>
              </Button>
              <Button size="sm" variant="subtle" onClick={() => addCriteria(opt, "desc")}>
                <Flex align="center" gap={2}>
                  <Icon as={LuArrowDown} />
                  <Box>
                    {opt.key === "name" || opt.key === "id" ? "Z-A" : "Oldest to Newest"}
                  </Box>
                </Flex>
              </Button>
            </Flex>
          </Flex>
        ))}
      </Box>

      <Flex mt={5} justify="space-between" align="center">
        <Button variant="ghost" onClick={() => setCriteria([])}>Clear all</Button>
        <PrimaryButton onClick={onApply}>Apply Sort</PrimaryButton>
      </Flex>
    </Box>
  );
}
