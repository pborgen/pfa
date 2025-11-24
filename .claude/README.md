# Claude Code Configuration

This directory contains Claude Code configuration and custom commands for the pfa project.

## Structure

- `config.json` - Main configuration file for Claude Code
- `commands/` - Custom slash commands
- `prompts/` - Reusable prompt templates

## Available Commands

- `/review` - Review code changes and suggest improvements
- `/test` - Generate tests for selected code or file

## Adding Custom Commands

Create a new markdown file in the `commands/` directory with the following format:

```markdown
---
description: Brief description of what the command does
---

Your prompt instructions here...
```

The filename (without .md) becomes the command name.
