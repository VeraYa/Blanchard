// inputmask & validation

$('input[type="tel"]').inputmask({ "mask": "+7 (999) 999-99-99" }); //specifying options

$("form").each(function () {
  $(this).validate({
    rules: {
      Телефон: {
        required: true,
      },
      Имя: {
        required: true,
        maxlength: 30,
        minlength: 2
      }
    },
    messages: {
      Телефон: {
        required: "Недопустимый формат",
      },
      Имя: {
        required: "Недопустимый формат",
        minlength: "Не достаточноe количество символов"
      }
    },
    submitHandler: function(thisForm) {
      let formData = new FormData(thisForm);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      thisForm.reset();
    }
  });
});
