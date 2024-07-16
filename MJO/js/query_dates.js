
    //內部函式 得到上(下)n天的日期
    function get_new_day(now_date, shift_num) {
        var now_date_year = parseInt(now_date.substring(0, 4), 10);   
        var now_date_month = parseInt(now_date.substring(5, 7), 10);
        var now_date_day = parseInt(now_date.substring(8, 10), 10);
        

        var d = new Date(Date.UTC(now_date_year, now_date_month-1, now_date_day));
        d.setDate(d.getDate() + shift_num);
        
        return d.toISOString().slice(0, 10); 
    }
    
    function before_equal_today(input_date) {
        var input_date_year = parseInt(input_date.substring(0, 4), 10);   
        var input_date_month = parseInt(input_date.substring(5, 7), 10);
        var input_date_day = parseInt(input_date.substring(8, 10), 10);    
        var d = new Date(input_date_year, input_date_month-1, input_date_day);
        var newest_date = new Date();
        var newest_date = newest_date.setDate(newest_date.getDate() - 4);

        return d <= newest_date;
    }

    function update_pics(str_to_be_replaced, img_selector){
        var date_string = $('#date_selector').val();

        var now_date_8digit = date_string.substring(0, 4) + date_string.substring(5, 7) + date_string.substring(8, 10);
        $(img_selector).each(function() {
            var img_name = $(this).attr('src');
			
			      img_name = img_name.replace(str_to_be_replaced, now_date_8digit).split('?timestamp')[0];
            
            d = new Date();
            $(this).attr('src', img_name+'?timestamp='+d.getTime());
        });    
    }
    
    // function instant_update() {
        // var now_display = $('#now_display').attr('result');
        // update_pics(/(20)[0-9]{6}/g, '.' + now_display + '_pics img'); 
    // }



    //起始時間
    function time_init(str_to_be_replaced, img_selector) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var start_date = d.toISOString().slice(0, 10);

        $('#date_selector').val(start_date);
    
        $('#date_selector').datepicker({
        defaultDate: start_date,
        changeMonth: true,
        changeYear: true,
        dateFormat: "yy-mm-dd",
        });
        
        update_pics(str_to_be_replaced, img_selector)
        
    }
