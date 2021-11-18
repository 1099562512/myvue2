<template>
	<div class="test2">
		{{name.name}}
	</div>
</template>

<script>
	export default {
		data: function() {
			return {}
		},
		props: {
			name: Object
		},
		created() {
			console.log(this);
		}
	}
</script>

<style>
</style>
