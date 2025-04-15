# Analytics Utilities

This directory contains utility functions for tracking user interactions and page views in Google Analytics.

## Analytics Utility (`analytics.js`)

The `analytics.js` file provides a simple, consistent interface for tracking events and page views in Google Analytics. It abstracts away the implementation details and provides type-safe functions for various tracking needs.

### Usage

#### Tracking Page Views

Page views are automatically tracked when routes change (configured in `main.js`), but you can also manually track page views:

```javascript
import { trackPageView } from '@/utils/analytics';

// Track a page view
trackPageView('/path/to/page', 'Page Title');
```

#### Tracking User Events

User events (like logins and registrations) can be tracked using the `userEvents` object:

```javascript
import { userEvents } from '@/utils/analytics';

// Track a login event
userEvents.login('email');  // or 'google', etc.

// Track a registration event
userEvents.register('email');  // or 'google', etc.
```

#### Tracking Invoice Events

Invoice-related events can be tracked using the `invoiceEvents` object:

```javascript
import { invoiceEvents } from '@/utils/analytics';

// Track invoice creation
invoiceEvents.create('Invoice #123', 150000);

// Track invoice download
invoiceEvents.download('Invoice #123', 150000);

// Track invoice update
invoiceEvents.update('Invoice #123');
```

#### Custom Events

For custom events not covered by the predefined categories, you can use the `trackEvent` function directly:

```javascript
import { trackEvent } from '@/utils/analytics';

// Track a custom event
trackEvent(
  'action_name',       // The action (required)
  'event_category',    // The category (required)
  'event_label',       // The label (required)
  value                // The value (optional)
);
```

### Why Use This Utility?

- **Consistent API**: Provides a consistent interface for tracking events across the application
- **Type Safety**: Predefined event functions ensure the right parameters are passed
- **Centralized Logic**: All tracking logic is in one place, making it easier to update
- **No Direct Dependencies**: Doesn't rely on Vue-specific plugins, making it more maintainable

### Integration with Vue Router

This utility is integrated with Vue Router in `main.js` to automatically track page views when routes change. 