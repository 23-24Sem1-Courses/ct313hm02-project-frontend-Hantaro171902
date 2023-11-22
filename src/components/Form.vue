<script setup>
import { ref } from 'vue'; 
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Cateservice from '@/services/cate.service';

const cate = ref([]);
const props = defineProps({
	initialContact: { type: Object, required: true },
});

const $emit = defineEmits(['submit:drink', 'delete:drink']); 
const drinkFormSchema = yup.object().shape({
	dr_name: yup
		.string()
		.required('Tên phải có giá trị.')
		.min(2, 'Tên phải ít nhất 2 ký tự.')
		.max(50, 'Tên có nhiều nhất 50 ký tự.'), 
	dr_price: yup
		.string()
		.min(5, 'Số tiền phải lớn hơn 1000'),
	dr_img: yup
		.string()
			.required('Vui lòng chọn Ảnh'
		),
});

const editedDrink = ref({ ...props.initialDrink });

function submitDrink() {
	$emit('submit:drink', editedDrink.value);
}

function deleteDrink() {
	$emit('delete:drink', editedDrink.value.id);
}
</script>


<template>
	<Form
		@submit="submitContact"
		:validation-schema="contactFormSchema"
	>
		<div class="form-group">
			<label for="name">Tên</label>
			<Field
				name="name" 
				type="text" 
				class="form-control"
				v-model="editedContact.name"
			/>
			<ErrorMessage name="name" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="email">E-mail</label>
			<Field
				name="email" 
				type="email" 
				class="form-control"
				v-model="editedContact.email"
			/>
			<ErrorMessage name="email" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="address">Địa chỉ</label>
			<Field
				name="address" 
				type="text" 
				class="form-control"
				v-model="editedContact.address"
			/>
			<ErrorMessage name="address" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="phone">Điện thoại</label>
			<Field
				name="phone" 
				type="tel" 
				class="form-control"
				v-model="editedContact.phone"
			/>
			<ErrorMessage name="phone" class="error-feedback" />
		</div>

		<div class="form-group form-check">
			<Field
				name="favorite" 
				type="checkbox" 
				class="form-check-input"
				v-model="editedContact.favorite"
				:value="1"
				:unchecked-value="0"
			/>
			<label for="favorite" class="form-check-label">
				<strong>Liên hệ yêu thích</strong>
			</label>
		</div>

		<div class="form-group">
			<button class="btn btn-primary">Lưu</button>
			<button
				v-if="editedContact.id" 
				type="button"
				class="ml-2 btn btn-danger" 
				@click="deleteContact"
			>
				Xóa
			</button>
		</div>
	</Form>
</template>

<style scoped>
@import '@/assets/form.css';
</style>
