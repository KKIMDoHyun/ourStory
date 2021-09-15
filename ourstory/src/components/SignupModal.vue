<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<v-alert v-if="isFail" :value="isFail" type="error">
				{{ errMessage }}
			</v-alert>
			<v-card>
				<v-toolbar flat color="#BDBDBD">
					<v-toolbar-title>회원가입</v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>
				<v-form @submit.prevent="signup">
					<div class="pa-8">
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
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false">
						닫기
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="completeDialog" persistent max-width="290">
			<v-card>
				<v-card-title class="text-h5"> 회원가입 완료 </v-card-title>
				<v-card-text>OurStory에 오신 것을 환영합니다!!</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="completeSignup">
						확인
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import EventBus from '@/utils/bus';
import { signupUser } from '@/api/auth';
export default {
	data() {
		return {
			dialog: false,
			completeDialog: false,
			username: '',
			email: '',
			password: '',
			errMessage: '',
			isSuccess: false,
			isFail: false,
		};
	},
	created() {
		EventBus.$on('openSignupModal', payload => {
			this.dialog = payload;
		});
	},
	methods: {
		async signup() {
			try {
				const userData = {
					username: this.username,
					email: this.email,
					password: this.password,
				};
				await signupUser(userData);
				this.isFail = false;
				this.completeDialog = true;
				this.dialog = false;
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
			}
		},
		async completeSignup() {
			const userData = {
				identifier: this.email,
				password: this.password,
			};
			await this.$store.dispatch('LOGIN', userData);
			this.completeDialog = false;
		},
	},
};
</script>
