# GitHub Actions Workflows

This repository uses GitHub Actions for continuous integration, deployment, and maintenance. Here's an overview of the automated workflows:

## 🚀 Workflows Overview

### 1. CI/CD Pipeline (`ci-cd.yml`)
**Triggers:** Push to `main`/`develop`, Pull Requests to `main`

**Jobs:**
- **Build & Test** (Node.js 18.x & 20.x)
  - Install dependencies
  - Run linting (if configured)
  - Execute test suite
  - Build production bundle
  - Generate coverage reports
  - Upload build artifacts

- **Security Checks**
  - Run npm security audit
  - Check for outdated dependencies
  - Vulnerability scanning

- **Deploy to GitHub Pages**
  - Build production version
  - Deploy to GitHub Pages (main branch only)
  - Configure custom domain (if applicable)

- **Performance Testing**
  - Run Lighthouse CI after deployment
  - Performance metrics validation

### 2. PR Preview (`pr-preview.yml`)
**Triggers:** Pull Request events

**Features:**
- Builds preview version for PRs
- Runs test suite
- Comments on PR with build status
- Uploads preview artifacts
- Bundle size analysis

### 3. Security & Maintenance (`security-maintenance.yml`)
**Triggers:** Weekly schedule (Mondays 9 AM UTC), Manual dispatch

**Jobs:**
- **Security Audit**
  - Weekly vulnerability scanning
  - Generate security reports
  - Upload findings as artifacts

- **Dependency Updates**
  - Check for outdated packages
  - Generate update recommendations
  - Create update reports

- **Lighthouse Audit**
  - Weekly performance monitoring
  - Generate performance reports
  - Create issues for performance regressions

- **Cleanup**
  - Remove old artifacts (30+ days)
  - Maintain repository hygiene

## 📋 Setup Requirements

### 1. Repository Settings
Enable GitHub Pages in repository settings:
- Go to Settings → Pages
- Set Source to "GitHub Actions"

### 2. Branch Protection (Recommended)
Protect the `main` branch:
```yaml
Required status checks:
- build-and-test (ubuntu-latest, 18.x)
- build-and-test (ubuntu-latest, 20.x)
- security-checks
```

### 3. Environment Variables
No additional secrets required - uses default `GITHUB_TOKEN`.

## 🔧 Configuration Files

### `.lighthouserc.json`
Lighthouse CI configuration with performance thresholds:
- Performance: 80%
- Accessibility: 90%
- Best Practices: 90%
- SEO: 90%

### `.audit-ci.json`
Security audit configuration:
- Blocks critical and high severity vulnerabilities
- Allows moderate and low severity issues

## 📊 Monitoring & Reports

### Artifacts Generated
- **Build Files**: Production-ready website files
- **Test Results**: Coverage reports and screenshots
- **Security Reports**: Vulnerability scans and recommendations
- **Performance Reports**: Lighthouse audit results

### Notifications
- ✅ Successful deployments
- ❌ Failed builds or deployments
- 📊 Weekly performance reports
- 🔒 Security vulnerability alerts

## 🛠️ Local Development

### Running Tests Locally
```bash
# Install dependencies
npm ci

# Run tests
cd tests
npm ci
npm test

# Run with coverage
npm run test:coverage
```

### Building Locally
```bash
# Development build
npm start

# Production build
npm run build

# Serve production build
npx serve dist/
```

### Security Checks
```bash
# Run security audit
npm audit

# Check for updates
npm outdated

# Lighthouse audit (requires lighthouse CLI)
npm install -g lighthouse
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

## 🔄 Workflow Triggers

| Workflow | Push | PR | Schedule | Manual |
|----------|------|----|---------:|--------|
| CI/CD    | ✅   | ✅ |         | ❌     |
| PR Preview | ❌ | ✅ |         | ❌     |
| Security | ❌   | ❌ | Weekly  | ✅     |

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are listed in `package.json`
   - Review test failures in artifacts

2. **Deployment Issues**
   - Ensure GitHub Pages is enabled
   - Check branch protection rules
   - Verify `dist/` directory contains built files

3. **Performance Issues**
   - Review Lighthouse reports
   - Check bundle size in PR comments
   - Monitor performance trends

### Getting Help
- Check workflow logs in Actions tab
- Review artifact uploads for detailed reports
- Enable debug logging by setting `ACTIONS_STEP_DEBUG: true`

## 📝 Customization

### Adding New Tests
1. Add test files to `tests/` directory
2. Update `tests/package.json` with new dependencies
3. Modify test scripts in workflow if needed

### Changing Deployment
1. Update `deploy` job in `ci-cd.yml`
2. Modify build output directory if needed
3. Add custom domain configuration

### Security Thresholds
1. Modify `.audit-ci.json` for different severity levels
2. Update Lighthouse thresholds in `.lighthouserc.json`
3. Adjust vulnerability reporting in workflows
