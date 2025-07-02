import { NextRequest } from "next/server";

export function isInternalRequest(req: NextRequest) {
  const allowed = process.env.APP_BASE_URL || "http://localhost:3000";
  const referer = req.headers.get("referer") || "";
  const origin = req.headers.get("origin") || "";

  // Permite se referer OU origin começa com a URL base (local ou produção)
  return (
    referer.startsWith(allowed) ||
    origin.startsWith(allowed)
  );
}
