(function (global) {
  const TRACKING_ENDPOINT = "http://localhost:4000/events";
  const MAX_BATCH_SIZE = 10; // Choose an optimal batch size.
  const eventsQueue = [];
  let annoymousUserData = null;
  let DEBUG_MODE = false;

  async function getUserIp() {
    if (!annoymousUserData) {
      const response = await fetch("http://ip-api.com/json/");
      const results = await response.json();
      annoymousUserData = {
        ip: results.query,
        timezone: results.timezone,
        country: results.country,
        region: results.region,
        city: results.city,
        isp: results.isp,
      };
    }
  }

  function getDeviceType() {
    const userAgent = navigator.userAgent;

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      return "Tablet";
    }
    if (
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(
        userAgent
      )
    ) {
      return "Mobile";
    }
    return "Desktop";
  }

  function getUserDeviceInfo() {
    const { userAgent } = navigator;

    const matches = /(\w+)\/(\d+.\d+)/g.exec(userAgent);
    let browser = "unknown";
    let version = "unknown";

    if (matches && matches.length > 2) {
      browser = matches[1];
      version = matches[2];
    }

    return {
      device_type: getDeviceType(),
      ...annoymousUserData,
      browser,
      version,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    };
  }

  function sendTrackEvent(data) {
    console.log("sending data", data);
    fetch(TRACKING_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error("Failed to send tracking data:", error);
    });
  }

  function processQueue() {
    if (eventsQueue.length >= MAX_BATCH_SIZE) {
      sendTrackEvent(eventsQueue.splice(0, MAX_BATCH_SIZE));
    }
  }

  const TrackLib = {
    trackPageView: function () {
      const data = {
        type: "page_view",
        eventName: "Page View",
        timestamp: new Date().toISOString(),
        location: window.location.href,
        deviceInfo: {
          ...getUserDeviceInfo(),
        },
      };
      console.log("event logged", data);
      eventsQueue.push(data);
      processQueue();
    },

    trackEvent: function (eventName, eventProperties = {}) {
      const data = {
        type: "custom_event",
        eventName: eventName,
        eventProperties: eventProperties,
        timestamp: new Date().toISOString(),
        location: window.location.href,
        deviceInfo: {
          ...getUserDeviceInfo(),
        },
      };
      eventsQueue.push(data);
      console.log("event logged", data);
      eventsQueue.push(data);
      processQueue();
    },

    checkQueue: function () {
      return eventsQueue;
    },

    init: async function (DEBUG = false) {
      await getUserIp();
      DEBUG_MODE = DEBUG;
      this.trackPageView();
      window.addEventListener("beforeunload", (event) => {
        if (eventsQueue.length > 0) {
          sendTrackEvent(eventsQueue); // Send remaining events when the user is about to leave.
        }
      });
    },
  };

  global.TrackLib = TrackLib;
})(window);
