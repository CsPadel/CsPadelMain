# Enquiry flow verification

- Base: `http://[::1]:4321`
- Run: 2026-09-06T00:23:34.756Z
- Checks: 73, failed: 0
- The submit POST is intercepted and never delivered to the live endpoint.

| Result | Check | Detail |
| --- | --- | --- |
| PASS | CTA on /the-experience opens the enquiry modal |  |
| PASS | CTA on /our-story opens the enquiry modal |  |
| PASS | CTA on / opens the enquiry modal |  |
| PASS | CTA on /upcoming-retreats opens the enquiry modal |  |
| PASS | CTA on /dubai opens the enquiry modal |  |
| PASS | CTA on /east-sussex opens the enquiry modal |  |
| PASS | CTA on /bali opens the enquiry modal |  |
| PASS | [desktop-200] modal opens from CTA |  |
| PASS | [desktop-200] step 1 blocks empty destination | Please choose a destination to continue. |
| PASS | [desktop-200] step 1 accepts a destination |  |
| PASS | [desktop-200] step 2 blocks empty dates | Please choose a month and a year. |
| PASS | [desktop-200] step 2 accepts month + year |  |
| PASS | [desktop-200] step 3 accepts group size |  |
| PASS | [desktop-200] step 4 accepts priorities |  |
| PASS | [desktop-200] reaches final step | 5 / 5 |
| PASS | [desktop-200] step 5 blocks empty contact | Please enter your first and last name. |
| PASS | [desktop-200] step 5 rejects a malformed email | Please enter a valid email address. |
| PASS | [desktop-200] step 5 requires consent | Please accept the use of your details so we can reply. |
| PASS | [desktop-200] enquiry POST was sent |  |
| PASS | [desktop-200] payload is JSON |  |
| PASS | [desktop-200] payload carries every answer |  |
| PASS | [desktop-200] destination is a stable key, not a label | menorca |
| PASS | [desktop-200] confirmation screen renders |  |
| PASS | [desktop-200] submit button is retired after success |  |
| PASS | [desktop-500] modal opens from CTA |  |
| PASS | [desktop-500] step 1 blocks empty destination | Please choose a destination to continue. |
| PASS | [desktop-500] step 1 accepts a destination |  |
| PASS | [desktop-500] step 2 blocks empty dates | Please choose a month and a year. |
| PASS | [desktop-500] step 2 accepts month + year |  |
| PASS | [desktop-500] step 3 accepts group size |  |
| PASS | [desktop-500] step 4 accepts priorities |  |
| PASS | [desktop-500] reaches final step | 5 / 5 |
| PASS | [desktop-500] step 5 blocks empty contact | Please enter your first and last name. |
| PASS | [desktop-500] step 5 rejects a malformed email | Please enter a valid email address. |
| PASS | [desktop-500] step 5 requires consent | Please accept the use of your details so we can reply. |
| PASS | [desktop-500] enquiry POST was sent |  |
| PASS | [desktop-500] payload is JSON |  |
| PASS | [desktop-500] payload carries every answer |  |
| PASS | [desktop-500] destination is a stable key, not a label | menorca |
| PASS | [desktop-500] failure is surfaced to the user |  |
| PASS | [mobile-200] modal opens from CTA |  |
| PASS | [mobile-200] step 1 blocks empty destination | Please choose a destination to continue. |
| PASS | [mobile-200] step 1 accepts a destination |  |
| PASS | [mobile-200] step 2 blocks empty dates | Please choose a month and a year. |
| PASS | [mobile-200] step 2 accepts month + year |  |
| PASS | [mobile-200] step 3 accepts group size |  |
| PASS | [mobile-200] step 4 accepts priorities |  |
| PASS | [mobile-200] reaches final step | 5 / 5 |
| PASS | [mobile-200] step 5 blocks empty contact | Please enter your first and last name. |
| PASS | [mobile-200] step 5 rejects a malformed email | Please enter a valid email address. |
| PASS | [mobile-200] step 5 requires consent | Please accept the use of your details so we can reply. |
| PASS | [mobile-200] enquiry POST was sent |  |
| PASS | [mobile-200] payload is JSON |  |
| PASS | [mobile-200] payload carries every answer |  |
| PASS | [mobile-200] destination is a stable key, not a label | menorca |
| PASS | [mobile-200] confirmation screen renders |  |
| PASS | [mobile-200] submit button is retired after success |  |
| PASS | [mobile-500] modal opens from CTA |  |
| PASS | [mobile-500] step 1 blocks empty destination | Please choose a destination to continue. |
| PASS | [mobile-500] step 1 accepts a destination |  |
| PASS | [mobile-500] step 2 blocks empty dates | Please choose a month and a year. |
| PASS | [mobile-500] step 2 accepts month + year |  |
| PASS | [mobile-500] step 3 accepts group size |  |
| PASS | [mobile-500] step 4 accepts priorities |  |
| PASS | [mobile-500] reaches final step | 5 / 5 |
| PASS | [mobile-500] step 5 blocks empty contact | Please enter your first and last name. |
| PASS | [mobile-500] step 5 rejects a malformed email | Please enter a valid email address. |
| PASS | [mobile-500] step 5 requires consent | Please accept the use of your details so we can reply. |
| PASS | [mobile-500] enquiry POST was sent |  |
| PASS | [mobile-500] payload is JSON |  |
| PASS | [mobile-500] payload carries every answer |  |
| PASS | [mobile-500] destination is a stable key, not a label | menorca |
| PASS | [mobile-500] failure is surfaced to the user |  |