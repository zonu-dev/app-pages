(function () {
    // Replace this with the public site token issued by Cloudflare Web Analytics.
    var analyticsToken = "08dcd319a2d2421a97a955db21d2b574";
    var productionHosts = {
        "zoochigames.com": true,
        "www.zoochigames.com": true
    };

    if (!productionHosts[window.location.hostname]) {
        return;
    }

    if (!analyticsToken) {
        return;
    }

    if (document.querySelector("script[data-cf-beacon]")) {
        return;
    }

    var script = document.createElement("script");
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.setAttribute("data-cf-beacon", JSON.stringify({ token: analyticsToken }));
    document.head.appendChild(script);
}());
