function init() {
    // Jameson: pre-populate creds for tech support as they keep forgetting them and emailing me
    if (document.cookie.match(/^(.*;)?\s*isPhotoBombTechSupport\s*=\s*[^;]+(.*)?$/)) {
      document.getElementsByClassName('creds')[0].setAttribute('href','http://pH0t0:b0Mb!@photobomb.htb/printer');
    }
  }
  window.onload = init;