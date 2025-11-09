#!/bin/bash
cd /home/kavia/workspace/code-generation/e-commerce-platform-with-real-time-order-management-40738-40749/ecommerce_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

