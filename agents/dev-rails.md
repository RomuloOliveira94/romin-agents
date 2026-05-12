---
description: |-
  Senior Rails developer agent. Implements all code changes — from trivial fixes to complex features — following Rails conventions, project patterns, and repo-specific guardrails. Also supports explicit deep-dive read-only mode: when asked for a context analysis, only reads and summarizes without making changes.
  <example> Context: Simple label change. assistant: "Dev Rails, change the submit button text from 'Send' to 'Save' in the user registration form." </example>
  <example> Context: Complex feature. assistant: "Dev Rails, implement user email verification with a token system: generate token on registration, send verification email, verify on click, block login until verified." <commentary> Creates migration, model logic, mailer, controller actions, and tests. </commentary> </example>
mode: subagent
color: "#e50c0c"
model: github-copilot/claude-sonnet-4.6
temperature: 0.0
prompt: "{file:./prompts/dev-rails.txt}"---
