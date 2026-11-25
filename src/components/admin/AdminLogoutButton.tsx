"use client";

import { signOut } from "next-auth/react";

export default function AdminLogoutButton() { return <button type="button" onClick={() => void signOut({ callbackUrl: "/admin/login" })}><i className="far fa-sign-out" /> Sign out</button>; }
