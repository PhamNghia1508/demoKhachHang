# Real Estate Rental Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, interactive Vietnamese rental-property demo suitable for presenting to a prospective client.

**Architecture:** A dependency-free static frontend uses ES modules for mock listing data, filtering logic, and UI behavior. Pure listing functions are covered by Node's built-in test runner, while browser verification covers responsive layout and interactive flows.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript ES modules, Node.js built-in test runner

---

### Task 1: Listing domain logic

**Files:**
- Create: `js/listings.js`
- Create: `js/listings.test.js`

- [ ] Write failing tests for filtering, keyword matching, and sorting.
- [ ] Run `node --test js/listings.test.js` and confirm expected failures.
- [ ] Implement mock listing data and pure query functions.
- [ ] Run `node --test js/listings.test.js` and confirm all tests pass.

### Task 2: Main presentation UI

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `js/app.js`

- [ ] Build semantic page sections and accessible controls.
- [ ] Add responsive visual design, listing cards, dashboard preview, and scope table.
- [ ] Wire search, filters, sorting, detail modal, contact form, and post-listing wizard.
- [ ] Verify all interactions in a browser.

### Task 3: Sales handoff

**Files:**
- Create: `PHAM-VI-DEMO.md`

- [ ] Document what the demo includes.
- [ ] Separate recommended MVP and future expansion features.
- [ ] Include a suggested presentation script for the client meeting.

### Task 4: Verification

- [ ] Run `node --test js/listings.test.js`.
- [ ] Start a local static server.
- [ ] Inspect desktop and mobile presentation in the browser.
- [ ] Confirm there are no blocking console errors.

