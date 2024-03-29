<?php
namespace Elementor\TemplateLibrary;

use Elementor\Api;
use Elementor\PageSettings\Page;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Source_Remote extends Source_Base {

	/**
	 * @since 1.0.0
	 * @access public
	*/
	public function get_id() {
		return 'remote';
	}

	/**
	 * @since 1.0.0
	 * @access public
	*/
	public function get_title() {
		return __( 'Remote', 'elementor' );
	}

	/**
	 * @since 1.0.0
	 * @access public
	*/
	public function register_data() {}

	/**
	 * @since 1.0.0
	 * @access public
	*/
	public function get_items( $args = [] ) {
		$templates_data = Api::get_templates_data();

		$templates = [];
		$templates_pro = [];

		if ( ! empty( $templates_data ) ) {
			foreach ( $templates_data as $template_data ) {
				if ( '1' !== $template_data['is_pro'] ) {
					$templates[] = $this->get_item( $template_data );
				}
				else {
					$templates_pro[] = $this->get_item( $template_data );
				}
			}
		}

		$templates = array_merge( $templates, $templates_pro );

		if ( ! empty( $args ) ) {
			$templates = wp_list_filter( $templates, $args );
		}

		return $templates;
	}

	/**
	 * @since 1.0.0
	 * @access public
	 * @param array $template_data
	 *
	 * @return array
	 */
	public function get_item( $template_data ) {
		$favorite_templates = $this->get_user_meta( 'favorites' );

		return [
			'template_id' => $template_data['id'],
			'source' => $this->get_id(),
			'title' => $template_data['title'],
			'thumbnail' => $template_data['thumbnail'],
			'date' => $template_data['tmpl_created'],
			'author' => $template_data['author'],
			'tags' => json_decode( $template_data['tags'] ),
			'isPro' => ( '1' === $template_data['is_pro'] ),
			'popularityIndex' => (int) $template_data['popularity_index'],
			'trendIndex' => (int) $template_data['trend_index'],
			'hasPageSettings' => ( '1' === $template_data['has_page_settings'] ),
			'url' => $template_data['url'],
			'favorite' => ! empty( $favorite_templates[ $template_data['id'] ] ),
		];
	}

	/**
	 * @since 1.0.0
	 * @access public
	*/
	public function save_item( $template_data ) {
		return false;
	}

	/**
	 * @since 1.0.0
	 * @access public
	*/
	public function update_item( $new_data ) {
		return false;
	}

	/**
	 * @since 1.0.0
	 * @access public
	*/
	public function delete_template( $template_id ) {
		return false;
	}

	/**
	 * @since 1.0.0
	 * @access public
	*/
	public function export_template( $template_id ) {
		return false;
	}

	/**
	 * @since 1.5.0
	 * @access public
	*/
	public function get_data( array $args, $context = 'display' ) {
		$data = Api::get_template_content( $args['template_id'] );

		if ( is_wp_error( $data ) ) {
			return $data;
		}

		// TODO: since 1.5.0 to content container named `content` instead of `data`.
		if ( ! empty( $data['data'] ) ) {
			$data['content'] = $data['data'];
			unset( $data['data'] );
		}

		$data['content'] = $this->replace_elements_ids( $data['content'] );
		$data['content'] = $this->process_export_import_content( $data['content'], 'on_import' );

		if ( ! empty( $args['page_settings'] ) && ! empty( $data['page_settings'] ) ) {
			$page = new Page( [
				'settings' => $data['page_settings'],
			] );

			$page_settings_data = $this->process_element_export_import_content( $page, 'on_import' );
			$data['page_settings'] = $page_settings_data['settings'];
		}

		return $data;
	}
}
