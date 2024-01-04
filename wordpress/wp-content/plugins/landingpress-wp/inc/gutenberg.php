<?php 

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( class_exists( 'Classic_Editor' ) ) {
	return;
}

remove_action( 'try_gutenberg_panel', 'wp_try_gutenberg_panel' );

$landingpress_gutenberg = false;
if ( has_filter( 'replace_editor', 'gutenberg_init' ) ) {
	$landingpress_gutenberg = 'plugin';
}

global $wp_version;
if ( version_compare($wp_version, '5.0-beta', '>=') ) {
	$landingpress_gutenberg = 'default';
}

if ( 'default' === $landingpress_gutenberg ) {

	add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );

}
elseif ( 'plugin' === $landingpress_gutenberg ) {

	// gutenberg.php
	remove_action( 'admin_menu', 					'gutenberg_menu' );
	remove_action( 'admin_notices', 				'gutenberg_build_files_notice' );
	remove_action( 'admin_notices', 				'gutenberg_wordpress_version_notice' );
	remove_action( 'admin_init', 					'gutenberg_redirect_demo' );
	remove_action( 'admin_init', 					'gutenberg_add_edit_link_filters' );
	remove_action( 'admin_print_scripts-edit.php', 	'gutenberg_replace_default_add_new_button' );
	remove_filter( 'replace_editor', 				'gutenberg_init' );
	remove_filter( 'body_class', 					'gutenberg_add_responsive_body_class' );
	remove_filter( 'admin_url', 					'gutenberg_modify_add_new_button_url' );

	// lib/client-assets.php
	remove_action( 'wp_enqueue_scripts', 			'gutenberg_register_scripts_and_styles', 5 );
	remove_action( 'admin_enqueue_scripts', 		'gutenberg_register_scripts_and_styles', 5 );
	remove_action( 'wp_enqueue_scripts', 			'gutenberg_common_scripts_and_styles' );
	remove_action( 'admin_enqueue_scripts', 		'gutenberg_common_scripts_and_styles' );

	// lib/compat.php
	remove_filter( 'wp_refresh_nonces', 			'gutenberg_add_rest_nonce_to_heartbeat_response_headers' );
	remove_action( 'admin_enqueue_scripts', 		'gutenberg_check_if_classic_needs_warning_about_blocks' );

	// lib/rest-api.php
	remove_action( 'rest_api_init', 				'gutenberg_register_rest_routes' );
	remove_action( 'rest_api_init', 				'gutenberg_add_taxonomy_visibility_field' );
	remove_filter( 'rest_request_after_callbacks', 	'gutenberg_filter_oembed_result' );
	remove_filter( 'registered_post_type', 			'gutenberg_register_post_prepare_functions' );
	remove_filter( 'register_post_type_args', 		'gutenberg_filter_post_type_labels' );

	// lib/meta-box-partial-page.php
	remove_action( 'do_meta_boxes', 				'gutenberg_meta_box_save', 1000 );
	remove_action( 'submitpost_box', 				'gutenberg_intercept_meta_box_render' );
	remove_action( 'submitpage_box', 				'gutenberg_intercept_meta_box_render' );
	remove_action( 'edit_page_form', 				'gutenberg_intercept_meta_box_render' );
	remove_action( 'edit_form_advanced', 			'gutenberg_intercept_meta_box_render' );
	remove_filter( 'redirect_post_location', 		'gutenberg_meta_box_save_redirect' );
	remove_filter( 'filter_gutenberg_meta_boxes', 	'gutenberg_filter_meta_boxes' );

	// lib/register.php
	remove_action( 'edit_form_top', 				'gutenberg_remember_classic_editor_when_saving_posts' );
	remove_filter( 'redirect_post_location', 		'gutenberg_redirect_to_classic_editor_when_saving_posts' );
	remove_filter( 'get_edit_post_link', 			'gutenberg_revisions_link_to_editor' );
	remove_filter( 'wp_prepare_revision_for_js', 	'gutenberg_revisions_restore' );
	remove_filter( 'display_post_states', 			'gutenberg_add_gutenberg_post_state' );

	// lib/plugin-compat.php
	remove_filter( 'rest_pre_insert_post', 			'gutenberg_remove_wpcom_markdown_support' );
}
