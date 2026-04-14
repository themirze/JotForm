# Jotform Submission Tracking (Google Tag Manager / dataLayer)

This script tracks form submissions from Jotform and pushes events into the `dataLayer`. It supports both:

* **iFrame embedded forms**
* **Source code embedded forms**

---

## ✅ Features

* Tracks successful submissions from Jotform forms
* Sends `formId` and (optionally) form input data to `dataLayer`
* Works with Google Tag Manager (GTM) or any `dataLayer`-based tracking setup

---

## 📌 Implementation

Add the following script to your Google Tag Manager (Custom HTML | All Pages):

```html
<script>

// For iFrame Form
window.addEventListener('message', function (event) {
  if(event.origin.includes('jotform.com') && event.data.action === 'submission-completed')  {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: 'jot_form_submit',
      formId: event.data.formID
    });
  }
});

// For Source Code Form
(function() {
  document.addEventListener('submit', function(event) {
    var form = event.target.closest('form[action^="https://submit.jotform.com"]');
    if(form) {
      var formData = new FormData(form);
      var formInputs = {};
      formData.forEach(function(value, key) {
        formInputs[key] = value;
      });

      // Remove unnecessary/internal fields
      delete formInputs['jsExecutionTracker'];
      delete formInputs['validatedNewRequiredFieldIDs'];
      delete formInputs['simple_spc'];
      delete formInputs['submitSource'];

      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: 'jot_form_submit',
        formId: formInputs.formID,
        inputs: formInputs
      });
    }
  });
})();
</script>
```

---

## 📊 dataLayer Events

### 1. iFrame Form Submission

```json
{
  "event": "jot_form_submit",
  "formId": "1234567890"
}
```

---

### 2. Source Code Form Submission

```json
{
  "event": "jot_form_submit",
  "formId": "1234567890",
  "inputs": {
    "email": "example@mail.com",
    "name": "John Doe"
  }
}
```

## ⚠️ Important Note

> If you **do NOT use the "Source Code Form" method**, it is **NOT possible to send user-level input data** (such as name, email, etc.) into the `dataLayer`.

* iFrame forms are sandboxed for security reasons
* Only submission event + formId can be captured from iFrame
* User input data access requires **direct DOM access**, which is only available in **Source Code embeds**

---

## 🚀 GTM Trigger Example

* Trigger Type: Custom Event
* Event Name: `jot_form_submit`

You can then use:

* `formId`
* `inputs.*` (only for source code forms)

---

## 📎 License

Free to use and modify.
