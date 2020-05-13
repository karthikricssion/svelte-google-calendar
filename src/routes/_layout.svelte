<script>
	import Nav from '../components/Nav.svelte';
	import SideNav from '../components/SideNav.svelte'
</script>

<div class="main-app c-flex c-flex-column full-height">
	<Nav />
	<div class="c-flex full-height">
		<SideNav />
		<div class="c-flex-full-height">
			<slot></slot>
		</div>
	</div>
</div>