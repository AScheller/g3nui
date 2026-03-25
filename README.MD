# g3nui — Human-in-the-Loop Engine

g3nui is a lightweight, browser-based UI engine that transforms **n8n workflow JSON exports** into interactive, step-by-step human-in-the-loop interfaces. It bridges the gap between automated workflows and the human decisions they require — no backend needed.

## Features

- **n8n Workflow Import** — Paste or upload an n8n workflow JSON export. g3nui automatically parses nodes, connections, and execution order.
- **Intelligent Node Classification** — Automatically maps n8n node types to UI step types:
  | n8n Node Type | g3nui Step |
  |---|---|
  | Webhook / Trigger / Form Trigger | Input (with auto-generated form fields) |
  | IF / Switch / Filter | Check (validation with pass/warn/fail indicators) |
  | OpenAI / Ollama / Anthropic / LangChain | Edit (AI-assisted content generation & refinement) |
  | HTTP Request / Jira / Slack / Email | Review & Approve (final human sign-off) |
  | Set / Code / Merge | Skipped (utility nodes) |
- **Step-by-Step Wizard** — Guides users through each workflow step with a visual stepper, contextual forms, and action buttons.
- **Webhook Integration** — Sends form data and approval payloads back to n8n via configurable webhook URLs.
- **AI-Assisted Editing** — Edit steps support iterative AI improvement with optional user instructions.
- **Dark Theme** — Clean, modern dark UI built with Tailwind CSS.
- **Zero Dependencies** — Single HTML file using Vue 3 (CDN) and Tailwind CSS (CDN). No build step required.

## Quick Start

1. Open `index.html` in any modern browser.
2. Click **"n8n Workflow importieren"** in the sidebar.
3. Paste your n8n workflow JSON or load a `.json` file.
4. Click **"Workflow analysieren"** to preview the generated steps.
5. Click **"Importieren & verwenden"** to activate the workflow.
6. Walk through each step — fill forms, review checks, edit AI output, and approve.

## Webhook Setup

To connect g3nui back to your n8n instance:

1. Click the **Webhook** button at the bottom of the sidebar.
2. Enter your n8n webhook URL (e.g., `https://n8n.example.com/webhook/...`).
3. g3nui will POST step data to this URL as users progress through the workflow.

## Architecture

```
index.html          — Full application (Vue 3 SPA, single file)
```

The application is a single-page app powered by:
- **Vue 3** (CDN, reactive data binding)
- **Tailwind CSS** (CDN, utility-first styling)
- **Vanilla JS** n8n parser (BFS-based node traversal and classification)

## How It Works

1. **Parse** — The n8n JSON is parsed, and nodes are traversed in BFS order starting from trigger nodes.
2. **Classify** — Each node is classified by its type string (webhook, AI, HTTP, etc.) into one of four UI step types.
3. **Generate** — A g3nui workflow config is generated with typed steps, form fields, labels, and actions.
4. **Execute** — The user walks through the generated wizard. At each step, data can be sent to n8n via webhook.

## Supported n8n Node Types

- **Triggers**: Webhook, Form Trigger, Manual Trigger
- **Input/Forms**: n8n Form nodes (auto-extracts field definitions)
- **Conditions**: IF, Switch, Compare, Filter
- **AI/LLM**: OpenAI, Ollama, Anthropic, LangChain, Chat Models
- **Actions**: HTTP Request, Jira, Slack, Gmail, Notion, Airtable, Google Sheets, DATEV
- **Human**: Wait, Approval nodes
- **Utilities** (skipped): Set, Code, Function, Merge, SplitInBatches, Aggregate

## License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2026 [ADAPTIVE INTELLIGENCE GMBH](https://adaptive.de)  (G3NUI)