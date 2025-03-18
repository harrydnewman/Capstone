module.exports = async function enableStealth(context) {
    await context.addInitScript(() => {
        // Remove Playwright detection
        Object.defineProperty(navigator, 'webdriver', { get: () => false });

        // Mimic a real browser
        Object.defineProperty(navigator, 'deviceMemory', { get: () => 8 });
        Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 4 });

        // Fake WebGL Renderer & Vendor
        const getParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function (parameter) {
            if (parameter === 37445) return 'Intel Inc.';
            if (parameter === 37446) return 'Intel Iris OpenGL Engine';
            return getParameter(parameter);
        };

        // Prevent AudioContext fingerprinting
        const getChannelData = AudioBuffer.prototype.getChannelData;
        AudioBuffer.prototype.getChannelData = function () {
            const results = getChannelData.apply(this, arguments);
            Object.defineProperty(results, 'buffer', { get: () => new ArrayBuffer(0) });
            return results;
        };

        // Randomize time zone
        Intl.DateTimeFormat = class extends Intl.DateTimeFormat {
            constructor(locale, options) {
                super(locale, { timeZone: 'America/New_York', ...options });
            }
        };
    });
};
