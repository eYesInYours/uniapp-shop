<template>
	<view>
		<my-login v-if="!token"></my-login>
		
		<my-info v-else></my-info>
	</view>
</template>

<script>
	import badge from '@/mixins/tabBar-badge.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		mixins:[badge],
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="less">

</style>
