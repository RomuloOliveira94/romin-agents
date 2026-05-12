# romin-agents

Generic Rails/OpenCode agent pack. Drop-in agents for Rails projects using [OpenCode](https://opencode.ai).

Each agent has a focused role. Together they cover the full dev cycle: planning → implementation → review → QA.

---

## Agents

### tech-lead
Orchestrates the team. Breaks down features, dispatches subagents, reviews plans, resolves blockers. Handles git/GitHub directly (branches, commits, PRs). Creates technical plans. Entry point for complex tasks.

### dev-rails
Senior Rails developer. Implements features and bugfixes following Rails conventions. Code only — no git/GitHub operations. Runs tests. Does not create issues.

### product-owner
Owns GitHub issues. Creates, updates, and closes issues. Manages milestones and labels. Does not touch code or PRs.

### qa
Quality assurance. Reviews implementations against requirements, runs or describes test scenarios, flags regressions and edge cases.

### rails-reviewer
Code reviewer. Reviews PRs for Rails idioms, security, performance, and test coverage. Leaves structured review comments. Does not merge.

---

## Normal Flow

1. **tech-lead** receives a feature request → breaks it into tasks → writes plan → creates branch
2. **dev-rails** implements the code
3. **qa** validates behavior
4. **rails-reviewer** reviews the code
5. **tech-lead** commits and opens/merges PR
6. **product-owner** closes the related issue on merge

For simple tasks, invoke **dev-rails** or **product-owner** directly.

---

## Repo-Specific Context

Agents are generic by design. They pick up repo-specific context automatically when available:

- `AGENTS.md` / `CLAUDE.md` / `GEMINI.md` in the target repo
- Skills installed in the environment (e.g. `rails-repo-context`)

No configuration needed — agents adapt to the project they're working in.

---

## Pre-Setup

> **Read before installing.**

This repo installs **only the agents defined here**. It does not install or configure:

- **Caveman** — a separate communication-style skill; install it independently if desired
- **Ruby Superpowers** (`superpowers-ruby`) — a separate skill pack; install it independently

Both are environment-level dependencies. This repo does not touch them.

---

## Installation

Copy the `agents/` directory into OpenCode's agents directory:

```bash
cp agents/* ~/.config/opencode/agents/
```

Custom target:

```bash
cp agents/* /path/to/custom/agents/
```

That's it. No script required.

### Symlink setup (auto-sync)

To keep agents in sync automatically, symlink instead of copy:

```bash
# Backup existing agents
mv ~/.config/opencode/agents ~/.config/opencode/agents.bak

# Symlink to repo
ln -s "$PWD/agents" ~/.config/opencode/agents
```

Now any edit to the agents is instantly reflected in the repo. Just `git commit && git push` from this directory to sync.

---

## Requirements

- [OpenCode](https://opencode.ai) installed and configured
- Shell access (bash/zsh)

## Optional Tools

- **[rtk](https://github.com/OpenCodeAI/rtk)** (Rust Token Killer) — reduces LLM token consumption by compacting command output. Install via `cargo install rtk` or download from [releases](https://github.com/OpenCodeAI/rtk/releases).
