$(document).ready(function(){
//=====
//本檔案大致上主要都在控制日期切換相關
//=====

    function get_current_date_8digits(display){
        var date_string = $('#date_selector').val();
        var current_date = date_string.substring(0, 4) + date_string.substring(5, 7) + date_string.substring(8, 10);

        if (display) {
            update_pic_links(current_date);
        } else { 
            update_links(current_date);        
        }
    }
    
    //將頁面裡面網址相關的路徑切換日期
    function update_pic_links(current_date) {
        var $pic_links = $('.display_area img');   
        $pic_links.each(function() {
            var old_src = $(this).attr('src');
            if (typeof old_src !== typeof undefined) {
                //var path_segment2 = old_src.split('/');
                var path_segment = old_src.split('_');
               // $(this).attr('src', path_segment[0] + 'CWBens/' + current_date + '/' + path_segment[1].split('/')[1]);
		$(this).attr('src',  current_date + '/' + current_date + '00_'+ path_segment[1] + '_' +  path_segment[2]   );
		}
        }) 
    }       
    
    //在查詢頁面中 更新query string的日期
    function update_links(current_date) {
        var $weekly_imgs = $('a');

        $weekly_imgs.each(function() {
            var old_href = $(this).attr('href');
            if (typeof old_href !== typeof undefined) {
                old_href = old_href.split('&dates')[0];
                $(this).attr('href',  old_href + '&dates=' + current_date);
            }
        })    
    }
    
    
    //從月曆選單中選擇
    $(document).on('change', '#date_selector', function() {
        var is_display = $(this).hasClass('display');
        get_current_date_8digits(is_display);
    })
    
    

    //按下"前一天"
    $(document).on('click', '#previous_day', function() {
        var start_date = $('#date_selector').val();
        var is_display = $(this).hasClass('display');
        $('#date_selector').val(get_new_day(start_date, -1, false));
        get_current_date_8digits(is_display);
    });

    //按下"後一天"
    $(document).on('click', '#next_day', function() {
        var start_date = $('#date_selector').val();

        if (!before_equal_today(start_date)) {
            return false;
        }        
        var is_display = $(this).hasClass('display');
        $('#date_selector').val(get_new_day(start_date, 1, false));
        get_current_date_8digits(is_display);
    });        

    //按下"最近一天"
    $(document).on('click', '#latest', function() {
        time_init();
        var is_display = $(this).hasClass('display');
        get_current_date_8digits(is_display);
    });  

    time_init();    
    var is_display = $(this).hasClass('display');
    get_current_date_8digits(is_display);
    $('#ui-datepicker-div').hide();
})
