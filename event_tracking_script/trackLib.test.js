

require('./trackLib.js');

global.fetch = jest.fn();

test("Script initializes and attaches to window object", () => {
    expect(window.TrackLib).toBeDefined();
});

test("Tracks a page view", () => {
    window.TrackLib.trackPageView();
    const pageviews = window.TrackLib.checkQueue()

    // Expect a fetch call to have been made.
    expect(pageviews[0].type).toBe('page_view');

});

test("Tracks device information correctly", () => {
    window.TrackLib.trackPageView();

    const pageviews = window.TrackLib.checkQueue()
    const payload = pageviews[0]
    expect(payload).toHaveProperty("browser");
    expect(payload).toHaveProperty("version");
    expect(payload).toHaveProperty("screenResolution");
});

// afterEach(() => {
//     global.fetch.mockClear();
//     document.body.innerHTML = '';  // Clean up any elements added to the body.
// })