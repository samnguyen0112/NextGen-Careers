import { describe, expect, it } from "vitest";
import { getCompanyCopy } from "@/frontend/features/candidate-company/i18n/company-copy";

describe("Candidate Company locale copy", () => {
  it("keeps the Company surface fully localized in English", () => {
    const copy = getCompanyCopy("en");

    expect(copy.searchCompanies).toBe("Search companies");
    expect(copy.paginationPage).toBe("Page");
    expect(copy.companyInformation).toBe("Company information");
    expect(copy).not.toHaveProperty("teamApplications");
    expect(copy).not.toHaveProperty("applyAs");
  });

  it("keeps the Company surface fully localized in Vietnamese", () => {
    const copy = getCompanyCopy("vi");

    expect(copy.searchCompanies).toBe("Tìm kiếm công ty");
    expect(copy.companySearchPlaceholder).toBe(
      "Tên công ty, ngành hoặc địa điểm",
    );
    expect(copy.paginationPage).toBe("Trang");
    expect(copy.companyInformation).toBe("Thông tin công ty");
    expect(copy).not.toHaveProperty("teamApplications");
    expect(copy).not.toHaveProperty("applyAs");
  });
});
