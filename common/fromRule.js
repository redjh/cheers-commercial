const rule = [
	{
	
		name: "carNo",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请输入车牌号"
	
	},{
		name: "driver",
		checkType: "string",
		checkRule: "1,4",
		errorMsg: "姓名应为1-4个字符"
	},
	{
		name: "driverTel",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "请输入11位手机号码"
	},
	
	{
		name: "searchUrl",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请输入目标地址"

	}
];

export default{
	rule
}
