# Implementation Plan: Candidate Company

**Branch**: `028-candidate-company-job-applications` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/028-candidate-company-job-applications/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

> **Current delivery scope (2026-09-01):** This delivery keeps the Company discovery, detail, and ordinary company-job search experience only. Candidate applications for HR Manager/Recruiter roles and the Owner/Candidate Team Applications screens and APIs are de-scoped. Existing team-member invitations remain available, while historical TeamApplication records, schema, and retention processing are retained for compatibility and privacy cleanup; no new TeamApplication entry point is exposed.

## Summary

Add a Candidate-facing Company discovery experience with public company cards, keyword search, deterministic company pagination, company detail pages, employee-derived size, and scoped job search by keyword and location. Company jobs are paginated and reuse the existing Find Jobs card/status actions. Ordinary job applications continue using the existing job detail, application, scoring, and pipeline workflows. Existing company-member invitations remain available to Owners; historical TeamApplication records and retention processing are kept only for compatibility and privacy cleanup.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.9, React 19, Next.js 16 App Router, Prisma 7.9, PostgreSQL 16.

**Primary Dependencies**: Existing Better Auth session boundary, Zod contracts, Prisma repositories, CompanyMembership/CompanyInvitation services, CV document storage, job discovery/search service, notification outbox/email service, CSRF and audit primitives.

**Storage**: PostgreSQL for company/job/application/invitation state, plus historical TeamApplication records; existing protected CV storage and notification outbox continue to support retention and delivery cleanup for legacy data.

**Testing**: Vitest unit, contract, integration, security and frontend tests; Playwright system tests; accessibility checks; representative P95 performance tests.

**Target Platform**: Existing responsive Next.js Candidate workspace and Recruiter/Company Settings workspace.

**Project Type**: Next.js modular-monolith web application.

**Performance Goals**: Company list/detail and scoped keyword/location job search P95 ≤2 seconds; normal page load P95 ≤3 seconds; invitation and decision actions provide visible completion/failure feedback without duplicate records.

**Constraints**: Server-side company visibility and tenant authorization; only approved public companies/jobs; Owner invitation acceptance required before membership; no public HR Manager/Recruiter self-application or Team Applications UI/API; no scoring, AI, pipeline, or automatic hiring changes; Vietnamese personal-data and retention controls.

**Scale/Scope**: One public Company area, one company detail view with scoped job search, and the existing company invitation/team-management flow. Reuse existing ordinary job application flow; no public people directory, Team Applications surface, or general-purpose ATS pipeline.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Gate                                | Status | Evidence                                                                                                                                                                |
| ----------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Human-controlled recruitment        | PASS   | Owner explicitly accepts or rejects team applications; no automatic hiring, scoring, or pipeline transition.                                                            |
| Security, privacy, tenant isolation | PASS   | Public projections expose approved company/job fields only; CVs and application records require candidate/Owner authorization; membership is not granted on submission. |
| State, audit, and integrity         | PASS   | Team application and invitation transitions are server-validated, transactional, auditable, and idempotent; duplicate active applications/invitations are prevented.    |
| CV and personal-data protection     | PASS   | PDF/DOCX and 5,000,000-byte limit, validation before persistence, least-privilege CV access, retention/deletion policy, and email privacy controls are specified.       |
| Quality and accessibility           | PASS   | P95 search/page targets, responsive UI, keyboard access, labels, loading/error states, and security/performance acceptance tests are planned.                           |
| Maintainable boundaries             | PASS   | Company/job projections, invitation service, repositories, contracts, and UI remain separated; ordinary job workflow is reused and legacy retention stays isolated.        |
| Scope discipline                    | PASS   | No scoring, AI recommendation, pipeline/Kanban, or ordinary job application replacement is introduced.                                                                  |

## Project Structure

### Documentation (this feature)

```text
spec-kit/specs/028-candidate-company-job-applications/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., web, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Phase 0: Research Summary

Research decisions are recorded in [research.md](./research.md). The design reuses existing domain boundaries rather than introducing a second ordinary job-application system.

## Phase 1: Design Summary

- Public Company pages use a safe, approved-company projection with keyword/pagination controls and reuse deterministic job discovery/search behavior scoped by `companyId`; company job cards reuse Find Jobs status/action UI.
- Existing Owner invitations and team management remain transactional and tenant-scoped; invitation acceptance is the only transition that grants company membership.
- Company size is a read-time projection from active membership count and documented size ranges, with an unavailable state when source data is missing.
- Candidate and Owner views expose only their permitted Company, ordinary-job, and existing team-management projections. Historical CV evidence remains protected by the existing retention worker.
- No new HR Manager/Recruiter self-application or Team Applications route, API, navigation entry, or notification destination is exposed; legacy records and queued messages remain drainable for cleanup.
- Company and existing team-management copy is read from the shared English/Vietnamese workspace locale boundary; company and job content remains user-authored.

## Project Structure

### Documentation (this feature)

```text
spec-kit/specs/028-candidate-company-job-applications/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/company-team-applications.openapi.yaml
└── checklists/requirements.md
```

### Source Code (repository root)

```text
web/
├── prisma/schema.prisma and migration
├── src/app/(workspace)/company/page.tsx
├── src/app/(workspace)/company/[companyId]/page.tsx
├── src/app/api/companies/route.ts
├── src/app/api/companies/[companyId]/route.ts
├── src/app/api/companies/[companyId]/jobs/route.ts
├── src/app/api/recruiter/company/team/invitations/accept/route.ts
├── src/backend/services/companies/company-discovery-service.ts
├── src/backend/repositories/companies/
├── src/backend/repositories/company-members/
├── src/frontend/features/candidate-company/
├── src/frontend/features/recruiter-workspace/company-team-screen.tsx
├── src/shared/contracts/company/
└── tests/{backend,frontend,security,system}/company-discovery/
```

**Structure Decision**: Extend the existing modular web application. Candidate company discovery and ordinary job navigation belong to the public/candidate job-board boundary. Existing Owner invitations, team management, and membership creation remain in the company-members/recruiter workspace boundary. Historical TeamApplication persistence and retention are compatibility-only infrastructure; shared contracts keep transport validation separate from domain services and persistence.

## Implementation Phases

### Phase 0 — Research

1. Confirm existing approved-company projection and public job visibility rules.
2. Confirm job search normalization and company-scoped filtering behavior.
3. Confirm existing company invitation acceptance, membership authorization, and email outbox idempotency boundaries.
4. Record decisions and rejected alternatives in `research.md`.

### Phase 1 — Data and contracts

1. Keep historical TeamApplication persistence and retention/deletion handling compatible with existing records.
2. Define public company list/detail/job-search projections and existing invitation/team-management contracts.
3. Verify invitation acceptance and membership outcomes, including retry/idempotency behavior.
4. Create quickstart validation scenarios.
5. Update agent context to reference this plan.

### Phase 2 — Implementation sequencing for tasks generation

1. Public company projections and responsive Candidate Company list/detail UI.
2. Company-scoped keyword/location search and navigation to existing job detail pages.
3. Existing company invitation acceptance and membership creation using company membership rules.
4. Security, accessibility, integration, system, and P95 verification for the Company experience.

## Complexity Tracking

No constitutional violations identified; no complexity exception is required.
