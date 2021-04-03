$(document).ready(function(){
    
    let ww = $(window).outerWidth();
    
    /* 탑버튼 활성화 */
    $('.top_btn').click(function(){
        $('body, html').animate({ scrollTop: 0, }); 
    });
    
    /* 로그인 이모티콘 바꾸기 */

    $('.h_login').stop().hover(function(){
        $('.h_login>a>img').attr('src', 'images/common/hover_login.png');
    }, function(){
        $('.h_login>a>img').attr('src', 'images/common/login.png');
    });
    
    /* 히든 메뉴 길이 파라미터 */
    let main_menu_width = 0;
    let main_menu_height = 0;
    
    /* 버튼 회전 파라미터 */
    let lotate = function(class_1, class_2){
        $(class_1).transition({ rotateX:'90deg', }).fadeOut(300);
        $(class_2).transition({ rotateX:'180deg', }).fadeIn(300);
    }
    
    /* 버튼 횟수 및 닫힘버튼 회전 */
    let ham_cnt = 0;
    $('.close_icon').transition({ rotateX:'90deg', });
    
    /* 숨김메뉴 가로길이 */
    let hidden_width = function(){
        for(i = 0; i < $('.main_menu>li').length; i++){
            main_menu_width = $('.main_menu>li').eq(i).width();
            $('.sub_menu_list').eq(i).css({ width: main_menu_width + 65.778, });
        }
    }

    /* 숨김메뉴 세로길이 */
    let hidden_height = function(){
        for(i = 0; i < $('.main_menu>li').length; i++){
            main_menu_height = $('.main_menu>li').eq(i).height();
            $('.sub_menu_list').eq(i).css({ height: main_menu_height - 5, });
        }
    }
    
    /* .sub_menu_wrap .header_2*/
    let menu_event = function(class_name){
            if(ham_cnt == 0){
                $(class_name).slideDown(500);
                lotate('.ham_icon', '.close_icon');
                ham_cnt++;
            }else{
                $(class_name).slideUp(500);
                lotate('.close_icon', '.ham_icon');
                ham_cnt--;
            }
    };
    
    
    $(window).stop().resize(function(){
        ww = $(window).outerWidth();
//        if(ww >= 1220 ){
//            hidden_width();
//            $('.ham').click(function(){ menu_event('.sub_menu_wrap'); });
//            $('.header_2').css({ display: 'block', });
//        }else if(ww < 1220){
//            hidden_height();
//            $('.ham').click(function(){ menu_event('.header_2'); });
//            $('.header_2').css({ display: 'none', });
//        }
        jQuery.debounce(500,location.reload());
    });
    
    if(ww >= 1220 ){
        hidden_width();
        $('.ham').click(function(){ menu_event('.sub_menu_wrap'); });
    }else if(ww < 1220){
        hidden_height();
        $('.ham').click(function(){ menu_event('.header_2'); });
    }
    
    
    /* 스크롤에 따른 메뉴 활성화 */
    
    let wst = $(window).scrollTop();
    
    if(wst >= 100){
        $('.header_2').stop().animate({
                top: 0, 
        },0);
        
    }
    
    $(window).scroll(function(){
        wst = $('body, html').scrollTop();
        
        if(wst >= 100){
            $('.qu_menu').fadeIn(300);
            $('.header_2').stop().animate({
                top: 0, 
            },0);
        }else{
            $('.qu_menu').fadeOut(300);
            $('.header_2').stop().animate({
                top: 100 -wst, 
            },0);
        }
        
    });
    
    if(wst >= 100){
        $('.qu_menu').fadeIn(300);
        $('.header_2').stop().animate({
            top: 0, 
        },0);
    }else{
        $('.qu_menu').fadeOut(300);
        $('.header_2').stop().animate({
            top: 100 -wst, 
        },0);
    }
    
    /* 메뉴 밑줄 활성화 */
    
    $('.sub_menu_list').each(function(index){
        $(this).attr('data-menunum', index); 
    });
    
    $('.main_menu li').each(function(index){
        $(this).attr('data-menunum', index); 
    });
    let menu_num = 0;
    $('.sub_menu_list li').stop().hover(function(){
        menu_num = $(this).parent('.sub_menu_list').attr('data-menunum');
        if(menu_num == 6){
            $('.main_menu li').eq(menu_num)
                .attr('style', 'border-bottom:2px solid #fbb700');
        }else{
            $('.main_menu li').eq(menu_num)
                .attr('style', 'border-bottom:2px solid white');
        }
    },function(){
        $('.main_menu li').eq(menu_num).removeAttr('style', '');
    });
    
    
    
    /* sns 변경 */
    let data_sns = 0;
    
    let sns_con = function(data_sns){
        $('.sns_con').removeClass('sns_active');
        $('.sns_container').removeClass('sns_contain_active');
        $('.sns_con').eq(data_sns).addClass('sns_active');
        $('.sns_container').eq(data_sns).addClass('sns_contain_active');
    };
    
    $('.sns_kind').each(function(index){
        $(this).attr('data-sns', index); 
    }).click(function(){
        data_sns = $(this).attr('data-sns');
        $('.sns_kind').removeClass('sns_select');
        $(this).addClass('sns_select');
        sns_con(data_sns);
    });
    
    
    let qu_cnt = 0;
    
    /* 핸드폰 부분 - 퀵메뉴 나오기 */
    
    $('.qu_btn').html('◀').click(function(){
        if(qu_cnt == 0){
            $('.qu_menu').animate({ right: 0, });
            $('.qu_btn').html('▶');
            qu_cnt++;
        }else{
            $('.qu_menu').animate({ right: -60, });
            $('.qu_btn').html('◀');
            qu_cnt--;
        }
    });
    
    /* 스와이퍼 */
    
    const common_swiper = new Swiper('.common_swiper', {
        
        loop: true,
        autoplay: {
            delay: 3000,
        },

        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: 'true',
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    
    });
    
    const sns_container = new Swiper('.sns_container', {
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 50,
        allowTouchMove: true,
        
        breakpoints: {
            1219.9:{
                allowTouchMove: false,
            },
        },
        
    });
    
    
}); /* end */