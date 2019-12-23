<?php
/*
Plugin Name: Human Body Back
Version: 1.0
Author: Envidea
*/

class ANATOMYC_BACK {

	public function __construct(){
		$this->constant();
		$this->options = get_option( 'anatomy' );
		add_action( 'admin_menu', array($this, 'anatomy_options_page') );
	 	add_action( 'admin_footer', array( $this,'add_js_to_wp_footer') );
	 	add_action( 'wp_footer', array($this,'add_span_tag') );
		add_action( 'admin_enqueue_scripts', array($this,'init_admin_script') );
		add_shortcode( 'anatomy_back', array($this, 'anatomy') );
		$this->default = array(
			'borderclr' => '#ff8080',
		);
		foreach (array(
			'HEAD', 'NECK', 'BACK', 'LOIN', 'BUTTOCKS', 'SHOULDER', 'SHOULDER', 'ARM', 'ARM', 'ELBOW', 'ELBOW', 'FOREARM', 'FOREARM', 'WRIST', 'WRIST', 'BACK OF THE HAND', 
			'BACK OF THE HAND', 'HAMSTRING', 'HAMSTRING', 'BACK OF THE KNEE', 'BACK OF THE KNEE', 'CALF', 'CALF', 'ANKLE', 'ANKLE', 'SOLE', 'SOLE', 'FOOT', 'FOOT'
		) as $k=>$area) {
			$this->default['url_'.($k+1)] = '';
			$this->default['turl_'.($k+1)] = '_self';
			$this->default['info_'.($k+1)] = $area;
			$this->default['enbl_'.($k+1)] = 1;
		}
		if(isset($_POST['anatomy']) && !isset($_POST['preview_anatomy'])){
			update_option('anatomy', array_map('stripslashes_deep', $_POST));
			$this->options = array_map('stripslashes_deep', $_POST);
		}
		if(isset($_POST['anatomy']) && isset($_POST['restore_default'])){
			update_option('anatomy', $this->default);
			$this->options = $this->default;
		}
		if(!is_array($this->options)){
			$this->options = $this->default;
		}
	}

	protected function constant(){
		define( 'ANATOMYC_VERSION', '1.0' );
		define( 'ANATOMYC_DIR', plugin_dir_path( __FILE__ ) );
		define( 'ANATOMYC_URL', plugin_dir_url( __FILE__ ) );
	}

	public function anatomy(){
		ob_start();
		include 'design/anatomy.php';
		?>
		<script type="text/javascript">
			<?php include 'anatomy-config.php'; ?>
		</script>
		<script type="text/javascript" src="<?php echo ANATOMYC_URL . 'js/anatomy-settings.js'; ?>"></script>
		<?php
		wp_enqueue_style( 'anatomystyle-frontend', ANATOMYC_URL . 'anatomy-style.css', false, '1.0', 'all' );
		wp_enqueue_script( 'anatomy-interact', ANATOMYC_URL . 'anatomy-interact.js', array('jquery'), 10, '1.0', true );
		$html = ob_get_clean();
		return $html;
	}

	public function anatomy_options_page() {
		add_menu_page('Human Anatomy Back', 'Human Anatomy Back', 'manage_options', 'anatomy', array($this, 'options_screen'), ANATOMYC_URL . 'images/anatomy-icon.png');
	}

	public function admin_ajax_url(){
		$url_action = admin_url( '/' ) . 'admin-ajax.php';
		echo '<div style="display:none" id="wpurl">'. $url_action.'</div>';
	}

	public function options_screen(){ ?>
		<script type="text/javascript">
			<?php include 'anatomy-config.php'; ?>
		</script>
	<?php include 'design/admin.php';
	}

	public function add_js_to_wp_footer(){ ?>
	<span id="tipanatomy" style="margin-top:-32px"></span>
	<?php }

	public function add_span_tag(){
		?>
		<span id="tipanatomy"></span>
		<?php
	}

	public function stripslashes_deep($value) {
		$value = is_array($value) ?
		array_map(array($this, 'stripslashes_deep'), $value) : stripslashes($value);
		return $value;
	}

	public function init_admin_script(){
		if(isset($_GET['page']) && $_GET['page'] == 'anatomy'):
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_style('thickbox');
		wp_enqueue_script('thickbox');
		wp_enqueue_script( 'media-upload');
		wp_enqueue_style( 'anatomy-style', ANATOMYC_URL . 'style.css', false, '1.0', 'all' );
		wp_enqueue_style( 'anatomy-style-custom', ANATOMYC_URL . 'custom.min.css', false, '1.0', 'all' );
		wp_enqueue_style( 'anatomystyle', ANATOMYC_URL . 'anatomy-style.css', false, '1.0', 'all' );
		wp_enqueue_style( 'wp-tinyeditor', ANATOMYC_URL . 'tinyeditor.css', false, '1.0', 'all' );
		wp_enqueue_script( 'anatomy-interact', ANATOMYC_URL . 'anatomy-interact.js', array('jquery'), 10, '1.0', true );
		wp_enqueue_script( 'anatomy-tiny.editor', ANATOMYC_URL . 'js/tinymce.min.js', 10, '1.0', true );
		wp_enqueue_script( 'anatomy-script', ANATOMYC_URL . 'js/scripts.js', array( 'wp-color-picker' ), false, true );
		endif;
	}
}

$anatomy = new ANATOMYC_BACK();