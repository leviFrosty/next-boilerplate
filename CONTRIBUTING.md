# Contributing

Contributions welcome!

## Before You Start

**PRs may be rejected** if they:

- Don't fit what I feel is within project scope
- Are too involved/complex
- Break architectural patterns

This keeps the project focused. Don't take it personally.

## Guidelines

1. **Small, focused changes**
   - One thing per PR
   - Simple beats clever

1. **Test your changes**

   ```sh
   pnpm dlx turbo test test:e2e lint build fmt typecheck
   ```

1. **Match existing style**
   - Pre-commit hooks handle formatting
   - Follow patterns in the codebase

## Good First Contributions

- Bug fixes
- Documentation improvements
- Dependency updates
- Adding simple examples of how to extend existing patterns
  - The goal is to make it easy for another dev to extend and pick up with what they naturally would want to do immediately

## Process

1. Fork the repo
2. Create a branch
3. Make your changes
4. Ensure tests/lint/build pass
5. Submit PR with clear description

## Questions?

Open an issue first if you're unsure whether a change fits the scope.
