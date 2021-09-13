<template>
	<v-container fill-height style="max-width: 450px">
		<v-layout align-center row wrap>
			<v-flex xs12>
				<v-alert v-if="isFail" :value="isFail" type="error">
					회원가입을 실패했습니다.
				</v-alert>
				<v-alert v-if="isSuccess" :value="isSuccess" type="success">
					회원가입을 완료했습니다.
				</v-alert>
				<v-card>
					<v-toolbar flat color="#FFC400">
						<v-toolbar-title>회원가입</v-toolbar-title>
						<v-spacer></v-spacer>
					</v-toolbar>
					<v-form @submit.prevent="signup">
						<div class="pa-3">
							<v-text-field
								v-model="username"
								type="text"
								label="이름을 입력하세요"
							>
							</v-text-field>
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
							<v-btn type="submit" color="#FFCCBC" depressed block large
								>회원가입</v-btn
							>
						</div>
					</v-form>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { signupUser } from '@/api/auth';
// import { validateEmail } from '@/utils/validation.js';
export default {
	data() {
		return {
			username: '',
			email: '',
			password: '',
			isSuccess: false,
			isFail: false,
		};
	},

	methods: {
		async signup() {
			try {
				const userData = {
					username: this.username,
					email: this.email,
					password: this.password,
				};
				const { data } = await signupUser(userData);
				console.log(data);
				this.isFail = false;
				this.isSuccess = true;
				this.initForm();
			} catch (err) {
				if (
					err.response.data.message[0].messages[0].message ===
					'Please provide valid email address.'
				) {
					this.errMessage = '이메일을 형식을 맞춰주세요.';
				} else if (
					err.response.data.message[0].messages[0].message ===
					'Please provide your password.'
				) {
					this.errMessage = '패스워드를 입력해주세요.';
				} else {
					this.errMessage = '이메일과 패스워드가 일치하지 않습니다.';
				}
				this.isFail = true;
				this.isSuccess = false;
				console.log(err);
				console.log(err.response.data.message[0].messages[0].message);
			}
		},
		initForm() {
			this.username = '';
			this.email = '';
			this.password = '';
		},
		signupSuccess() {
			this.isFail = false;
			this.isSuccess = true;
		},
		signupFail() {
			this.isFail = true;
			this.isSuccess = false;
		},
	},
};
</script>
