<?php
namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>
<script type="text/template" id="tmpl-elementor-template-library-header">
	<div id="elementor-template-library-header-logo-area"></div>
	<div id="elementor-template-library-header-menu-area"></div>
	<div id="elementor-template-library-header-items-area">
		<div id="elementor-template-library-header-close-modal" class="elementor-template-library-header-item">
			<i class="eicon-close" aria-hidden="true" title="<?php esc_attr_e( 'Close', 'elementor' ); ?>"></i>
			<span class="elementor-screen-only"><?php esc_html_e( 'Close', 'elementor' ); ?></span>
		</div>
		<div id="elementor-template-library-header-tools"></div>
	</div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-header-logo">
	<span id="elementor-template-library-header-logo-icon-wrapper">
		<i class="eicon-elementor"></i>
	</span>
	<span><?php echo __( 'Library', 'elementor' ); ?></span>
</script>

<script type="text/template" id="tmpl-elementor-template-library-header-actions">
	<div id="elementor-template-library-header-import" class="elementor-template-library-header-item">
		<i class="eicon-upload-circle-o" aria-hidden="true" title="<?php esc_attr_e( 'Import Template', 'elementor' ); ?>"></i>
		<span class="elementor-screen-only"><?php esc_html_e( 'Import Template', 'elementor' ); ?></span>
	</div>
	<div id="elementor-template-library-header-sync" class="elementor-template-library-header-item">
		<i class="eicon-sync" aria-hidden="true" title="<?php esc_attr_e( 'Sync Library', 'elementor' ); ?>"></i>
		<span class="elementor-screen-only"><?php esc_html_e( 'Sync Library', 'elementor' ); ?></span>
	</div>
	<div id="elementor-template-library-header-save" class="elementor-template-library-header-item">
		<i class="eicon-save-o" aria-hidden="true" title="<?php esc_attr_e( 'Save', 'elementor' ); ?>"></i>
		<span class="elementor-screen-only"><?php esc_html_e( 'Save', 'elementor' ); ?></span>
	</div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-header-menu">
	<div id="elementor-template-library-menu-pre-made-templates" class="elementor-template-library-menu-item" data-template-source="remote"><?php echo __( 'Elementor Templates', 'elementor' ); ?></div>
	<div id="elementor-template-library-menu-landingpresstemplates" class="elementor-template-library-menu-item" data-template-source="landingpresstemplates"><?php echo __( 'LandingPress Templates', 'elementor' ); ?></div>
	<div id="elementor-template-library-menu-landingpresssections" class="elementor-template-library-menu-item" data-template-source="landingpresssections"><?php echo __( 'LandingPress Sections', 'elementor' ); ?></div>
	<div id="elementor-template-library-menu-my-templates" class="elementor-template-library-menu-item" data-template-source="local"><?php echo __( 'My Templates', 'elementor' ); ?></div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-header-preview">
	<div id="elementor-template-library-header-preview-insert-wrapper" class="elementor-template-library-header-item">
		{{{ elementor.templates.getLayout().getTemplateActionButton( obj ) }}}
	</div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-header-back">
	<i class="eicon-" aria-hidden="true"></i>
	<span><?php echo __( 'Back to Library', 'elementor' ); ?></span>
</script>

