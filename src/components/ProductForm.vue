<script setup>
import { ref } from 'vue';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

// const drinksService = makeDrinksService();

const props = defineProps({
  initialContact: { type: Object, required: true }
});

const $emit = defineEmits(['submit:drink', 'delete:drink']);

const showSuccessMessage = ref(false);

const drinkFormSchema = yup.object().shape({
  dr_name: yup
    .string()
    .required('Tên phải có giá trị.')
    .min(2, 'Tên phải ít nhất 2 ký tự.')
    .max(50, 'Tên có nhiều nhất 50 ký tự.'),
  dr_price: yup.string().min(5, 'Số tiền phải lớn hơn 1000'),
  dr_img: yup.string().required('Vui lòng chọn Ảnh'),
  cate_id: yup.string().required('Vui lòng chọn loại sản phẩm')
});

const editedDrink = ref({ ...props.initialDrink });

function submitDrink() {
  $emit('submit:drink', {
    dr_name: editedDrink.value.drinkname,
    dr_price: editedDrink.value.price,
    dr_img: editedDrink.value.image,
    cate_id: editedDrink.value.category
  });
}

// function deleteDrink() {
//   $emit('delete:drink', editedDrink.value.id);
// }
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <!----------------------- Login Container -------------------------->
    <div class="row border rounded-5 p-3 shadow box-area">
      <!--------------------------- Left Box ----------------------------->
      <div
        class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
        style="background: white"
      >
        <div class="featured-image mb-3">
          <img src="@/assets/picture/Highland_Newlogo.png" class="img-fluid" />
        </div>
        <!-- <p
          class="text-white fs-2"
          style="font-family: 'Courier New', Courier, monospace; font-weight: 600"
        >
    
        </p>
        <small
          class="text-white text-wrap text-center"
          style="width: 17rem; font-family: 'Courier New', Courier, monospace"
          >Join experienced Designers on this platform.</small
        > -->
      </div>
      <!-------------------- ------ Right Box ---------------------------->

      <div class="col-md-6 right-box">
        <div class="row align-items-center">
          <div v-if="showSuccessMessage" class="success-message mb-4">
            <!-- Show success message -->
            <p>Add drink successful! Redirecting...</p>
          </div>
          <div v-else class="header-text mb-4 text-white">
            <h2>Sign Up</h2>
            <p>We are happy to have you back.</p>
          </div>
          <Form @submit="submitDrink" :validation-schema="drinkFormSchema">
            <div class="input-group mb-3">
              <Field
                name="dr_name"
                type="text"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Title"
                v-model="editedDrink.drinkname"
              />
              <ErrorMessage name="drinkname" class="error-feedback" />
            </div>
            <div class="input-group mb-3">
              <Field
                name="dr_price"
                type="price"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="price"
                v-model="editedDrink.price"
              />
              <ErrorMessage name="price" class="error-feedback" />
            </div>
            <div class="input-group mb-3">
              <Field
                name="dr_img"
                type="text"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Image"
                v-model="editedDrink.image"
              />
              <ErrorMessage name="image" class="error-feedback" />
            </div>
            <div class="input-group mb-3">
              <Field
                name="cate_id"
                type="text"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Category"
                v-model="editedDrink.category"
              />
              <ErrorMessage name="last name" class="error-feedback" />
            </div>
            <div class="input-group mb-3">
              <button type="submit" class="btn btn-lg btn-primary w-100 fs-6">Add</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drinkname: '',
      price: '',
      image: '',
      category: '',
      showSuccessMessage: false
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

/*------------ Login container ------------*/

.box-area {
  width: 930px;
  background-color: #b22830;
}

/*------------ Right box ------------*/

.right-box {
  padding: 40px 30px 40px 40px;
}

/*------------ Custom Placeholder ------------*/

::placeholder {
  font-size: 16px;
}

.rounded-4 {
  border-radius: 20px;
}
.rounded-5 {
  border-radius: 30px;
}

/*------------ For small screens------------*/

@media only screen and (max-width: 768px) {
  .box-area {
    margin: 0 10px;
  }
  .left-box {
    height: 100px;
    overflow: hidden;
  }
  .right-box {
    padding: 20px;
  }
}
</style>
