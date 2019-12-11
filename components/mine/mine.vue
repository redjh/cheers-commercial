<template>
	<view>
		<bg></bg>
		<template v-if="on_off">
			<navigator class="button" open-type="navigate" url="/pages/commercial/mine/authorize/authorize">
				<button type="primary">我要认证</button>
			</navigator>
		</template>
		<template v-else>
			<my-function :manage="manage"></my-function>
		</template>
	</view>
</template>

<script>
import bg from '@/components/bg/bg.vue';
import myFunction from '@/components/my-function/my-function.vue';
export default {
	name: 'mine',
	props: {
		manage: Object,
		on_off: Boolean
	},
	components: {
		bg,
		myFunction
	},
	data() {
		return {
			balance: 2000,
			orderNum: 500
		};
	},
	methods: {}
};
</script>

<style lang="scss">
.business {
	margin-top: 60upx;
}

.button {
	margin: 0 35upx;
	margin-top: 150upx;

	button[type='primary'] {
		background: #ff7a22;
		line-height: 80upx;
	}
}
</style>