<script type="text/template" id="tmpl-elementor-template-library-loading">
	<div class="elementor-loader-wrapper">
		<div class="elementor-loader">
			<div class="elementor-loader-box"></div>
			<div class="elementor-loader-box"></div>
			<div class="elementor-loader-box"></div>
			<div class="elementor-loader-box"></div>
		</div>
		<div class="elementor-loading-title"><?php echo __( 'Loading', 'elementor' ); ?></div>
	</div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-templates">
	<#
		var activeSource = elementor.templates.getFilter('source');
	#>
	<div id="elementor-template-library-toolbar">
		<# if ( 'remote' === activeSource ) { #>
			<div id="elementor-template-library-filter-toolbar-remote" class="elementor-template-library-filter-toolbar">
				<div id="elementor-template-library-order">
					<input type="radio" id="elementor-template-library-order-new" class="elementor-template-library-order-input" name="elementor-template-library-order" value="date">
					<label for="elementor-template-library-order-new" class="elementor-template-library-order-label"><?php echo __( 'New', 'elementor' ); ?></label>
					<input type="radio" id="elementor-template-library-order-trend" class="elementor-template-library-order-input" name="elementor-template-library-order" value="trendIndex">
					<label for="elementor-template-library-order-trend" class="elementor-template-library-order-label"><?php echo __( 'Trend', 'elementor' ); ?></label>
					<input type="radio" id="elementor-template-library-order-popular" class="elementor-template-library-order-input" name="elementor-template-library-order" value="popularityIndex">
					<label for="elementor-template-library-order-popular" class="elementor-template-library-order-label"><?php echo __( 'Popular', 'elementor' ); ?></label>
				</div>
				<div id="elementor-template-library-my-favorites">
					<input id="elementor-template-library-filter-my-favorites" type="checkbox">
					<label id="elementor-template-library-filter-my-favorites-label" for="elementor-template-library-filter-my-favorites">
						<i class="fa" aria-hidden="true"></i>
						<?php echo __( 'My Favorites', 'elementor' ); ?>
					</label>
				</div>
			</div>
		<# } else if ( 'landingpresstemplates' === activeSource ) { #>
			<div id="elementor-template-library-filter-toolbar-landingpresstemplates" class="elementor-template-library-filter-toolbar">
				<div id="elementor-template-library-my-favorites">
					<input id="elementor-template-library-filter-my-favorites" type="checkbox">
					<label id="elementor-template-library-filter-my-favorites-label" for="elementor-template-library-filter-my-favorites">
						<i class="fa" aria-hidden="true"></i>
						<?php echo __( 'My Favorites', 'elementor' ); ?>
					</label>
				</div>
			</div>
		<# } else if ( 'landingpresssections' === activeSource ) { #>
			<div id="elementor-template-library-filter-toolbar-landingpresssections" class="elementor-template-library-filter-toolbar">
				<div id="elementor-template-library-my-favorites">
					<input id="elementor-template-library-filter-my-favorites" type="checkbox">
					<label id="elementor-template-library-filter-my-favorites-label" for="elementor-template-library-filter-my-favorites">
						<i class="fa" aria-hidden="true"></i>
						<?php echo __( 'My Favorites', 'elementor' ); ?>
					</label>
				</div>
			</div>
		<# } else { #>
			<div id="elementor-template-library-filter-toolbar-local" class="elementor-template-library-filter-toolbar"></div>
		<# } #>
		<div id="elementor-template-library-filter-text-wrapper">
			<input id="elementor-template-library-filter-text" placeholder="<?php echo __( 'Search', 'elementor' ); ?>">
		</div>
	</div>
	<# if ( 'local' === activeSource ) { #>
		<div id="elementor-template-library-order-toolbar-local">
			<div class="elementor-template-library-local-column-1">
				<input type="radio" id="elementor-template-library-order-local-title" class="elementor-template-library-order-input" name="elementor-template-library-order-local" value="title" data-default-ordering-direction="asc">
				<label for="elementor-template-library-order-local-title" class="elementor-template-library-order-label"><?php echo __( 'Name', 'elementor' ); ?></label>
			</div>
			<div class="elementor-template-library-local-column-2">
				<input type="radio" id="elementor-template-library-order-local-type" class="elementor-template-library-order-input" name="elementor-template-library-order-local" value="type" data-default-ordering-direction="asc">
				<label for="elementor-template-library-order-local-type" class="elementor-template-library-order-label"><?php echo __( 'Type', 'elementor' ); ?></label>
			</div>
			<div class="elementor-template-library-local-column-3">
				<input type="radio" id="elementor-template-library-order-local-author" class="elementor-template-library-order-input" name="elementor-template-library-order-local" value="author" data-default-ordering-direction="asc">
				<label for="elementor-template-library-order-local-author" class="elementor-template-library-order-label"><?php echo __( 'Created By', 'elementor' ); ?></label>
			</div>
			<div class="elementor-template-library-local-column-4">
				<input type="radio" id="elementor-template-library-order-local-date" class="elementor-template-library-order-input" name="elementor-template-library-order-local" value="date">
				<label for="elementor-template-library-order-local-date" class="elementor-template-library-order-label"><?php echo __( 'Creation Date', 'elementor' ); ?></label>
			</div>
			<div class="elementor-template-library-local-column-5">
				<div class="elementor-template-library-order-label"><?php echo __( 'Actions', 'elementor' ); ?></div>
			</div>
		</div>
	<# } #>
	<div id="elementor-template-library-templates-container"></div>
	<# if ( 'remote' === activeSource ) { #>
		<div id="elementor-template-library-footer-banner">
			<i class="eicon-nerd" aria-hidden="true"></i>
			<div class="elementor-excerpt"><?php echo __( 'Stay tuned! More awesome templates coming real soon.', 'elementor' ); ?></div>
		</div>
	<# } #>
</script>

