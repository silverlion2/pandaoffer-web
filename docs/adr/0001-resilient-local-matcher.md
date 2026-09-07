# ADR 0001: Curated Local Fallback for University Matching

- Status: Accepted
- Date: 2026-09-08

## Context

The public matcher previously required a successful DeepSeek call. Missing credentials or dependency failure turned the homepage's primary value proposition into a dead end, even though the repository already contains detailed records for 20 universities.

## Decision

Create a pure, deterministic matcher over the curated repository data. Prepare that result at the API boundary, use AI when available, validate its minimal result shape, and return the labeled local result for missing credentials or dependency/format failures.

## Consequences

The core journey becomes credential-independent and testable. Local percentages must be presented as planning guidance, and the heuristic will need versioned data rules before it can support stronger probability claims. The API imports the existing university dataset, increasing server route code modestly without adding a runtime dependency.

## Rollback point

Revert the resilient-matcher commit. No schema, credential, or persistence rollback is required.
