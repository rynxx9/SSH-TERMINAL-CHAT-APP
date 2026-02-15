# SSH Terminal Chat App 🚀

A lightweight, cross-platform **terminal-based chat application** that works over SSH between Windows and Linux. Perfect for LAN/home network communication with real-time messaging, usernames, and timestamps.

![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Linux-blue)
![Shell](https://img.shields.io/badge/shell-Bash-blue)

---

## ✨ Features

- **Live Bidirectional Chat** - Real-time messaging between multiple users
- **Cross-Platform** - Windows (PowerShell SSH) ↔ Linux (native Bash)
- **Secure** - Uses SSH encryption for all communication
- **User-Friendly** - Colored output, timestamps, and usernames on every message
- **Multiple Users** - Support for simultaneous connections
- **Interactive Commands**:
  - `/help` - Display help message
  - `/users` - Show number of active users
  - `/time` - Display current time
  - `/exit` or `/quit` - Exit the chat gracefully
- **Ctrl+C Support** - Clean exit with proper cleanup
- **Lightweight** - Pure Bash, no external dependencies required

---

## 📋 Requirements

### Linux Server
- **OS**: Any modern Linux distribution (Ubuntu, CentOS, Fedora, Debian, etc.)
- **Requirements**:
  - Bash 4.0+ (usually pre-installed)
  - SSH server enabled (`openssh-server`)
  - Standard Linux utilities: `sed`, `tail`, `mkdir`, `flock`

### Windows Client
- **OS**: Windows 10 or later
- **Requirements**:
  - PowerShell 5.0+ or PowerShell Core (built-in on Windows 10+)
  - Windows 10 comes with SSH client built-in (or install via `Open-SSH` optional feature)
  - Or use `Git Bash` / `WSL` for SSH access

---

## 🔧 Installation & Setup

### Step 1: Prepare the Linux Server

#### Enable SSH Server
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openssh-server
sudo systemctl start ssh
sudo systemctl enable ssh

# CentOS/RHEL
sudo yum install openssh-server
sudo systemctl start sshd
sudo systemctl enable sshd

# Fedora
sudo dnf install openssh-server
sudo systemctl start sshd
sudo systemctl enable sshd
```

#### Find Your Server's IP Address
```bash
hostname -I
# Or: ip addr show
```
Note down the IP address (e.g., `192.168.1.100`)

#### Clone the Chat Repository on Server
```bash
cd ~
git clone https://github.com/rynxx9/SSH-TERMINAL-CHAT-APP.git
cd SSH-TERMINAL-CHAT-APP
chmod +x chat.sh
```

### Step 2: Set Up Windows Client

#### Method A: Using Native SSH (Windows 10+)

1. **Open PowerShell** (Search for "PowerShell" or press `Win + R`, type `powershell`)

2. **Test SSH Connection**
   ```powershell
   ssh username@192.168.1.100
   # Or with custom SSH port:
   ssh -p 22 username@192.168.1.100
   ```

3. **Generate SSH Key** (Optional but recommended)
   ```powershell
   ssh-keygen -t rsa -b 4096 -f $env:USERPROFILE\.ssh\id_rsa -N ""
   ```

#### Method B: Using WSL (Windows Subsystem for Linux)
```powershell
# In PowerShell
wsl
ssh username@192.168.1.100
```

#### Method C: Using Git Bash
- Download and install [Git for Windows](https://git-scm.com/download/win)
- Open Git Bash and follow same SSH commands as Linux

---

## 🚀 Quick Start - Run a Chat Session

### Step 1: On the Linux Server
```bash
cd ~/SSH-TERMINAL-CHAT-APP
./chat.sh
```

The server is now ready for connections. It will display:
```
╔════════════════════════════════════════╗
║  SSH Terminal Chat - LAN Edition      ║
║  Press Ctrl+C to exit                 ║
╚════════════════════════════════════════╝
[CHAT] Welcome, username!
[CHAT] Connection established at HH:MM:SS
```

### Step 2: On Windows PowerShell
```powershell
ssh username@192.168.1.100 "~/SSH-TERMINAL-CHAT-APP/./chat.sh"
# Or if your server has the script in a different location:
ssh username@192.168.1.100 "/path/to/SSH-TERMINAL-CHAT-APP/chat.sh"
```

### Step 3: Start Chatting!
- Type your message and press **Enter**
- Messages appear instantly with timestamp and username
- Other connected users see your message in real-time

### Example Session
```
╔════════════════════════════════════════╗
║  SSH Terminal Chat - LAN Edition      ║
║  Press Ctrl+C to exit                 ║
╚════════════════════════════════════════╝
[CHAT] Welcome, john!
[CHAT] Connection established at 14:23:45

═══════════════════════════════════════════

[14:23:50] alice: Hello everyone!
[14:23:55] bob: Hi there!
[14:24:02] john: Hey! How's everyone doing?
You: Great, thanks for asking!
[14:24:10] john: Great, thanks for asking!
[14:24:15] alice: Awesome! Let's chat more
```

---

## 📖 Advanced Usage

### Running on Custom SSH Port
```bash
# Server: (sshd listens on custom port, e.g., 2222)
ssh -p 2222 username@192.168.1.100 "~/SSH-TERMINAL-CHAT-APP/./chat.sh"
```

### Using SSH Key Authentication
```bash
# Copy your public key to server
ssh-copy-id -i ~/.ssh/id_rsa.pub username@192.168.1.100

# Then connect without password
ssh username@192.168.1.100 "~/SSH-TERMINAL-CHAT-APP/./chat.sh"
```

### Background Execution
```bash
# Run chat in background with nohup (handy for long-term usage)
nohup ssh username@192.168.1.100 "~/SSH-TERMINAL-CHAT-APP/./chat.sh" > chat.log 2>&1 &
```

---

## 📊 File Structure

```
SSH-TERMINAL-CHAT-APP/
├── chat.sh          # Main chat application script
├── README.md        # This file - installation and usage guide
├── LICENSE          # MIT License
└── .gitignore       # Git ignore patterns
```

---

## 🔒 Security Considerations

1. **SSH Encryption**: All communication is encrypted via SSH tunnel
2. **User Isolation**: Each user has a unique session identifier
3. **File Permissions**: Create `.ssh/config` on client for easy access:
   ```bash
   # On Windows or Linux client
   # ~/.ssh/config
   Host chatserver
       HostName 192.168.1.100
       User username
       Port 22
       IdentityFile ~/.ssh/id_rsa
   ```
   Then connect with: `ssh chatserver "~/SSH-TERMINAL-CHAT-APP/./chat.sh"`

4. **Firewall**: Ensure SSH port (default 22) is open only to trusted networks

---

## 🐛 Troubleshooting

### "Connection refused" or "Connection timed out"
```bash
# Check if SSH server is running on Linux
sudo systemctl status ssh    # Ubuntu/Debian
sudo systemctl status sshd   # CentOS/Fedora

# Check if server is accepting connections
nc -zv 192.168.1.100 22
```

### "Permission denied"
```bash
# Make script executable on Linux
chmod +x ~/SSH-TERMINAL-CHAT-APP/chat.sh

# Verify permissions
ls -l ~/SSH-TERMINAL-CHAT-APP/chat.sh
```

### "Command not found" on Windows
```powershell
# Ensure SSH is installed and in PATH
ssh -V

# If not found, enable OpenSSH feature:
# Settings > Apps > Apps & Features > Optional Features > Add a feature
# Search for "OpenSSH Client" and install
```

### Messages not appearing in real-time
- Ensure both terminals are using the **same user** or have proper read permissions
- Check `/tmp` directory exists and has write permissions: `ls -la /tmp`
- Try running the script with explicit path: `bash ~/SSH-TERMINAL-CHAT-APP/chat.sh`

### Color not showing on Windows
- Colors are automatically detected; if they don't show, it's likely due to:
  - Using pure `cmd.exe` instead of PowerShell (use PowerShell instead)
  - Terminal not supporting ANSI colors (most modern terminals do)
  - Try: `powershell` followed by `ssh` command

---

## 💡 Usage Tips

- Type `/help` in the chat to see available commands
- Use `/time` to sync time between servers
- Use `/users` to see how many people are connected
- Messages are stored in `/tmp/ssh-chat-XXXX/` (auto-cleaned after all users exit)
- Each session is isolated - multiple chat sessions run independently
- The chat directory auto-deletes when the last user exits

---

## 🤝 Contributing

Found a bug or have an idea? Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

---

## 🎯 Future Enhancements

Planned features for future versions:
- [ ] Direct TCP protocol (no SSH dependency)
- [ ] Private messaging between users
- [ ] Message history export
- [ ] User authentication
- [ ] GUI for easier setup
- [ ] Docker containers for easy deployment
- [ ] Python version for Windows native support

---

## ❓ FAQ

**Q: Can I use this over the internet?**  
A: Yes, via SSH tunneling. Ensure your firewall allows SSH connections and use public IP/domain instead of local IP.

**Q: Is there a limit on number of users?**  
A: No hard limit, but performance depends on your server hardware. Tested with 10+ simultaneous users.

**Q: Can I install on macOS?**  
A: Yes! macOS has Bash and SSH built-in. Follow Linux server instructions.

**Q: Do I need root/sudo privileges?**  
A: No, regular user is fine. Script uses `/tmp` which is writable by all users.

**Q: What about Windows Server?**  
A: Windows Server has SSH client available. Follow Windows client setup instructions.

---

## 📞 Support

For issues, questions, or suggestions:
- Open an GitHub issue
- Check existing issues for solutions
- Review troubleshooting section above

---

**Made with ❤️ for LAN chat enthusiasts**  
*Last updated: February 2026*
