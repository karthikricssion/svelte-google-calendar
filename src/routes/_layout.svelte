<script>
	import Nav from '../components/Nav.svelte';
	import SideNav from '../components/SideNav.svelte'
	export let segment;
</script>

<div class="main-app c-flex c-flex-column full-height">
	<Nav {segment}/>
	<div class="c-flex full-height">
		<SideNav />
		<div class="c-flex-full-height">
			<slot></slot>
		</div>
	</div>
</div>