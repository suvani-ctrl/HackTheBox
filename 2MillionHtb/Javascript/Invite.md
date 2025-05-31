
de4js1.12.0
JavaScript Deobfuscator and Unpacker
View on GitHub
String
Local File
Remote File
None Eval Array Obfuscator IO _Number JSFuck JJencode AAencode URLencode Packer JS Obfuscator My Obfuscate Wise Eval Wise Function Clean Source Unreadable
Line numbers Format Code Unescape strings Recover object-path Execute expression Merge strings Remove grouping
Download file
Open in new tab

eval(function (p, a, c, k, e, d) {
    e = function (c) {
        return c.toString(36)
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[c.toString(a)] = k[c] || c.toString(a)
        }
        k = [function (e) {
            return d[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    };
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
        }
    }
    return p
}('1 i(4){h 8={"4":4};$.9({a:"7",5:"6",g:8,b:\'/d/e/n\',c:1(0){3.2(0)},f:1(0){3.2(0)}})}1 j(){$.9({a:"7",5:"6",b:\'/d/e/k/l/m\',c:1(0){3.2(0)},f:1(0){3.2(0)}})}', 24, 24, 'response|function|log|console|code|dataType|json|POST|formData|ajax|type|url|success|api/v1|invite|error|data|var|verifyInviteCode|makeInviteCode|how|to|generate|verify'.split('|'), 0, {}))

Sponsors

Secure stores, happy shoppers. We are Sansec.
Credits

Project maintained by lelinhtinh
Hosted on GitHub Pages

Icons made by Eucalyp
