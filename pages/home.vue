<template>
	<view class="page"></view>
</template>

<script>
import common from '../common/common.js';
export default {
	async onLoad() {
		let res = await this.$http.get('users/current');
		common.checkRole(res.data);
	}
};
</script>

<style></style>
