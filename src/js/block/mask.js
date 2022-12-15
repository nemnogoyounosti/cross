$(() => {
    $(".phone_mask").inputmask("+7(999) 999-9999");

    $(".email_mask").inputmask({
        mask: "*{1,50}[.*{1,50}][.*{1,50}]@*{1,50}.*{1,20}[.*{1,20}][.*{1,20}]",
        greedy: false,
        //clearIncomplete: true,// если нужно чистить поле, когда не закончили вводить email
        showMaskOnHover: false,
        definitions: {
            '*': {
                validator: "[^_@.]"
            }
        }
    });
});

