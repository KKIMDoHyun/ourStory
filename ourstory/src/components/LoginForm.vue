<template>
	<v-container fill-height style="max-width: 450px">
		<v-layout align-center row wrap>
			<v-flex xs12>
				<v-alert v-if="isLoginFail" :value="isLoginFail" type="error">
					{{ errMessage }}
				</v-alert>
				<v-alert v-else :value="isLoginSuccess" type="success">
					로그인이 되었습니다.
				</v-alert>
				<v-card>
					<v-toolbar flat color="#FFC400">
						<v-toolbar-title>로그인</v-toolbar-title>
						<v-spacer></v-spacer>
					</v-toolbar>
					<div class="pa-3">
						<v-text-field
							v-model="email"
							type="text"
							label="이메일을 입력하세요"
						>
						</v-text-field>
						<v-text-field
							v-model="password"
							type="password"
							label="패스워드를 입력하세요"
						>
						</v-text-field>
						<v-btn color="#FFCCBC" depressed block large @click="login()"
							>로그인</v-btn
						>
					</div>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			email: null,
			password: null,
			isLoginFail: false,
			isLoginSuccess: false,
			errMessage: '',
		};
	},
	methods: {
		async login() {
			try {
				const userData = {
					identifier: this.email,
					password: this.password,
				};
				this.$store.dispatch('LOGIN', userData);
				this.initForm();
				this.$router.push({ name: 'main' });
			} catch (err) {
				if (
					err.response.data.message[0].messages[0].message ===
					'Please provide your username or your e-mail.'
				) {
					this.errMessage = '이메일을 입력해주세요.';
				} else if (
					err.response.data.message[0].messages[0].message ===
					'Please provide your password.'
				) {
					this.errMessage = '패스워드를 입력해주세요.';
				} else {
					this.errMessage = '이메일과 패스워드가 일치하지 않습니다.';
				}
				console.log(err.response.data.message[0].messages[0].message);
				this.loginFail();
				this.password = '';
			}
		},
		initForm() {
			this.email = '';
			this.password = '';
		},
		LoginSuccess() {
			this.isLoginFail = false;
			this.isLoginSuccess = true;
		},
		loginFail() {
			this.isLoginFail = true;
			this.isLoginSuccess = false;
		},
	},
};
</script>

<style></style>