<script type="text/template" id="tmpl-elementor-template-library-template-remote">
	<div class="elementor-template-library-template-body">
		<div class="elementor-template-library-template-screenshot" style="background-image: url({{ thumbnail }});"></div>
		<div class="elementor-template-library-template-controls">
			<div class="elementor-template-library-template-preview">
				<i class="fa fa-search-plus" aria-hidden="true"></i>
			</div>
			{{{ elementor.templates.getLayout().getTemplateActionButton( obj ) }}}
		</div>
	</div>
	<div class="elementor-template-library-template-footer">
		<div class="elementor-template-library-template-name">{{{ title }}}</div>
		<div class="elementor-template-library-favorite">
			<input id="elementor-template-library-template-{{ template_id }}-favorite-input" class="elementor-template-library-template-favorite-input" type="checkbox"{{ favorite ? " checked" : "" }}>
			<label for="elementor-template-library-template-{{ template_id }}-favorite-input" class="elementor-template-library-template-favorite-label">
				<i class="fa fa-heart-o" aria-hidden="true"></i>
				<span class="elementor-screen-only"><?php esc_html_e( 'Favorite', 'elementor' ); ?></span>
			</label>
		</div>
	</div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-template-landingpresstemplates">
	<div class="elementor-template-library-template-body">
		<div class="elementor-template-library-template-screenshot" style="background-image: url({{ thumbnail }});"></div>
		<div class="elementor-template-library-template-controls">
			<div class="elementor-template-library-template-preview">
				<i class="fa fa-search-plus" aria-hidden="true"></i>
			</div>
			{{{ elementor.templates.getLayout().getTemplateActionButton( obj ) }}}
		</div>
	</div>
	<div class="elementor-template-library-template-footer">
		<div class="elementor-template-library-template-name">{{{ title }}}</div>
		<div class="elementor-template-library-favorite">
			<input id="elementor-template-library-template-{{ template_id }}-favorite-input" class="elementor-template-library-template-favorite-input" type="checkbox"{{ favorite ? " checked" : "" }}>
			<label for="elementor-template-library-template-{{ template_id }}-favorite-input" class="elementor-template-library-template-favorite-label">
				<i class="fa fa-heart-o" aria-hidden="true"></i>
				<span class="elementor-screen-only"><?php esc_html_e( 'Favorite', 'elementor' ); ?></span>
			</label>
		</div>
	</div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-template-landingpresssections">
	<div class="elementor-template-library-template-body">
		<div class="elementor-template-library-template-screenshot" style="background-image: url({{ thumbnail }});"></div>
		<div class="elementor-template-library-template-controls">
			<div class="elementor-template-library-template-preview">
				<i class="fa fa-search-plus" aria-hidden="true"></i>
			</div>
			{{{ elementor.templates.getLayout().getTemplateActionButton( obj ) }}}
		</div>
	</div>
	<div class="elementor-template-library-template-footer">
		<div class="elementor-template-library-template-name">{{{ title }}}</div>
		<div class="elementor-template-library-favorite">
			<input id="elementor-template-library-template-{{ template_id }}-favorite-input" class="elementor-template-library-template-favorite-input" type="checkbox"{{ favorite ? " checked" : "" }}>
			<label for="elementor-template-library-template-{{ template_id }}-favorite-input" class="elementor-template-library-template-favorite-label">
				<i class="fa fa-heart-o" aria-hidden="true"></i>
				<span class="elementor-screen-only"><?php esc_html_e( 'Favorite', 'elementor' ); ?></span>
			</label>
		</div>
	</div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-template-local">
	<div class="elementor-template-library-template-name elementor-template-library-local-column-1">{{{ title }}}</div>
	<div class="elementor-template-library-template-meta elementor-template-library-template-type elementor-template-library-local-column-2">{{{ elementor.translate( type ) }}}</div>
	<div class="elementor-template-library-template-meta elementor-template-library-template-author elementor-template-library-local-column-3">{{{ author }}}</div>
	<div class="elementor-template-library-template-meta elementor-template-library-template-date elementor-template-library-local-column-4">{{{ human_date }}}</div>
	<div class="elementor-template-library-template-controls elementor-template-library-local-column-5">
		<div class="elementor-template-library-template-preview">
			<i class="fa fa-eye" aria-hidden="true"></i>
			<span class="elementor-template-library-template-control-title"><?php echo __( 'Preview', 'elementor' ); ?></span>
		</div>
		<button class="elementor-template-library-template-action elementor-template-library-template-insert elementor-button elementor-button-success">
			<i class="eicon-file-download" aria-hidden="true"></i>
			<span class="elementor-button-title"><?php echo __( 'Insert', 'elementor' ); ?></span>
		</button>
		<div class="elementor-template-library-template-more-toggle">
			<i class="eicon-ellipsis-h" aria-hidden="true"></i>
		</div>
		<div class="elementor-template-library-template-more">
			<div class="elementor-template-library-template-delete">
				<i class="fa fa-trash-o" aria-hidden="true"></i>
				<span class="elementor-template-library-template-control-title"><?php echo __( 'Delete', 'elementor' ); ?></span>
			</div>
			<div class="elementor-template-library-template-export">
				<a href="{{ export_link }}">
					<i class="fa fa-sign-out" aria-hidden="true"></i>
					<span class="elementor-template-library-template-control-title"><?php echo __( 'Export', 'elementor' ); ?></span>
				</a>
			</div>
		</div>
	</div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-insert-button">
	<button class="elementor-template-library-template-action elementor-template-library-template-insert elementor-button elementor-button-success">
		<i class="eicon-file-download" aria-hidden="true"></i>
		<span class="elementor-button-title"><?php echo __( 'Insert', 'elementor' ); ?></span>
	</button>
