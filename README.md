# amplify-hosting-monorepo-with-pnpm

As the repo name says it, this is a quick demo showcasing how you can deploy your pnpm monorepo apps to Amplify Hosting.

`pnpm deploy` allows us to create a portable copy of a workspace package, complete with copies of unpublished workspace packages. This enables you to write shared logic in reusable packages without requiring you to publish to npm or use an ephemeral npm registry like Verdaccio.

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 18
        - corepack enable
        - pnpm install
    build:
      commands:
        # build the entire workspace
        - pnpm run build
        # deploy just our marketing-site
        - pnpm deploy --filter ./apps/marketing-site --prod --ignore-scripts ./out
  artifacts:
    # point this to `pnpm deploy`'s output directory
    baseDirectory: ./out/dist
    files:
      - "**/*"
  cache:
    paths:
      - $(pnpm store path)
```

It is important to note with `pnpm deploy` it comes with a few caveats:

- it reads from the workspaces `.gitignore` and will ignore files/folders specified there. Meaning if you have your output directory in the localized `.gitignore`, `pnpm deploy` will not copy it to your output directory.
