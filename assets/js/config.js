(function () {
  "use strict";

  function firstNonEmpty() {
    for (var i = 0; i < arguments.length; i++) {
      var v = arguments[i];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
    return "";
  }

  window.__ccApiBase = window.__ccApiBase || function () {
    return firstNonEmpty(
      window.COLCONNECT_API_BASE,
      localStorage.getItem("cc_api_base"),
      "http://127.0.0.1:8001"
    );
  };

  window.__ccArbCollectiviteId = window.__ccArbCollectiviteId || function () {
    return firstNonEmpty(
      localStorage.getItem("cc_collectivite_id"),
      localStorage.getItem("collectiviteId"),
      "nova-sur-marne-94000"
    );
  };

  window.__ccArbAuthToken = window.__ccArbAuthToken || function () {
    var fromStorage = localStorage.getItem("colconnectToken");
    var fromCurrentUser =
      window.currentUser &&
      typeof window.currentUser.accessToken === "string"
        ? window.currentUser.accessToken
        : "";
    return firstNonEmpty(fromStorage, fromCurrentUser);
  };

  window.__ccArbAuthHeaders = window.__ccArbAuthHeaders || function (extraHeaders) {
    var headers = Object.assign({}, extraHeaders || {});
    var token = window.__ccArbAuthToken();

    if (token) {
      headers.Authorization = "Bearer " + token;
    }

    return headers;
  };

  window.__ccBackendFetch = window.__ccBackendFetch || async function (path, options) {
    var opts = Object.assign({}, options || {});
    var base = window.__ccApiBase();
    var normalizedPath = String(path || "");
    var url = /^https?:\/\//i.test(normalizedPath) ? normalizedPath : (base + normalizedPath);

    opts.headers = window.__ccArbAuthHeaders(opts.headers || {});
    return window.fetch(url, opts);
  };

  window.__ccDebugAuth = window.__ccDebugAuth || function () {
    var token = window.__ccArbAuthToken();
    var payload = {
      apiBase: window.__ccApiBase(),
      collectiviteId: window.__ccArbCollectiviteId(),
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      tokenPreview: token ? (token.slice(0, 12) + "...") : "",
      currentUserDefined: !!window.currentUser
    };
    console.log("[ColConnect Auth Debug]", payload);
    return payload;
  };

  console.log("[ColConnect] config.js loaded", {
    apiBase: window.__ccApiBase(),
    collectiviteId: window.__ccArbCollectiviteId(),
    hasToken: !!window.__ccArbAuthToken()
  });
})();
