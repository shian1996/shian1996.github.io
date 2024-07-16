$(document).ready(function(){    
    
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function set_p200_pics(current_date ) {
        template += '<table>';
        template += '<thead>';
        template += '<tr>';
        template += '<th style="position:relative;">Ana</th>';
        template += '<th>TCo639</th>';
        template += '<th>TGFS</th>';
        template += '<th>TCo383</th>';
        template += '</tr>';
        template += '</thead>';
        template += '<tbody>';
         for ( tau=0; tau<=360;tau=tau+12 ) {
           template += '<tr>';
            template += '<td><img src="./{date}/{date}00_ana500mb_f'+tau+'.png"  width="625" height="480" ></td>';
            template += '<td><img src="./{date}/{date}00_TCo500mb_f'+tau+'.png"  width="625" height="480" ></td>';  
            template += '<td><img src="./{date}/{date}00_tgfs500mb_f'+tau+'.png" width="625" height="480" ></td>';  
            template += '<td><img src="./{date}/{date}00_t383500mb_f'+tau+'.png"  width="625" height="480" ></td>';  
           template += '</tr>';
          }
        template += '</tbody></table>' ; 
        template = template.replace(/\{date\}/g , current_date);
        $('.display_area').append(template);       
    }    
    function set_p850_pics(current_date ) {
        template += '<table>';
        template += '<thead>';
        template += '<tr>';
        template += '<th style="position:relative;">Ana</th>';
        template += '<th>TCo639</th>';
        template += '<th>TGFS</th>';
        template += '<th>TCo383</th>';
        template += '</tr>';
        template += '</thead>';
        template += '<tbody>';
        for ( tau=0; tau<=360;tau=tau+12 ) {
           template += '<tr>';
           template += '<td><img src="./{date}/{date}00_ana850mb_f'+tau+'.png"  width="625" height="480" ></td>';  
           template += '<td><img src="./{date}/{date}00_TCo850mb_f'+tau+'.png"  width="625" height="480" ></td>';  
           template += '<td><img src="./{date}/{date}00_tgfs850mb_f'+tau+'.png" width="625" height="480" ></td>';  
           template += '<td><img src="./{date}/{date}00_t383850mb_f'+tau+'.png"  width="625" height="480" ></td>';  
           template += '</tr>';
        }
        template += '</tbody></table>' ; 
        template = template.replace(/\{date\}/g , current_date);
        $('.display_area').append(template);       
    }   
 
    function set_surf_pics(current_date ) {
        template += '<table>';
        template += '<thead>';
        template += '<tr>';
        //template += '<th>Ana</th>';
        template += '<th style="position:relative;">TCo639</th>';
        template += '<th>TGFS</th>';
        template += '<th>TCo383</th>';
        template += '<th>TCo383/TIMCOM</th>';
        template += '</tr>';
        template += '</thead>';
        template += '<tbody>';
        for ( tau=0; tau<=360;tau=tau+12 ) {
           template += '<tr>';
            //template += '<th><img src="./{date}/{date}00_anasurf_f'+tau+'.png"  width="625" height="480" ></th>';  
            template += '<td><img src="./{date}/{date}00_TCosurf_f'+tau+'.png"  width="625" height="480" ></td>';  
            template += '<td><img src="./{date}/{date}00_tgfssurf_f'+tau+'.png" width="625" height="480" ></td>';  
            template += '<td><img src="./{date}/{date}00_t383surf_f'+tau+'.png"  width="625" height="480" ></td>';  
            template += '<td><img src="./{date}/{date}00_timcomsurf_f'+tau+'.png"  width="625" height="480" ></td>';  
           template += '</tr>';
        }
        template += '</tbody></table>' ; 
        template = template.replace(/\{date\}/g , current_date);
        $('.display_area').append(template);       
    }    
  
    function set_precip_pics(current_date ) {
        
        template += '<table>';
        template += '<thead>';
        template += '<tr>';
        template += '<th>RMM index bc </br> (update at:10:30/LT)</th>';
        template += '<th>CHI 200 period mean removed </br> (5-Day running mean)</th>';
        template += '</tr>';
        template += '</thead>';
        template += '<tbody>';
        template += '<tr>';
        template += '<th><img src="./{date}/{date}00_rmm_ts.png"       width="400" height="450" ></th>';
        template += '<td><img src="./{date}/{date}00_pv_hd.png"    width="400" height="450" ></th>';  
        template += '</tr>';

        template += '</tbody></table>' ; 
        template = template.replace(/\{date\}/g , current_date);
        $('.display_area').append(template);       
    }       


    
    //氣壓層
    $(document).on('change', '#display_nav [name=plevel]', function() {
            weather_element = $(this).val();

        var selct_date = $('#date_selector').val();
        var start_date = selct_date.split("-")[0]+selct_date.split("-")[1]+selct_date.split("-")[2];

            $(".display_area").html(' '); //clean screem
            template  = '';  
            if ( weather_element == 'pra'){
              set_precip_pics(start_date);   
            } else if ( weather_element == 'p200'){
              set_p200_pics(start_date);   
            } else if ( weather_element == 'p850'){
              set_p850_pics(start_date);   
            } else if ( weather_element == 'surf'){
              set_surf_pics(start_date);   
            }

            return;
    })

    
   //點選圖片
   $(document).on('click', 'img', function() {
       var $this = $(this);
       var pic_url = $this.attr('src');

       $this.parent().attr('href', pic_url);
       $this.parent().attr('target', '_blank');
       $this.parent().click();
   });            
 
    //================================================== 
    //main start 網頁讀取時執行
    var current_date    = getParameterByName('dates');
    var weather_element = getParameterByName('var');
    var area            = getParameterByName('area');
    var time_type       = getParameterByName('time');
    var city            = getParameterByName('city');
    
    if ( city == '' ) {
       city='TP'
    }
    if ( current_date == '' ) {
        var today = new Date(new Date().getTime() - 24*60*60*1000) ;
        var yyyy= today.getFullYear();
        var mm  = (today.getMonth() + 1 ) >= 10 ? (today.getMonth()+1).toFixed(0) : ("0" + (today.getMonth()+1));
        var dd  = today.getDate()         <  10 ? ("0" + today.getDate() ) : today.getDate() ;
        current_date = yyyy + mm + dd ;
    }

    if (area == '' ) {
       area='daily-ts'
    }

    if (weather_element  == '' ) {
       weather_element='pra'
    }

    // start 
    var  template  = '';  
    if ( weather_element == 'pra'){
      set_precip_pics(current_date);   
    } else if ( weather_element == 'p200'){
      set_p500_pics(current_date);   
    } else if ( weather_element == 'p850'){
      set_p850_pics(current_date);   
    } else if ( weather_element == 'surf'){
      set_surf_pics(current_date);   
    }

    $('.area_block').hide();       
    $('.variable_select').show();              
    $('.variable_block').hide();
    
    time_init();    
    
    $('.week_block').toggle(weather_element == 'multi');
    
    //將選單的被選項目改成使用者點的那一個
    $('.variable_block').val(weather_element.toLowerCase());    
    $('.tseries_variable_block').val(weather_element.toLowerCase());      
    
    //將選單的區域被選項目改成使用者點的那一個
    $('.area_block').val(area);   
	
    //選單中的日期移到對應的日期
    var new_date_string = [current_date.substring(0, 4), current_date.substring(4, 6), current_date.substring(6, 8)].join('-');
    $('#date_selector').val(new_date_string);
    
    //get_current_date_8digits();
    $('#ui-datepicker-div').hide();    
    
    
})
