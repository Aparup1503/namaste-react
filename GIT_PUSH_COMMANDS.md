# Git Push Commands

These are the commands used to stage, commit, and push the workspace settings
and notes to the `main` branch.

## Stage and review

```powershell
git status --short --branch
git add -- .vscode/settings.json GITHUB_ISSUES.md 'src/components/.NET LEAD AZURE PROMPT'
git diff --cached --check
git diff --cached --stat
```

## Commit and push

```powershell
git commit -m "Add workspace settings and developer notes" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
git -c credential.interactive=always push origin main
```

The `credential.interactive=always` option lets Git Credential Manager prompt
for GitHub authentication if needed. It applies only to that push command.

## Use VS Code Source Control

1. Open **Source Control** from the Activity Bar, or press `Ctrl+Shift+G`.
2. Review the changed files. Select a file to inspect its diff before including it.
3. Stage the files you want:
   - Select the **+** beside an individual file to stage only that file.
   - Select the **+** beside **Changes** to stage all changed and untracked files.
4. Enter a commit message in the message box, then select **Commit**.
5. Select **Sync Changes** or open the **...** menu and choose **Push**.
   - If prompted, sign in to GitHub or complete the Git Credential Manager flow.
6. Confirm the outgoing changes are pushed and the branch is synchronized.

Staging is still needed for new, untracked files; Source Control's **+** button
does this through the UI instead of using `git add` in the terminal.

## Verify

```powershell
git status --short --branch
git ls-remote origin refs/heads/main
```

The branch status should show that the local `main` branch is up to date with
`origin/main`. The remote hash should match the latest local commit.
