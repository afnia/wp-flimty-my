<?php
define('WP_MEMORY_LIMIT', '512M');
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress_flimty_my_dev');

/** MySQL database username */
define('DB_USER', 'flimty_my');

/** MySQL database password */
define('DB_PASSWORD', 'GF$edcFDWYEYG235');

/** MySQL hostname */
define('DB_HOST', '88.99.56.36');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define( 'WP_HOME', 'http://88.99.56.36:8082' );
define( 'WP_SITEURL', 'http://88.99.56.36:8082' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'u-UBlkR*,/m_Av},]t0k#yuk/?7m ./zeQMdi1q*3./~`g*WpOxXt4_Weq!RPDQC');
define('SECURE_AUTH_KEY',  'ZLd2l[G2~lf%8@&i->oS7Qh3K3_xu-ajDo?33( l#DvAkQVd:brqR3U}4f4.XZW~');
define('LOGGED_IN_KEY',    'y(cvFSup1>}lHj.0q&)}1S@mV|J$0cU&`w^Z(@RZBN33DmP.n50r#^KISHp(5>z$');
define('NONCE_KEY',        'I].PPNNB::%32ZS@7;Z:H1`;lou)!)&d;TkpNS$9@ENGm-D#-)ZCF,pknZGp!P,~');
define('AUTH_SALT',        '/PIssi8D7IYbvYL+=H`9{m%8F)1s~>R84eN.]}tO5ftJsT* ]I`+liFe*nBn4v/>');
define('SECURE_AUTH_SALT', 'sq.eCQS0EAmTmrr]ygm8$0K/wrnA#=Gfbll:s6Q?(kAU*5V,:=6=@c>[>Gf}2w=B');
define('LOGGED_IN_SALT',   '-e$rl+I8IFder*PIkKf02L MjS]Ms{/&-^[( -ym:O6m}2QCt]YWQ~+X&d[JM<-d');
define('NONCE_SALT',       'Z1U jJs;,X]N-wf.7IkOQs/+ZnFsM$|sZ#U+<SwYWZ;`sPDW}7d;C8jq;-SxOlhG');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define('WP_DEBUG', true);
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
	define('ABSPATH', __DIR__ . '/');
}
define('WP_CACHE', false);
/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
