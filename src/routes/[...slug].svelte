<script context="module">
	export async function preload({ params }) {
		let [view, year, month, day] = params.slug;
		return { view, year, month, day };
	}
</script>

<script>
    import Row from 'sveltestrap/src/Row.svelte';
	import Col from 'sveltestrap/src/Col.svelte';
	import Button from 'sveltestrap/src/Button.svelte';
    export let view, year, month, day;
    console.log(view, year, month, day)
</script>

<svelte:head>
	<title>Svelte | Google Calendar Clone </title>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</svelte:head>

<div>
    Hello {view} {year} {month} {day}
</div>
