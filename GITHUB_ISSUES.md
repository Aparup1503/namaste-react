## Git push notes

### Why the first push failed

The first `git push` ran with Git prompts disabled (`credential.interactive=never`). GitHub rejected the credential available to that non-interactive attempt, so Git could not prompt Git Credential Manager to complete or refresh authentication.

Retrying with:

```powershell
git -c credential.interactive=always push origin main
```

allowed Git Credential Manager to handle authentication, and the push succeeded. The `-c` override applies only to that command; it doesn’t change your permanent Git settings.

### Next time: stage, commit, push

```powershell
git status
git add <files-you-want-to-include>
git diff --cached
git commit -m "Describe the change"
git push origin main
```

Review `git status` before staging so you don’t accidentally include unrelated files.

### If authentication fails

Retry with interactive authentication enabled:

```powershell
git -c credential.interactive=always push origin main
```

GitHub doesn’t accept account passwords for Git operations. Use Git Credential Manager’s sign-in flow, or configure a valid token through a secure credential manager—**don’t paste tokens into commands or commit them**.

A commit and a push are separate: a commit is saved locally; a successful push sends it to GitHub. In this case, commit `d4d23c2` was pushed to `main`.
