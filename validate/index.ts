const Validate = {
	/**
	 * 手机号校验
	 * @param {number | string} value
	 * @return {boolean}
	 */
	mobileCheck: (value: number | string): boolean =>
		/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(String(value)),

	/**
	 * 身份证校验
	 * @param {string | number} value
	 * @return {boolean}
	 */
	IDCardCheck: (value: string | number): boolean =>
		/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
			String(value),
		),

	/**
	 * 邮箱校验
	 * @param {string} value
	 * @return {boolean}
	 */
	emailCheck: (value: string): boolean =>
		/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value),
}

export default Validate;
