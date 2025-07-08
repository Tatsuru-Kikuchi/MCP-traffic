FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 mcp-traffic && \
    chown -R mcp-traffic:mcp-traffic /app
USER mcp-traffic

# Create necessary directories
RUN mkdir -p data/raw data/processed data/archives logs src scripts config monitoring

# Set Python path
ENV PYTHONPATH=/app/src

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD python -c "import requests; requests.get('https://ckan.odpt.org', timeout=10)" || exit 1

# Default command
CMD ["python", "scripts/schedule_collection.py"]
