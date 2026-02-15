#!/bin/bash

################################################################################
# SSH Terminal Chat Application
# A lightweight, cross-platform chat app for LAN/home network use
# Works over SSH between Windows PowerShell and Linux terminals
################################################################################

set -euo pipefail

# ============================= CONFIGURATION ================================
CHAT_DIR="${XDG_RUNTIME_DIR:-/tmp}/ssh-chat-$$"
MESSAGES_FILE="${CHAT_DIR}/messages.log"
USERS_FILE="${CHAT_DIR}/users.lock"
LOCK_FILE="${CHAT_DIR}/lock"

# Get username
USERNAME="${USER:-anonymous}"
if [ -z "$USERNAME" ]; then
    USERNAME="user-$$"
fi

# Generate unique user ID
USER_ID="$USERNAME-$$-$RANDOM"

# Color codes for terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Check if colors are supported
if [ ! -t 1 ]; then
    # No color support for non-interactive terminals
    RED=''
    GREEN=''
    BLUE=''
    YELLOW=''
    CYAN=''
    WHITE=''
    NC=''
fi

# ============================= CLEANUP FUNCTION ==============================
cleanup() {
    # Remove user from active users
    if [ -f "$USERS_FILE" ]; then
        sed -i "/^$USER_ID$/d" "$USERS_FILE" 2>/dev/null || true
    fi
    
    # Remove background processes
    jobs -p | xargs kill 2>/dev/null || true
    
    # Clean up if this is the last user
    if [ ! -s "$USERS_FILE" ] 2>/dev/null; then
        rm -rf "$CHAT_DIR" 2>/dev/null || true
    fi
    
    # Reset terminal
    stty sane 2>/dev/null || true
    
    echo -e "\n${RED}[CHAT] Goodbye!${NC}"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM EXIT

# ============================= INITIALIZATION ================================
initialize_chat() {
    # Create chat directory if it doesn't exist
    mkdir -p "$CHAT_DIR"
    
    # Initialize files
    touch "$MESSAGES_FILE"
    touch "$USERS_FILE"
    touch "$LOCK_FILE"
    
    # Register this user
    echo "$USER_ID" >> "$USERS_FILE"
    
    # Clear screen
    clear
    
    # Display header
    echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║  SSH Terminal Chat - LAN Edition      ║${NC}"
    echo -e "${CYAN}║  Press Ctrl+C to exit                 ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
    echo -e "${GREEN}[CHAT] Welcome, ${WHITE}${USERNAME}${GREEN}!${NC}"
    echo -e "${GREEN}[CHAT] Connection established at $(date '+%H:%M:%S')${NC}"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo ""
}

# ============================= DISPLAY MESSAGES ==============================
display_messages() {
    # Show all existing messages with a line limit
    tail -n 100 "$MESSAGES_FILE" 2>/dev/null | while IFS= read -r line; do
        if [ -n "$line" ]; then
            echo -e "$line"
        fi
    done
}

# ============================= SEND MESSAGE ===================================
send_message() {
    local msg="$1"
    local timestamp=$(date '+%H:%M:%S')
    
    # Format message with username, timestamp, and color
    local formatted="${YELLOW}[${timestamp}]${NC} ${CYAN}${USERNAME}${NC}: ${WHITE}${msg}${NC}"
    
    # Write to log file with proper locking
    (
        flock 200
        echo -e "$formatted" >> "$MESSAGES_FILE"
    ) 200>"$LOCK_FILE"
}

# ============================= MONITOR MESSAGES ==============================
monitor_messages() {
    # Get the current line count to avoid repeating old messages
    local start_line=$(wc -l < "$MESSAGES_FILE" 2>/dev/null || echo 0)
    
    # Use tail -f to follow new messages
    tail -f -n +$((start_line + 1)) "$MESSAGES_FILE" 2>/dev/null | while IFS= read -r line; do
        # Only show messages not sent by this user (to avoid duplicates)
        if [ -n "$line" ]; then
            # Check if this is our message by looking at the current input
            echo -e "$line"
        fi
    done
}

# ============================= INPUT HANDLER ==================================
input_handler() {
    while true; do
        # Read user input
        read -p "${GREEN}You:${NC} " msg
        
        # Skip empty messages
        if [ -z "$msg" ]; then
            continue
        fi
        
        # Exit command
        if [ "$msg" = "/exit" ] || [ "$msg" = "/quit" ] || [ "$msg" = "/bye" ]; then
            echo -e "${YELLOW}[CHAT] Exiting chat...${NC}"
            cleanup
        fi
        
        # Help command
        if [ "$msg" = "/help" ] || [ "$msg" = "/?" ]; then
            echo -e "${BLUE}Available commands:${NC}"
            echo -e "  ${CYAN}/help${NC}   - Show this help message"
            echo -e "  ${CYAN}/exit${NC}   - Exit the chat"
            echo -e "  ${CYAN}/quit${NC}   - Exit the chat"
            echo -e "  ${CYAN}/time${NC}   - Show current time"
            echo ""
            continue
        fi
        
        # List users command
        if [ "$msg" = "/users" ]; then
            local active_users=$(wc -l < "$USERS_FILE" 2>/dev/null || echo 0)
            echo -e "${BLUE}[CHAT] Active users: ${active_users}${NC}"
            continue
        fi
        
        # Time command
        if [ "$msg" = "/time" ]; then
            echo -e "${BLUE}[CHAT] Current time: $(date '+%H:%M:%S on %A, %B %d, %Y')${NC}"
            continue
        fi
        
        # Send the message
        send_message "$msg"
    done
}

# ============================= MAIN LOOP ======================================
main() {
    initialize_chat
    
    # Start the message monitor in the background
    monitor_messages &
    MONITOR_PID=$!
    
    # Start the input handler
    input_handler
}

# ============================= ENTRY POINT ====================================
main "$@"
