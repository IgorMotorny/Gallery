jQuery(document).ready(function($) {
    var imgs = new Array(),
        n = 0,
        h = 200,
        vievport = $('.entry-content').innerWidth();
    vievport=vievport-scroll()-0.5;
	$('.attachment-full').each( function(){ 
                                    n++;
                                    imgs[n] = $(this).attr('src'); 
                                    $(this).addClass('image-'+n);
                                    $(this).removeAttr("height");
                                    $(this).removeAttr("width");
                                    $(this).css('height', h);
                                    //alert($(this).position());
                                    
                                 } );
    
     
    //alert(n);
    //alert("stop");
    $('.entry-content').waitForImages( function() {
        mosaic();       
    });
    $(window).resize( function() {
       $('.entry-content').waitForImages( function() {
        mosaic();       
    });
    });
    function mosaic()
    {
        $('.attachment-full').each( function(){ 
                                    $(this).removeProp('height');
                                    $(this).removeProp('width');
                                    $(this).removeAttr("height");
                                    $(this).removeAttr("width"); 
                                    $(this).css('height', h);                              
                                 } );
        vievport = $('.entry-content').innerWidth();
        //alert(vievport);
        //vievport=vievport-scroll()-0.5;
        //alert("ok");
        var start = 0,
            width=0,
            iwidth,
            k;
		for(var i=0; i<n; i++)
		{
			iwidth=$(".image-"+(i+1)).outerWidth();		//Ширина картинки
			width=width+iwidth;
			if(width>vievport)
			{	
				width=width-iwidth;
				k=vievport/width;
                //alert("width: " + width +"\nk=" + k);
                var testWidth=0;
				for (var j=start;j<i;j++)
				{
                    //alert("Images:\nWidth:" + $('.image-'+(j+1)).innerWidth()+"\nWidth*k: "+$('.image-'+(j+1)).innerWidth()*k);
            
                    $(".image-"+(j+1)).css('height', Math.floor($(".image-"+(j+1)).innerHeight()*k));
                    //$(".image-"+(j+1)).css('width', Math.floor($(".image-"+(j+1)).innerWidth()*k));
                    //alert( Math.floor($(".image-"+(j+1)).innerWidth()*k));
                    //alert(vievport-testWidth);
                    if(j==i-1)
                    {
                         $(".image-"+(j+1)).css('width', (vievport-testWidth));
                        
                    }
                    testWidth+= $(".image-"+(j+1)).outerWidth();
                }
				start=i;
				width=iwidth;
			 }
			if(i>n-1)
			{
				k=vievport/width;
                var testWidth=0;
				for (var j=start;j<i;j++)
				{
            
                    $(".image-"+(j+1)).css('height', Math.floor($(".image-"+(j+1)).innerHeight()*k));
                    //$(".image-"+(j+1)).css('width', Math.floor($(".image-"+(j+1)).innerWidth()*k));
                    if(j==i-1)
                    {
                         $(".image-"+(j+1)).css('width', (vievport-testWidth)); 
                    }
                    testWidth+= $(".image-"+(j+1)).outerWidth();
                }
			}
		}
    }

$(".figure").click(function()		
	   {
		  function position()							//Выравниваем картинки по центру
            {		
                var bheight=$(".bigbg").height();
                var iheight=$(".bigimg").height();
                var margin=(bheight-iheight)/2;
                $(".bigimg").css('margin-top',margin);
            }
	
	
		      k=$(this).find(".attachment-full").attr('src'); //Находим нужную картинку в массиве
		      for(var i=0; i<n;i++)
                {
                    if(k==imgs[i]){break;}
                }
                $("body").append('<div class="bigbg" ><img class="bigimg" src='+imgs[i]+'><div class="left"><i class="fa fa-chevron-left fa-3x"></i></div><div class="exit"><i class="fa fa-times fa-3x"></i></div><div class="right"><i class="fa fa-chevron-right fa-3x"></i></div></div>');		
            position();
            $(".bigimg").click(function()		//Листаем картинки
            {		
                i++;
                if (i==n) {i=0;}
                $(this).attr('src',imgs[i])
                position();
            });
	
            $(".exit").click(function(){$(".bigbg").remove();});	//Выход из просмотра
           
            $(".left").click(function(){							//Листаем влево
                i--;
                if (i==-1) {i=n;}
                $(".bigimg").attr('src',imgs[i]);
                position();
	        });
           
            $(".right").click(function(){								//Листаем вправо
                i++;
                if (i==n) {i=0;}
                $(".bigimg").attr('src',imgs[i]);
                position();
            });
       });

   
    function scroll()
    {
        var div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width =  '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        return scrollWidth;
    }
    
});



