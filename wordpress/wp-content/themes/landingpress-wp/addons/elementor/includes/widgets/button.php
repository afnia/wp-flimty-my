<?php
namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor button widget.
 *
 * Elementor widget that displays a button with the ability to controll every
 * aspect of the button design.
 *
 * @since 1.0.0
 */
class Widget_Button extends Widget_Base {

	/**
	 * Get widget name.
	 *
	 * Retrieve button widget name.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'button';
	}

	/**
	 * Get widget title.
	 *
	 * Retrieve button widget title.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Button', 'elementor' );
	}

	/**
	 * Get widget icon.
	 *
	 * Retrieve button widget icon.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'eicon-button';
	}

	/**
	 * Get button sizes.
	 *
	 * Retrieve an array of button sizes for the button widget.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @return array An array containing button sizes.
	 */
	public static function get_button_sizes() {
		return [
			'xs' => __( 'Extra Small', 'elementor' ),
			'sm' => __( 'Small', 'elementor' ),
			'md' => __( 'Medium', 'elementor' ),
			'lg' => __( 'Large', 'elementor' ),
			'xl' => __( 'Extra Large', 'elementor' ),
		];
	}

	/**
	 * Register button widget controls.
	 *
	 * Adds different input fields to allow the user to change and customize the widget settings.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function _register_controls() {
		$this->start_controls_section(
			'section_button',
			[
				'label' => __( 'Button', 'elementor' ),
			]
		);

		$this->add_control(
			'button_type',
			[
				'label' => __( 'Type', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => '',
				'options' => [
					'' => __( 'Default', 'elementor' ),
					'info' => __( 'Info', 'elementor' ),
					'success' => __( 'Success', 'elementor' ),
					'warning' => __( 'Warning', 'elementor' ),
					'danger' => __( 'Danger', 'elementor' ),
				],
				'prefix_class' => 'elementor-button-',
			]
		);

		$this->add_control(
			'text',
			[
				'label' => __( 'Text', 'elementor' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Click me', 'elementor' ),
				'placeholder' => __( 'Click me', 'elementor' ),
			]
		);

		$this->add_control(
			'link',
			[
				'label' => __( 'Link', 'elementor' ),
				'type' => Controls_Manager::URL,
				'placeholder' => __( 'https://your-link.com', 'elementor' ),
				'default' => [
					'url' => '#',
				],
			]
		);

		$this->add_responsive_control(
			'align',
			[
				'label' => __( 'Alignment', 'elementor' ),
				'type' => Controls_Manager::CHOOSE,
				'options' => [
					'left'    => [
						'title' => __( 'Left', 'elementor' ),
						'icon' => 'fa fa-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'elementor' ),
						'icon' => 'fa fa-align-center',
					],
					'right' => [
						'title' => __( 'Right', 'elementor' ),
						'icon' => 'fa fa-align-right',
					],
					'justify' => [
						'title' => __( 'Justified', 'elementor' ),
						'icon' => 'fa fa-align-justify',
					],
				],
				'prefix_class' => 'elementor%s-align-',
				'default' => '',
			]
		);

		$this->add_control(
			'size',
			[
				'label' => __( 'Size', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'sm',
				'options' => self::get_button_sizes(),
			]
		);

		$this->add_control(
			'icon',
			[
				'label' => __( 'Icon', 'elementor' ),
				'type' => Controls_Manager::ICON,
				'label_block' => true,
				'default' => '',
			]
		);

		$this->add_control(
			'icon_align',
			[
				'label' => __( 'Icon Position', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'left',
				'options' => [
					'left' => __( 'Before', 'elementor' ),
					'right' => __( 'After', 'elementor' ),
				],
				'condition' => [
					'icon!' => '',
				],
			]
		);

		$this->add_control(
			'icon_indent',
			[
				'label' => __( 'Icon Spacing', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 50,
					],
				],
				'condition' => [
					'icon!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-button .elementor-align-icon-right' => 'margin-left: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .elementor-button .elementor-align-icon-left' => 'margin-right: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'view',
			[
				'label' => __( 'View', 'elementor' ),
				'type' => Controls_Manager::HIDDEN,
				'default' => 'traditional',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_sticky',
			[
				'label' => __( 'Sticky / Floating Button', 'landingpress-wp' ),
			]
		);

		$description = __( 'PERHATIAN:', 'landingpress-wp' );
		$description .= '<br><br>';
		$description .= __( 'Jika ingin menggunakan sticky / floating button, harap letakkan button ini di <strong style="color:#9b0a46;">SECTION PALING BAWAH</strong> untuk mendapatkan hasil terbaik.', 'landingpress-wp' );
		$description .= '<br><br>';
		$description .= __( 'Silahkan ke tab <strong style="color:#4054b2;">Advanced - Responsive</strong> jika ingin menyembunyikan sticky button di tampilan DESKTOP.', 'landingpress-wp' );

		$this->add_control(
			'floating_description',
			[
				'raw' => $description,
				'type' => Controls_Manager::RAW_HTML,
				'classes' => 'elementor-descriptor',
			]
		);

		$this->add_control(
			'floating',
			[
				'label' => __( 'Sticky / Floating', 'landingpress-wp' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => '',
				'label_on' => __( 'Yes', 'landingpress-wp' ),
				'label_off' => __( 'No', 'landingpress-wp' ),
				'return_value' => 'yes',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_fbpixel',
			[
				'label' => __( 'Facebook Pixel', 'landingpress-wp' ),
			]
		);

		$description = __( 'PERHATIAN:', 'landingpress-wp' );
		$description .= '<br><br>';
		$description .= __( 'Jika ingin menggunakan fitur ini, pastikan ada minimal satu <strong style="color:#9b0a46;">Facebook Pixel ID</strong> yang aktif.', 'landingpress-wp' );
		$description .= '<br><br>';
		$description .= __( 'Silahkan ke <strong style="color:#4054b2;">WordPress Dashboard - Appearance - Customize - LandingPress - Facebook Pixel</strong> untuk memasukkan Facebook Pixel ID.', 'landingpress-wp' );

		$this->add_control(
			'fbevent_description',
			[
				'raw' => $description,
				'type' => Controls_Manager::RAW_HTML,
				'classes' => 'elementor-descriptor',
			]
		);

		$this->add_control(
			'fbevent',
			[
				'label' => __( 'Onclick FB Event', 'landingpress-wp' ),
				'type' => Controls_Manager::SELECT,
				'default' => '',
				'options' => [
					'' => __( 'No Event', 'landingpress-wp' ),
					'ViewContent' => __( 'ViewContent', 'landingpress-wp' ),
					'AddToCart' => __( 'AddToCart', 'landingpress-wp' ),
					'InitiateCheckout' => __( 'InitiateCheckout', 'landingpress-wp' ),
					'AddCustomerInfo' => __( 'AddCustomerInfo', 'landingpress-wp' ),
					'AddPaymentInfo' => __( 'AddPaymentInfo', 'landingpress-wp' ),
					'Purchase' => __( 'Purchase', 'landingpress-wp' ),
					'AddToWishlist' => __( 'AddToWishlist', 'landingpress-wp' ),
					'Lead' => __( 'Lead', 'landingpress-wp' ),
					'CompleteRegistration' => __( 'CompleteRegistration', 'landingpress-wp' ),
					'Contact' => __( 'Contact', 'landingpress-wp' ),
					'CustomizeProduct' => __( 'CustomizeProduct', 'landingpress-wp' ),
					'Donate' => __( 'Donate', 'landingpress-wp' ),
					'FindLocation' => __( 'FindLocation', 'landingpress-wp' ),
					'Schedule' => __( 'Schedule', 'landingpress-wp' ),
					'Search' => __( 'Search', 'landingpress-wp' ),
					'StartTrial' => __( 'StartTrial', 'landingpress-wp' ),
					'Subscribe' => __( 'Subscribe', 'landingpress-wp' ),
					'custom' => __( 'Custom Event', 'landingpress-wp' ),
				],
			]
		);

		$this->add_control(
			'fbcustomevent_desc',
			[
				'raw' => __( 'Jika pakai FB Custom Event, jangan lupa untuk membuat Custom Conversion dengan menggunakan custom event tersebut di FB Ads Manager supaya bisa dimunculkan di FB Ads Report.', 'landingpress-wp' ),
				'type' => Controls_Manager::RAW_HTML,
				'classes' => 'elementor-descriptor',
				'condition' => [
					'fbevent' => 'custom',
				],
			]
		);

		$this->add_control(
			'fbcustomevent',
			[
				'label' => __( 'Custom Event Name', 'landingpress-wp' ),
				'type' => Controls_Manager::TEXT,
				'default' => '',
				'placeholder' => '',
				'condition' => [
					'fbevent' => 'custom',
				],
			]
		);

		$this->add_control(
			'fb_value_desc',
			[
				'raw' => __( 'TIDAK WAJIB! Silahkan masukkan harga produk sebagai value, jika Anda ingin menggunakan parameter value ini, misalnya untuk perhitungan ROAS di FB Ads Report.', 'landingpress-wp' ),
				'type' => Controls_Manager::RAW_HTML,
				'classes' => 'elementor-descriptor',
				'condition' => [
					'fbevent!' => '',
				],
			]
		);

		$this->add_control(
			'fb_value',
			[
				'label' => 'value',
				'type' => Controls_Manager::TEXT,
				'default' => '0',
				'placeholder' => '0',
				'condition' => [
					'fbevent!' => '',
				],
			]
		);

		$this->add_control(
			'fb_currency',
			[
				'label' => 'currency',
				'type' => Controls_Manager::SELECT,
				'default' => 'IDR',
				'options' => [
					'IDR' => 'IDR',
					'USD' => 'USD',
				],
				'condition' => [
					'fbevent!' => '',
				],
			]
		);

		$this->add_control(
			'fb_campaign_url',
			[
				'label' => 'campaign_url',
				'type' => Controls_Manager::TEXT,
				'default' => '',
				'placeholder' => get_post_field( 'post_name', get_the_ID() ),
				'condition' => [
					'fbevent!' => '',
				],
			]
		);

		$this->add_control(
			'fb_content_ids_desc',
			[
				'raw' => __( 'TIDAK WAJIB! Silahkan pakai parameter <strong><u>content_ids</u></strong> hanya jika Anda ingin menggunakan parameter ini untuk <strong><u>FB Product Catalog</u></strong> dan Anda sudah tahu cara setup Product Catalog di FB Ads Manager.', 'landingpress-wp' ),
				'type' => Controls_Manager::RAW_HTML,
				'classes' => 'elementor-descriptor',
				'condition' => [
					'fbevent!' => '',
				],
			]
		);

		$this->add_control(
			'fb_content_ids',
			[
				'label' => 'content_ids',
				'type' => Controls_Manager::TEXT,
				'default' => '',
				'placeholder' => '',
				'condition' => [
					'fbevent!' => '',
				],
			]
		);

		$this->add_control(
			'fb_content_type',
			[
				'label' => 'content_type',
				'type' => Controls_Manager::SELECT,
				'default' => 'product',
				'options' => [
					'product' => 'product',
					'product_group' => 'product_group',
				],
				'condition' => [
					'fbevent!' => '',
				],
			]
		);

		$this->add_control(
			'fb_content_name',
			[
				'label' => 'content_name',
				'type' => Controls_Manager::TEXT,
				'default' => '',
				'placeholder' => get_the_title(),
				'condition' => [
					'fbevent!' => '',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_adwords',
			[
				'label' => __( 'Google Ads (AdWords)', 'landingpress-wp' ),
			]
		);

		$description = __( 'PERHATIAN:', 'landingpress-wp' );
		$description .= '<br><br>';
		$description .= __( 'Jika ingin menggunakan fitur ini dengan Google Ads (AdWords) versi baru (beta), pastikan ada minimal satu <strong style="color:#9b0a46;">Google Ads (AdWords) Global Site Tag ID</strong> yang aktif.', 'landingpress-wp' );
		$description .= '<br><br>';
		$description .= __( 'Jika ingin menggunakan fitur ini dengan Google Ads (AdWords) versi lama, harap masukkan kode adwords conversion untuk "onclick button" di <strong style="color:#9b0a46;">Custom Footer Scripts</strong> di halaman ini.', 'landingpress-wp' );
		$description .= '<br><br>';
		$description .= __( 'Silahkan ke <strong style="color:#4054b2;">WordPress Dashboard - Appearance - Customize - LandingPress - Google Ads (AdWords)</strong> untuk memasukkan Google Ads (AdWords) Global Site Tag ID (versi baru) atau Google Ads (AdWords) Remarketing Tag (versi lama).', 'landingpress-wp' );

		$this->add_control(
			'grc_description',
			[
				'raw' => $description,
				'type' => Controls_Manager::RAW_HTML,
				'classes' => 'elementor-descriptor',
			]
		);

		$this->add_control(
			'grc',
			[
				'label' => __( 'Onclick Google Ads (AdWords) Conversion', 'landingpress-wp' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => '',
				'label_on' => __( 'Yes', 'landingpress-wp' ),
				'label_off' => __( 'No', 'landingpress-wp' ),
				'return_value' => 'yes',
			]
		);

		$this->add_control(
			'aw_send_to',
			[
				'label' => 'send_to',
				'type' => Controls_Manager::TEXT,
				'default' => '',
				'placeholder' => '',
				'condition' => [
					'grc!' => '',
				],
			]
		);

		$this->add_control(
			'aw_value_desc',
			[
				'raw' => __( 'TIDAK WAJIB! Silahkan masukkan harga produk sebagai value, jika Anda ingin menggunakan fitur lain di Google Ads, seperti Target ROAS misalnya.', 'landingpress-wp' ),
				'type' => Controls_Manager::RAW_HTML,
				'classes' => 'elementor-descriptor',
				'condition' => [
					'grc!' => '',
				],
			]
		);

		$this->add_control(
			'aw_value',
			[
				'label' => 'value',
				'type' => Controls_Manager::TEXT,
				'default' => '',
				'placeholder' => '0',
				'condition' => [
					'grc!' => '',
				],
			]
		);

		$this->add_control(
			'aw_currency',
			[
				'label' => 'currency',
				'type' => Controls_Manager::TEXT,
				'default' => '',
				'placeholder' => 'IDR',
				'condition' => [
					'grc!' => '',
				],
			]
		);

		$this->add_control(
			'aw_transaction_id',
			[
				'label' => 'transaction_id',
				'type' => Controls_Manager::TEXT,
				'default' => '',
				'placeholder' => '',
				'condition' => [
					'grc!' => '',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_sticky_style',
			[
				'label' => __( 'Sticky / Floating Button Container', 'landingpress-wp' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
					'floating!' => '',
				],
			]
		);

		$this->add_control(
			'floating_bg_color',
			[
				'label' => __( 'Background Color', 'elementor' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-button-sticky-yes' => 'background-color: {{VALUE}};',
				],
				'condition' => [
					'floating!' => '',
				],
			]
		);

		$this->add_control(
			'floating_padding',
			[
				'label' => __( 'Padding', 'elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .elementor-button-sticky-yes' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'condition' => [
					'floating!' => '',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style',
			[
				'label' => __( 'Button', 'elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'typography',
				'label' => __( 'Typography', 'elementor' ),
				'scheme' => Scheme_Typography::TYPOGRAPHY_4,
				'selector' => '{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button',
			]
		);

		$this->start_controls_tabs( 'tabs_button_style' );

		$this->start_controls_tab(
			'tab_button_normal',
			[
				'label' => __( 'Normal', 'elementor' ),
			]
		);

		$this->add_control(
			'button_text_color',
			[
				'label' => __( 'Text Color', 'elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '',
				'selectors' => [
					'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'background_color',
			[
				'label' => __( 'Background Color', 'elementor' ),
				'type' => Controls_Manager::COLOR,
				'scheme' => [
					'type' => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_4,
				],
				'selectors' => [
					'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_button_hover',
			[
				'label' => __( 'Hover', 'elementor' ),
			]
		);

		$this->add_control(
			'hover_color',
			[
				'label' => __( 'Text Color', 'elementor' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'button_background_hover_color',
			[
				'label' => __( 'Background Color', 'elementor' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'button_hover_border_color',
			[
				'label' => __( 'Border Color', 'elementor' ),
				'type' => Controls_Manager::COLOR,
				'condition' => [
					'border_border!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'hover_animation',
			[
				'label' => __( 'Hover Animation', 'elementor' ),
				'type' => Controls_Manager::HOVER_ANIMATION,
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'border',
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .elementor-button',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'border_radius',
			[
				'label' => __( 'Border Radius', 'elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'button_box_shadow',
				'selector' => '{{WRAPPER}} .elementor-button',
			]
		);

		$this->add_control(
			'text_padding',
			[
				'label' => __( 'Padding', 'elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render button widget output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings();

		$this->add_render_attribute( 'wrapper', 'class', 'elementor-button-wrapper' );

		if ( ! empty( $settings['link']['url'] ) ) {
			$this->add_render_attribute( 'button', 'href', $settings['link']['url'] );
			$this->add_render_attribute( 'button', 'class', 'elementor-button-link' );

			if ( $settings['link']['is_external'] ) {
				$this->add_render_attribute( 'button', 'target', '_blank' );
			}

			if ( $settings['link']['nofollow'] ) {
				$this->add_render_attribute( 'button', 'rel', 'nofollow' );
			}
		}

		$this->add_render_attribute( 'button', 'class', 'elementor-button' );

		if ( ! empty( $settings['size'] ) ) {
			$this->add_render_attribute( 'button', 'class', 'elementor-size-' . $settings['size'] );
		}

		if ( $settings['hover_animation'] ) {
			$this->add_render_attribute( 'button', 'class', 'elementor-animation-' . $settings['hover_animation'] );
		}

		if ( $settings['floating'] ) {
			$this->add_render_attribute( 'wrapper', 'class', 'elementor-button-sticky-' . $settings['floating'] );
		}

		if ( $settings['fbevent'] ) {
			if ( $settings['fbevent'] == 'custom' ) {
				if ( $settings['fbcustomevent'] ) {
					$this->add_render_attribute( 'button', 'data-fbcustomevent', $settings['fbcustomevent'] );
				}					
			}
			else {
				$this->add_render_attribute( 'button', 'data-fbevent', $settings['fbevent'] );
			}
			$fb_data = [];
			$fb_data['source'] = 'landingpress-'.str_replace('_', '-', $this->get_name());
			$fb_data['version'] = LANDINGPRESS_THEME_VERSION;
			$fb_data['version_elementor'] = LANDINGPRESS_ELEMENTOR_VERSION;
			if ( is_singular() ) {
				$fb_data['campaign_url'] = get_queried_object()->post_name;
				$fb_data['content_name'] = get_the_title();
			}
			if ( $settings['fbevent'] == 'Purchase' ) {
				$fb_data['value'] = '0';
				$fb_data['currency'] = 'IDR';
			}
			if ( trim($settings['fb_value']) ) {
				$fb_data['value'] = trim($settings['fb_value']);
			}
			else {
				$fb_data['value'] = '0.00';
			}
			if ( $settings['fb_currency'] ) {
				$fb_data['currency'] = trim($settings['fb_currency']);
			}
			else {
				$fb_data['currency'] = 'IDR';
			}
			if ( trim($settings['fb_content_name']) ) {
				$fb_data['content_name'] = trim($settings['fb_content_name']);
			}
			if ( trim($settings['fb_content_ids']) ) {
				$fb_data['content_ids'] = array_map( 'trim', explode( ',', $settings['fb_content_ids'] ) );
				if ( $settings['fb_content_type'] ) {
					$fb_data['content_type'] = trim($settings['fb_content_type']);
				}
				else {
					$fb_data['content_type'] = 'product';
				}
			}
			if ( trim($settings['fb_campaign_url']) ) {
				$fb_data['campaign_url'] = trim($settings['fb_campaign_url']);
			}
			$this->add_render_attribute( 'button', 'data-fbdata', json_encode( $fb_data ) );
		}

		if ( $settings['grc'] == 'yes' ) {
			$this->add_render_attribute( 'button', 'data-grc', $settings['grc'] );
			$aw_data = [];
			if ( $settings['aw_send_to'] ) {
				$aw_data['send_to'] = trim($settings['aw_send_to']);
			}
			if ( $settings['aw_value'] ) {
				$aw_data['value'] = trim($settings['aw_value']);
			}
			if ( $settings['aw_currency'] ) {
				$aw_data['currency'] = trim($settings['aw_currency']);
			}
			if ( $settings['aw_transaction_id'] ) {
				$aw_data['transaction_id'] = trim($settings['aw_transaction_id']);
			}
			$this->add_render_attribute( 'button', 'data-awdata', json_encode( $aw_data, JSON_UNESCAPED_SLASHES ) );
		}

		?>
		<div <?php echo $this->get_render_attribute_string( 'wrapper' ); ?>>
			<a <?php echo $this->get_render_attribute_string( 'button' ); ?>>
				<?php $this->render_text(); ?>
			</a>
		</div>
		<?php
	}

	/**
	 * Render button widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function _content_template() {}

	/**
	 * Render button text.
	 *
	 * Render button widget text.
	 *
	 * @since 1.5.0
	 * @access protected
	 */
	protected function render_text() {
		$settings = $this->get_settings();
		$this->add_render_attribute( 'content-wrapper', 'class', 'elementor-button-content-wrapper' );
		$this->add_render_attribute( 'icon-align', 'class', 'elementor-align-icon-' . $settings['icon_align'] );
		$this->add_render_attribute( 'icon-align', 'class', 'elementor-button-icon' );

		$this->add_render_attribute( 'text', 'class', 'elementor-button-text' );

		$this->add_inline_editing_attributes( 'text', 'none' );
		?>
		<span <?php echo $this->get_render_attribute_string( 'content-wrapper' ); ?>>
			<?php if ( ! empty( $settings['icon'] ) ) : ?>
			<span <?php echo $this->get_render_attribute_string( 'icon-align' ); ?>>
				<i class="<?php echo esc_attr( $settings['icon'] ); ?>" aria-hidden="true"></i>
			</span>
			<?php endif; ?>
			<span <?php echo $this->get_render_attribute_string( 'text' ); ?>><?php echo $settings['text']; ?></span>
		</span>
		<?php
	}
}
