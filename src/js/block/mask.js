$(() => {
    let $input = $('.email-1, .email-2');
    let cursor = $input[0].selectionStart;
    let prev = $input.val();

    $input.inputmask({
        mask: "*{1,50}[.*{1,50}][.*{1,50}]@*{1,50}.*{1,20}[.*{1,20}][.*{1,20}]",
        greedy: false,
        //clearIncomplete: true,// если нужно чистить поле, когда не закончили вводить email
        showMaskOnHover: false,
        definitions: {
            '*': {
                validator: "[^_@.]"
            }
        }
    }).on('input paste', function() {
        if (this.value && /[^_a-zA-Z0-9@\-.]/i.test(this.value)) {
            this.value = prev;
            this.setSelectionRange(cursor, cursor);
            $input.trigger('input');
        } else {
            cursor = this.selectionStart;
            prev = this.value;
        }

        actionAfterValidate(this);
    });

    $input.blur(function() {
        actionAfterValidate(this);
    })

    function emailValidator(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    function actionAfterValidate(input) {
        const error = $(input).parents('.email-wrapper').find('.error')
        const warning = $(input).parents('.email-wrapper').find('.warning')
        console.log(input.value)
        if(input.value === '') {
            warning.removeClass('not-visible')
            error.addClass('not-visible')
            $(input).removeClass('input-error')
        } else {
            warning.addClass('not-visible')

            if(input.value !== "" && emailValidator(input.value)) {
                error.addClass('not-visible')
                $(input).removeClass('input-error')
            } else {
                error.removeClass('not-visible')
                $(input).addClass('input-error')
            }
        }
    }


    let $inputPhone = $('.phone-wrapper > input');
    let cursorPhone = $inputPhone[0].selectionStart;
    let prevPhone = $inputPhone.val();

    $inputPhone.inputmask({
        mask: "+7 (###) ###-####",
    }).on('input paste', function() {
        const error = $(this).parents('.phone-wrapper').find('.error')
        const warning = $(this).parents('.phone-wrapper').find('.warning')
        const input = $(this).parents('.phone-wrapper').find('input')
        if(this.value === '') {
            warning.removeClass('not-visible')
            error.addClass('not-visible')
            input.removeClass('input-error')
        } else {
            warning.addClass('not-visible')

            if (this.value && /^[\+][7]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/i.test(this.value)) {
                error.addClass('not-visible')
                input.removeClass('input-error')
            } else {
                error.removeClass('not-visible')
                input.addClass('input-error')
            }
        }
    });

    $inputPhone.blur(function() {
        const error = $(this).parents('.phone-wrapper').find('.error')
        const warning = $(this).parents('.phone-wrapper').find('.warning')
        const input = $(this).parents('.phone-wrapper').find('input')
        if(this.value === '') {
            warning.removeClass('not-visible')
            error.addClass('not-visible')
            input.removeClass('input-error')
        } else {
            warning.addClass('not-visible')
        }

        if (this.value !== '' && this.value.length > 0 && !(/^[\+][7]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/i.test(this.value))) {
            error.removeClass('not-visible')
            input.addClass('input-error')
        }
    })
});
