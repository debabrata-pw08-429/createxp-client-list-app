"use client";

import { Button } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = ButtonProps & {
	children: ReactNode;
};

export default function PrimaryButton({ children, ...props }: Props) {
	return (
		<Button
			colorPalette="black"
            padding={4}
			variant="solid"
			borderRadius="lg"
			fontWeight="semibold"
            bg="black"
            color="white"
            _hover={{
                bg: "blackAlpha.800",
            }}
			{...props}
		>
			{children}
		</Button>
	);
}


