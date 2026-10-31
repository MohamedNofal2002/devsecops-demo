# DevSecOps Pipeline Demo

A working example of automated security checks in CI/CD, built with GitHub Actions.

> ⚠️ The app in this repo is **intentionally vulnerable** so the scanners have something to find. Never deploy it.

## What runs on every push

| Check | Tool | Catches |
|---|---|---|
| Secret scanning | Gitleaks | Hardcoded passwords, keys, tokens |
| Code analysis (SAST) | Semgrep | Command injection, XSS, `eval`, unsafe patterns |
| Dependency scanning | Trivy | Known CVEs in npm packages |
| Container scanning | Trivy | Vulnerable OS packages in the Docker image |
| Dynamic scan (DAST) | OWASP ZAP baseline | Missing security headers and issues in the running app |

Results go to:
- the **run summary** (pass/fail per check),
- the **Security → Code scanning** tab,
- a downloadable `security-reports` artifact (SARIF + ZAP HTML report),
- **Slack**, if a `SLACK_WEBHOOK_URL` repo secret is set.

## Planted issues

| Type | Where |
|---|---|
| Fake hardcoded secret | `server.js` |
| Command injection, XSS, `eval` | `server.js` |
| Outdated `express` and `lodash` | `package.json` |
| End-of-life base image (`node:14-slim`) | `Dockerfile` |

## Run the scans locally

```bash
docker run --rm -v "$PWD:/repo" zricethezav/gitleaks:v8.30.1 detect --no-git --source /repo
docker run --rm -v "$PWD:/src" -w /src semgrep/semgrep:1.183.0 semgrep scan --config p/javascript --config p/nodejsscan
docker run --rm -v "$PWD:/src" aquasec/trivy:0.76.1 fs --scanners vuln /src
```

## Need this for your project?

I set up pipelines like this for real teams: tuned for your stack, with low noise and clear fix guidance.
