"use client";

import styled from "@emotion/styled";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const GuestLayoutRouter = ({ children }: Props) => {
  return (
    <GuestLayoutContainer>
      <div>Long Nguyen</div>
    </GuestLayoutContainer>
  );
};

const GuestLayoutContainer = styled.div`
  background-color: aqua;
  height: 100vh;
`;
