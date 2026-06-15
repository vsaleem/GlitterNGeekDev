/**
 * @jest-environment node
 */
import { GET } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("returns 200 with status ok", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("returns JSON with status field set to ok", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.status).toBe("ok");
  });

  it("returns JSON with service field", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.service).toBe("GlitterNGeek");
  });

  it("returns JSON with a timestamp", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.timestamp).toBeTruthy();
    expect(() => new Date(body.timestamp)).not.toThrow();
  });
});
