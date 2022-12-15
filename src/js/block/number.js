$(() => {
    $('body').on('click', '.number-minus, .number-plus', function(){
        let $row = $(this).closest('.number');
        let $input = $row.find('.number-text');
        let step = $row.data('step');
        let val = parseFloat($input.val());
        if ($(this).hasClass('number-minus')) {
            val -= step;
            if (val < 0) val = 0
        } else {
            val += step;
            if (val > 10) val = 10
        }
        $input.val(val);
        $input.change();
        return false;
    });

});