</script>

<script type="text/template" id="tmpl-elementor-template-library-get-pro-button">
	<a href="<?php echo Utils::get_pro_link( admin_url( 'admin.php?page=go_elementor_pro&utm_source=panel-library&utm_campaign=gopro&utm_medium=wp-dash' ) ); ?>" target="_blank">
		<button class="elementor-template-library-template-action elementor-button elementor-button-go-pro">
			<i class="fa fa-external-link-square" aria-hidden="true"></i>
			<span class="elementor-button-title"><?php echo __( 'Go Pro', 'elementor' ); ?></span>
		</button>
	</a>
</script>

<script type="text/template" id="tmpl-elementor-template-library-save-template">
	<div class="elementor-template-library-blank-icon">
		<i class="eicon-library-save" aria-hidden="true"></i>
	</div>
	<div class="elementor-template-library-blank-title">{{{ title }}}</div>
	<div class="elementor-template-library-blank-message">{{{ description }}}</div>
	<form id="elementor-template-library-save-template-form">
		<input type="hidden" name="post_id" value="<?php echo get_the_ID(); ?>">
		<input id="elementor-template-library-save-template-name" name="title" placeholder="<?php echo __( 'Enter Template Name', 'elementor' ); ?>" required>
		<button id="elementor-template-library-save-template-submit" class="elementor-button elementor-button-success">
			<span class="elementor-state-icon">
				<i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
			</span>
			<?php echo __( 'Save', 'elementor' ); ?>
		</button>
	</form>
	<div class="elementor-template-library-blank-footer">
		<?php echo __( 'Want to learn more about the Elementor library?', 'elementor' ); ?>
		<a class="elementor-template-library-blank-footer-link" href="https://go.elementor.com/docs-library/" target="_blank"><?php echo __( 'Click here', 'elementor' ); ?></a>
	</div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-import">
	<form id="elementor-template-library-import-form">
		<div class="elementor-template-library-blank-icon">
			<i class="eicon-library-upload" aria-hidden="true"></i>
		</div>
		<div class="elementor-template-library-blank-title"><?php echo __( 'Import Template to Your Library', 'elementor' ); ?></div>
		<div class="elementor-template-library-blank-message"><?php echo __( 'Drag & drop your .JSON or .zip template file', 'elementor' ); ?></div>
		<div id="elementor-template-library-import-form-or"><?php echo __( 'or', 'elementor' ); ?></div>
		<label for="elementor-template-library-import-form-input" id="elementor-template-library-import-form-label" class="elementor-button elementor-button-success"><?php echo __( 'Select File', 'elementor' ); ?></label>
		<input id="elementor-template-library-import-form-input" type="file" name="file" accept=".json,.zip" required/>
		<div class="elementor-template-library-blank-footer">
			<?php echo __( 'Want to learn more about the Elementor library?', 'elementor' ); ?>
			<a class="elementor-template-library-blank-footer-link" href="https://go.elementor.com/docs-library/" target="_blank"><?php echo __( 'Click here', 'elementor' ); ?></a>
		</div>
	</form>
</script>

<script type="text/template" id="tmpl-elementor-template-library-templates-empty">
	<div class="elementor-template-library-blank-icon">
		<i class="eicon-nerd" aria-hidden="true"></i>
	</div>
	<div class="elementor-template-library-blank-title"></div>
	<div class="elementor-template-library-blank-message"></div>
	<div class="elementor-template-library-blank-footer">
		<?php echo __( 'Want to learn more about the Elementor library?', 'elementor' ); ?>
		<a class="elementor-template-library-blank-footer-link" href="https://go.elementor.com/docs-library/" target="_blank"><?php echo __( 'Click here', 'elementor' ); ?></a>
	</div>
</script>

<script type="text/template" id="tmpl-elementor-template-library-preview">
	<iframe></iframe>
</script>
