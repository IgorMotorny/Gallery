<?php
/*
Plugin Name: gallery
Plugin URI: http://your-plugin-url
Description:WordPress Gallery Plugin
Version: 1.0.0
Author: Igor Motornyi
Author URI: http://vk.com/id79244470
*/
remove_shortcode('gallery');
add_shortcode('gallery', 'parse_gallery_shortcode');
add_action( 'wp_enqueue_scripts', 'enqueue_font_awesome' );
function enqueue_font_awesome() {
 wp_enqueue_style( 'font-awesome', '//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css' );
}
function register_style()
{
    // Регистрация стилей для плагина:
    wp_register_style( 'gallery', plugins_url( '/css/style.css', __FILE__ ), array(), '1.0', 'all' );
    wp_enqueue_style( 'gallery' );
    wp_register_style( 'font-awesome', plugins_url( '/css/font-awesome.css', __FILE__ ), array(), '1.0', 'all' );
    wp_enqueue_style( 'font-awesome' );
}
function register_js() 
{     
    if (!is_admin()) 
    {
        // Регистрируем наши скрипты         
        wp_register_script( 'jquery', plugins_url( '/js/jquery-2.1.4.min.js', __FILE__ ), false, null, true );  
        wp_register_script( 'images', plugins_url( '/js/images.js', __FILE__ ), false, null, true );  
        wp_register_script( 'gallery', plugins_url( '/js/gallery.js', __FILE__ ), false, null, true );  
        // подключает скрипт, если он не был подключён ранее         
        wp_enqueue_script('jquery');
        wp_enqueue_script('images');
        wp_enqueue_script('gallery');
    } 
} 
add_action('init', 'register_js');
add_action( 'wp_enqueue_scripts', 'register_style' );



function parse_gallery_shortcode($atts) {
 
    global $post;
 
    if ( ! empty( $atts['ids'] ) ) {
        // 'ids' is explicitly ordered, unless you specify otherwise.
        if ( empty( $atts['orderby'] ) )
            $atts['orderby'] = 'post__in';
        $atts['include'] = $atts['ids'];
    }
 
    extract(shortcode_atts(array(
        'order'      => 'ASC',
		'orderby'    => 'menu_order ID',
        'include' => '',
        'id' => $post->ID,
        'itemtag'    => 'figure',
		'icontag'    => 'div',
		'captiontag' => 'figcaption',
        'columns' => 3,
        'size' => 'full',
        'link' => ''
    ), $atts));
 
 
    $args = array(
        'post_type' => 'attachment',
        'post_status' => 'inherit',
        'post_mime_type' => 'image',
        'orderby' => $orderby
    );
 
    if ( !empty($include) )
        $args['include'] = $include;
    else {
        $args['post_parent'] = $id;
        $args['numberposts'] = -1;
    }
 
    $images = get_posts($args);
     
    foreach ( $images as $image ) {     
        $caption = $image->post_excerpt;
 
        $description = $image->post_content;
        if($description == '') $description = $image->post_title;
 
        $image_alt = get_post_meta($image->ID,'_wp_attachment_image_alt', true);
       
        
         $output.="<{$itemtag} class='figure'><{$icontag} >" . wp_get_attachment_image($image->ID, $size) . "</{$icontag}><{$captiontag} class='figcaption' >
				" . wptexturize($image->post_excerpt) . "
				</{$captiontag}></{$itemtag}>";
            
    }
   return $output;
}
?>