function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + "_by28";
}
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

document.addEventListener(
    "DOMContentLoaded",
    function () {
        // Copy URL
        document.getElementById("shortcut-url").addEventListener(
            "click",
            function () {
                var copyText = document.getElementById("shortcut-url");
                copyText.select();
                copyText.setSelectionRange(0, 99999);
                document.execCommand("copy");
            },
            false
        );
        // Get URL & set in input
        document.getElementById("small-btn").addEventListener(
            "click",
            function () {
                chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
                    document.getElementById("url").value = tabs[0].url;
                });
            },
            false
        );
        // shortCut URL & update result input
        document.getElementById("scu-start").addEventListener(
            "click",
            function () {
                url = document.getElementById("url").value
                if(validURL(url)){
                    param = makeid(7);
                    req = new XMLHttpRequest()
                    form = new FormData()
                    form.append("txt_name", param)
                    form.append("txt_url", url)
                    req.open('POST', 'https://v.ht/processreq.php', true)
                    req.send(form);
                    document.getElementById("shortcut-url").value = "https://v.ht/" + param;    
                }else{
                    document.getElementById("shortcut-url").value = "Invalid URL !!!!!!"
                }
            },
            false
        );
        // Contact Me URLs
        document.getElementById("contact").addEventListener(
            "click", (e) => {
                e.preventDefault();
                window.open("https://github.com/JUSTSAIF", 'sky');
            },
            false
        );
    },
    false
);
