"use client";

import { useState, useMemo, useEffect } from "react";
import { clients as mockClients } from "@/lib/mockData";
import { multiSort } from "@/lib/sortUtils";
import { SortCriteria } from "@/types/client";
import { Flex, Box, Tabs, IconButton, Badge } from "@chakra-ui/react";
import PrimaryButton from "@/components/PrimaryButton";
import ClientTable from "@/components/ClientTable";
import { LuSearch, LuArrowUpDown, LuFilter } from "react-icons/lu";
import SortPanel from "@/components/SortPanel";

export default function ClientsPage() {
  const [criteria, setCriteria] = useState<SortCriteria[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('client-sort-criteria');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn('Failed to parse saved sort criteria:', e);
        }
      }
    }
    return [
      { id: "1", key: "name", label: "Client Name", direction: "asc" },
      { id: "2", key: "createdAt", label: "Created At", direction: "desc" },
    ];
  });
  const [showSortPanel, setShowSortPanel] = useState(false);

  type FilterType = "All" | "Individual" | "Company";
  const [filter, setFilter] = useState<FilterType>("All");

  const sortedClients = useMemo(() => multiSort(mockClients, criteria), [criteria]);

  const filteredClients = useMemo(() => {
    if (filter === "All") return sortedClients;
    return sortedClients.filter((c) => c.type === filter);
  }, [sortedClients, filter]);

  // Persist sort criteria to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('client-sort-criteria', JSON.stringify(criteria));
    }
  }, [criteria]);

  return (
    <Box position="relative" minH="100vh">
      <Flex p={6} gap={6} direction="column">
        <Box fontWeight="bold" fontSize="xl">Clients</Box>
        <Flex justify="space-between" align="center">
          <Tabs.Root value={filter} onValueChange={(e) => setFilter(e.value as FilterType)}>
            <Tabs.List>
              <Tabs.Trigger value="All">All</Tabs.Trigger>
              <Tabs.Trigger value="Individual">Individual</Tabs.Trigger>
              <Tabs.Trigger value="Company">Company</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
          <Flex align="center" gap={3}>
            <IconButton aria-label="search" variant="ghost">
              <LuSearch />
            </IconButton>
            <Box position="relative">
              <IconButton aria-label="sort" variant="ghost" onClick={() => setShowSortPanel(!showSortPanel)}>
                <LuArrowUpDown />
              </IconButton>
              <Badge position="absolute" top="-1" right="-1" bg="red.500" color="white" borderRadius="full" px={1.5} fontSize="xs">
                {criteria.length}
              </Badge>
            </Box>
            <IconButton aria-label="filter" variant="ghost">
              <LuFilter />
            </IconButton>
            <PrimaryButton>+ Add Client</PrimaryButton>
          </Flex>
        </Flex>
        <ClientTable clients={filteredClients} />
      </Flex>
      
      {showSortPanel && (
        <SortPanel 
          criteria={criteria} 
          setCriteria={setCriteria} 
          onApply={() => setShowSortPanel(false)}
          position="fixed"
          top="108px"
          right="220px"
          zIndex={1000}
          maxH="80vh"
          overflowY="auto"
        />
      )}
    </Box>
  );
}
