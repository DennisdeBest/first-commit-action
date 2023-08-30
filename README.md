# Is First Commit Action

This GitHub Action checks if the current commit is the first-ever commit of the project.

## Inputs

### `github-token`

**Optional** The GitHub token to authenticate the request. Useful for private repositories or to avoid API rate limits. Default is `null`, which means the request will be unauthenticated.

## Outputs

### `isFirstCommit`

A boolean (`true` or `false`) indicating if the current commit is the first one.

## Example Usage

### For public repositories:

```yaml
uses: dennisdebest/first-commit-action@v1
```

### For private repositories or to avoid API rate limits:

```yaml
uses: dennisdebest/first-commit-action@v1
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
```

### Use the output as a condition for the following steps

```yaml
jobs:
    check:
        runs-on: ubuntu-latest

        steps:
            -   name: Checkout code
                id: first_commit
                uses: dennisdebest/first-commit-action@v1

            -   name: If is not first commit
                if: steps.first_commit.outputs.isFirstCommit == 'false'
                run: |
                    # Your commands here
                    echo "This runs if it's not the first commit."

            -   name: If it is the first commit
                if: steps.first_commit.outputs.isFirstCommit == 'true'
                run: |
                    # Your commands here
                    echo "This runs if it is the first commit."
```
