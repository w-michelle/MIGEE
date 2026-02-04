import * as CookieConsent from "vanilla-cookieconsent";

export function initCookieConsent() {
  CookieConsent.run({
    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {},
      marketing: {},
    },
    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "We use cookies",
            description:
              "We use cookies to enhance your shopping experience, analyze traffic, and for marketing",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            showPreferencesBtn: "Manage Individual preferences",
          },
          preferencesModal: {
            title: "Manage cookie preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Accept current selection",
            closeIconLabel: "Close modal",
            sections: [
              {
                title: "Strictly necessary",
                description:
                  "These cookies are essential for the proper functioning of the website and cannot be disabled.",
                linkedCategory: "necessary",
              },
              {
                title: "Analytics",
                description: "Helps us improve the site",
                linkedCategory: "analytics",
              },
              {
                title: "Marketing",
                description: "Used for personalized ads.",
                linkedCategory: "marketing",
              },
              {
                title: "More information",
                description:
                  'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>',
              },
            ],
          },
        },
      },
    },
  });
}
