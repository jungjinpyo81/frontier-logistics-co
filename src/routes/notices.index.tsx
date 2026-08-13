import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/notices/")({
  beforeLoad: () => {
    throw redirect({ to: "/insights", hash: "notices" });
  },
});
