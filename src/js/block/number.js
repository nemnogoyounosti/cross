$(document).ready(function() {
    $('body').on('click', '.number-minus, .number-plus', function(){
        let $row = $(this).closest('.number');
        let $input = $row.find('.number-text');
        let step = $row.data('step');
        let val = parseFloat($input.val());
        if ($(this).hasClass('number-minus')) {
            val -= step;
        } else {
            val += step;
        }
        $input.val(val);
        $input.change();
        return false;
    });

    $('body').on('change', '.number-text', function(){
        let $input = $(this);
        let $row = $input.closest('.number');
        let step = $row.data('step');
        let min = parseInt($row.data('min'));
        let max = parseInt($row.data('max'));
        let val = parseFloat($input.val());
        if (isNaN(val)) {
            val = step;
        } else if (min && val < min) {
            val = min;
        } else if (max && val > max) {
            val = max;
        }
        $input.val(val);
    });
});