"use client";

import { PATH } from "@/constants/app.const";
import { Box } from "@mui/material";
import Link from "next/link";

export const FooterLink = () => {
  return (
    <Box className="flex gap-[6px] justify-center mt-2">
      <Box className="text-[1.6rem] text-[#ffffff80]">
        {"Vous n'avez pas de compte ?"}
      </Box>
      <Link
        className="font-bold text-[1.6rem] text-[#fff] cursor-pointer no-underline hover:underline"
        href={PATH.REGISTER}
      >
        {"S'inscrire"}
      </Link>
    </Box>
  );
};
