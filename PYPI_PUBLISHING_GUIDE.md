# 📦 MCP Traffic - PyPI Publishing Guide

## Overview

The MCP Traffic Python package is now ready for publication to PyPI! This guide provides step-by-step instructions for publishing the package.

## 🎯 **Package Information**

- **Package Name**: `mcp-traffic`
- **Version**: `1.0.0`
- **PyPI URL**: https://pypi.org/project/mcp-traffic/ (after publishing)
- **Type**: Pure Python package with CLI tools

## 📋 **Prerequisites**

### 1. Required Accounts
- PyPI account: https://pypi.org/account/register/
- Test PyPI account: https://test.pypi.org/account/register/
- API tokens for both environments

### 2. Local Requirements
```bash
pip install build twine
```

## 🚀 **Publishing Steps**

### Step 1: Verify Package Structure
```bash
# Clone the repository
git clone https://github.com/Tatsuru-Kikuchi/MCP-traffic.git
cd MCP-traffic

# Verify package structure
ls -la mcp_traffic/
```

Expected structure:
```
mcp_traffic/
├── __init__.py
├── cli.py
├── collectors/
│   ├── __init__.py
│   └── traffic_collector.py
└── utils/
    ├── __init__.py
    ├── api_client.py
    ├── config.py
    └── logger.py
```

### Step 2: Build the Package
```bash
# Build source distribution and wheel
python -m build

# Verify build
ls dist/
# Should see:
# mcp_traffic-1.0.0-py3-none-any.whl
# mcp-traffic-1.0.0.tar.gz
```

### Step 3: Test the Package Locally
```bash
# Create test environment
python -m venv test_env
source test_env/bin/activate  # On Windows: test_env\Scripts\activate

# Install from wheel
pip install dist/mcp_traffic-1.0.0-py3-none-any.whl

# Test installation
python -c "import mcp_traffic; print(f'Version: {mcp_traffic.__version__}')"
mcp-traffic --version
mcp-traffic info

# Cleanup
deactivate
rm -rf test_env
```

### Step 4: Check Package Quality
```bash
# Check distribution files
python -m twine check dist/*

# Should output: "Checking distribution dist/... PASSED"
```

### Step 5: Upload to Test PyPI (Recommended First)
```bash
# Upload to Test PyPI first
python -m twine upload --repository testpypi dist/*

# Test installation from Test PyPI
pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ mcp-traffic
```

### Step 6: Upload to Production PyPI
```bash
# Upload to production PyPI
python -m twine upload dist/*

# Test installation from PyPI
pip install mcp-traffic
```

## 🏷️ **Creating a Release Tag**

### Option 1: GitHub Web Interface
1. Go to https://github.com/Tatsuru-Kikuchi/MCP-traffic/releases
2. Click "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `MCP Traffic v1.0.0`
5. Auto-generate release notes or use custom description
6. Publish release

### Option 2: Command Line
```bash
# Create and push tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## 🤖 **Automated Publishing**

### GitHub Actions Workflow
Create `.github/workflows/publish-pypi.yml`:

```yaml
name: Publish to PyPI

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install build twine
    - name: Build package
      run: python -m build
    - name: Publish to PyPI
      env:
        TWINE_USERNAME: __token__
        TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}
      run: twine upload dist/*
```

### Required Secrets
Add to GitHub repository secrets:
- `PYPI_API_TOKEN`: Your PyPI API token

## 📊 **Package Verification**

### After Publishing, Verify:

1. **PyPI Page**: https://pypi.org/project/mcp-traffic/
2. **Installation**: `pip install mcp-traffic`
3. **Import**: `python -c "import mcp_traffic"`
4. **CLI**: `mcp-traffic --version`

### Expected Installation Output:
```bash
$ pip install mcp-traffic
Successfully installed mcp-traffic-1.0.0 [dependencies...]

$ mcp-traffic --version
mcp-traffic 1.0.0

$ mcp-traffic info
🚇 MCP Traffic Package Information
==========================================
📦 Name: mcp-traffic
🏷️  Version: 1.0.0
📝 Description: Tokyo traffic data collection system using ODPT API
👤 Author: Tatsuru Kikuchi
🌐 URL: https://github.com/Tatsuru-Kikuchi/MCP-traffic
📄 License: MIT
```

## 🔧 **Configuration**

### API Configuration Required
Users need to create `config/api_config.json`:
```json
{
  "odpt_api": {
    "base_url": "https://ckan.odpt.org/api/3/action/",
    "api_key": "YOUR_API_KEY_HERE",
    "rate_limit": 100,
    "timeout": 30
  },
  "collection": {
    "schedule_interval": 300,
    "data_types": ["train", "bus", "station"],
    "regions": ["tokyo"]
  },
  "storage": {
    "format": "json",
    "compression": true,
    "retention_days": 365
  }
}
```

## 📈 **Usage Examples**

### Basic Usage:
```bash
# Test system
mcp-traffic test

# Collect all data
mcp-traffic collect --type all

# Check status
mcp-traffic status

# Collect specific data
mcp-traffic collect --type train --operator JR-East
```

### Python Usage:
```python
from mcp_traffic import TrafficCollector, ConfigManager

# Initialize
config = ConfigManager('config/api_config.json')
collector = TrafficCollector()

# Collect data
data = collector.collect_train_data()
print(f"Collected {len(data)} train records")
```

## 🎉 **Post-Publication Checklist**

- [ ] Package appears on PyPI
- [ ] Installation works: `pip install mcp-traffic`
- [ ] CLI commands work
- [ ] Python imports work
- [ ] Documentation links are correct
- [ ] GitHub release is created
- [ ] README badges are updated
- [ ] Social media announcement (optional)

## 📚 **Documentation Links**

After publishing, update documentation with:
- PyPI installation instructions
- Version badges
- CLI usage examples
- Python API examples

## 🔄 **Future Updates**

For future versions:
1. Update version in `mcp_traffic/__init__.py`
2. Update version in `pyproject.toml` 
3. Update `CHANGELOG.md`
4. Create new git tag
5. Build and upload new version

---

## 🎯 **Ready to Publish!**

The MCP Traffic package is fully prepared for PyPI publication with:

✅ **Complete package structure**  
✅ **Modern pyproject.toml configuration**  
✅ **CLI entry points**  
✅ **Comprehensive documentation**  
✅ **GitHub Actions workflow ready**  
✅ **Version 1.0.0 tagged and ready**  

**Next Step**: Execute the publishing steps above to make the package available on PyPI!
