"use client";

import { signOut } from "better-auth/api";
import { DropdownMenuItem } from "./dropdown-menu";

export default function SignOutButton() {
  return (
    <DropdownMenuItem
      onClick={async () => {
        await signOut();
      }}
    >
      Log Out
    </DropdownMenuItem>
  );
}
