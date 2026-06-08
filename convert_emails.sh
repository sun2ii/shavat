#!/bin/bash
# Convert space-separated emails to comma-separated format

# Read from stdin or file
if [ -f "$1" ]; then
    input=$(cat "$1")
else
    input=$(cat)
fi

# Remove blank lines, replace newlines with commas
echo "$input" | grep -v '^[[:space:]]*$' | tr '\n' ',' | sed 's/,$//'
