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

// For Srouce Code Form
(function() {
  document.addEventListener('submit', function(event) {
    var form = event.target.closest('form[action^="https://submit.jotform.com"]');
    if(form) {
      var formData = new FormData(form);
      var formInputs = {};
      formData.forEach(function(value, key) {
        formInputs[key] = value;
      });
      delete formInputs['jsExecutionTracker'];
      delete formInputs['validatedNewRequiredFieldIDs'];
      delete formInputs['simple_spc'];
      delete formInputs['submitSource'];

      dataLayer.push({
        event: 'jot_form_submit',
        formId: formInputs.formID,
        inputs: formInputs
      });
    }
  });
})();
</script>
