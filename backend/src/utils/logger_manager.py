# -*- coding: utf-8 -*-
"""
File: logger_manager.py

This file configures the logger using Loguru for the application.
The logger is set up to print logs to the console with a specific format
and a minimum log level of INFO.
"""

from loguru import logger

import sys

# logger.level("INFO", color="<white>")  # Set the color for INFO level logs

# Remove any previous Loguru configuration (if any)
logger.remove()

# Logger configuration to print to the console with colors and custom format
logger.add(
    sys.stdout,  # Destination: standard console
    format="<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | <level>{level: <8}</level> | <cyan>{module}:{function}:{line}</cyan> - {message}",  # Log format
    level="INFO",  # Minimum log level: DEBUG
    colorize=True,  # Colorize the logs
    backtrace=True,  # Show full stacktrace for errors
    diagnose=True,  # Additional diagnostics for exceptions
)

logger.debug("Logger configured successfully.")

# From here, any class or module that imports this file
# will have access to the globally configured logger.
