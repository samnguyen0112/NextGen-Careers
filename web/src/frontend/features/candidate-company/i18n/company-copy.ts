import type { WorkspaceLocale } from "@/frontend/features/dashboard/client/workspace-locale";

const companyCopyExtensions = {
  candidateWorkspace: "Candidate workspace",
  companyCount: (count: number) =>
    `${count} ${count === 1 ? "company" : "companies"}`,
  jobsLoadError: "Jobs could not be loaded. Please try again.",
  searching: "Searching...",
  verifiedCompany: "Verified company",
  companyInformation: "Company information",
  founded: "Founded",
  companySize: "Company size",
  employees: "Employees",
  industry: "Industry",
  jobSearchLabel: "Search company jobs",
  jobSearchPlaceholder: "Job title, skill, or keyword",
  jobResultPages: "Job result pages",
} as const;

const vietnameseCompanyCopyExtensions = {
  candidateWorkspace: "Không gian ứng viên",
  companyCount: (count: number) => `${count} công ty`,
  jobsLoadError: "Không thể tải việc làm. Vui lòng thử lại.",
  searching: "Đang tìm kiếm...",
  verifiedCompany: "Công ty đã xác minh",
  companyInformation: "Thông tin công ty",
  founded: "Năm thành lập",
  companySize: "Quy mô công ty",
  employees: "Nhân viên",
  industry: "Ngành",
  jobSearchLabel: "Tìm kiếm việc làm của công ty",
  jobSearchPlaceholder: "Tên việc làm, kỹ năng hoặc từ khóa",
  jobResultPages: "Trang kết quả việc làm",
} as const;

const englishCompanyCopy = {
  company: "Company",
  companies: "Companies",
  discoverDescription: "Discover verified companies and open opportunities.",
  viewCompany: "View company",
  verified: "Verified",
  verifiedEmployersLabel: "verified employers",
  popular: "Popular",
  informationTechnology: "Information Technology",
  manufacturing: "Manufacturing",
  education: "Education",
  salesMarketing: "Sales & Marketing",
  openRoles: (count: number) =>
    `${count} ${count === 1 ? "open role" : "open roles"}`,
  unavailable: "Unavailable",
  noCompanies: "No companies are available yet",
  noCompaniesDescription: "Verified public company profiles will appear here.",
  openPositions: "Open positions",
  ordinaryJobsDescription:
    "These ordinary jobs use the existing job application workflow.",
  keyword: "Keyword",
  location: "Location",
  allLocations: "All locations",
  search: "Search",
  clear: "Clear",
  searchCompanies: "Search companies",
  companySearchPlaceholder: "Company name, industry, or location",
  noMatchingCompanies: "No companies match your search",
  noMatchingCompaniesDescription:
    "Try another company name, industry, or location.",
  paginationShowing: "Showing",
  paginationOf: "of",
  perPage: "Per page",
  paginationPage: "Page",
  firstPage: "First page",
  previousPage: "Previous page",
  nextPage: "Next page",
  lastPage: "Last page",
  backToCompanies: "Back to Companies",
  positionsShown: (count: number) =>
    `${count} ${count === 1 ? "position" : "positions"} shown`,
  jobUnit: "jobs",
  noMatchingPositions: "No open positions match these filters",
  noMatchingPositionsDescription:
    "Clear the filters to view all current positions.",
} as const;

const vietnameseCompanyCopy = {
  company: "Công ty",
  companies: "Các công ty",
  discoverDescription: "Khám phá các công ty đã xác minh và vị trí đang tuyển.",
  viewCompany: "Xem công ty",
  verified: "Đã xác minh",
  verifiedEmployersLabel: "nhà tuyển dụng đã xác minh",
  popular: "Phổ biến",
  informationTechnology: "Công nghệ thông tin",
  manufacturing: "Sản xuất",
  education: "Giáo dục",
  salesMarketing: "Kinh doanh & tiếp thị",
  openRoles: (count: number) => `${count} vị trí đang tuyển`,
  unavailable: "Chưa có thông tin",
  noCompanies: "Chưa có công ty nào",
  noCompaniesDescription:
    "Các hồ sơ công ty công khai đã xác minh sẽ hiển thị tại đây.",
  openPositions: "Vị trí đang tuyển",
  ordinaryJobsDescription:
    "Các công việc thông thường sử dụng quy trình ứng tuyển hiện có.",
  keyword: "Từ khóa",
  location: "Địa điểm",
  allLocations: "Tất cả địa điểm",
  search: "Tìm kiếm",
  clear: "Xóa bộ lọc",
  searchCompanies: "Tìm kiếm công ty",
  companySearchPlaceholder: "Tên công ty, ngành hoặc địa điểm",
  noMatchingCompanies: "Không có công ty phù hợp với tìm kiếm",
  noMatchingCompaniesDescription:
    "Hãy thử tên công ty, ngành hoặc địa điểm khác.",
  paginationShowing: "Hiển thị",
  paginationOf: "trên tổng số",
  perPage: "Mỗi trang",
  paginationPage: "Trang",
  firstPage: "Trang đầu",
  previousPage: "Trang trước",
  nextPage: "Trang sau",
  lastPage: "Trang cuối",
  backToCompanies: "Quay lại danh sách công ty",
  positionsShown: (count: number) => `${count} vị trí được hiển thị`,
  jobUnit: "việc làm",
  noMatchingPositions: "Không có vị trí phù hợp với bộ lọc",
  noMatchingPositionsDescription: "Xóa bộ lọc để xem các vị trí hiện có.",
} as const;

type WidenCompanyCopy<T> = T extends (...args: infer Args) => infer Return
  ? (...args: Args) => null extends Return ? string | null : string
  : T extends string
    ? string
    : T;

export type CompanyCopy = {
  [Key in keyof typeof englishCompanyCopy]: WidenCompanyCopy<
    (typeof englishCompanyCopy)[Key]
  >;
} & {
  [Key in keyof typeof companyCopyExtensions]: WidenCompanyCopy<
    (typeof companyCopyExtensions)[Key]
  >;
};

export function getCompanyCopy(locale: WorkspaceLocale): CompanyCopy {
  return locale === "vi"
    ? {
        ...vietnameseCompanyCopy,
        ...companyCopyExtensions,
        ...vietnameseCompanyCopyExtensions,
      }
    : { ...englishCompanyCopy, ...companyCopyExtensions };
}

export { englishCompanyCopy, vietnameseCompanyCopy };
