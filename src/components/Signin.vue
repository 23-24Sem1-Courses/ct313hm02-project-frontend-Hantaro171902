<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
  initialContact: { type: Object, required: true }
});

const $emit = defineEmits(['submit:user']);

const showSuccessMessage = ref(false);

const contactFormSchema = yup.object().shape({
  u_name: yup
    .string()
    .required('Username is required.')
    .min(2, 'Atleast 2 characters.')
    .max(50, 'Maximun is 50 characters.'),
  u_password: yup.string().required('Password is required.'),
  first_name: yup.string(),
  last_name: yup.string(),
  u_address: yup.string(),
  u_telephone: yup
    .string()
    .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g, 'Phone numbers is not valid.'),
  u_email: yup.string().email('Invalid email format.').max(50, 'Email maximum 50 characters.')
});

const editedContact = ref({ ...props.initialContact });

function submitSignin() {
  $emit('submit:user', {
    u_name: editedContact.value.username,
    u_password: editedContact.value.password,
    first_name: editedContact.value.firstname,
    last_name: editedContact.value.lastname,
    u_address: editedContact.value.address,
    u_telephone: editedContact.value.telephone,
    u_email: editedContact.value.email
  });
}
// function deleteContact() {
//   $emit('delete:contact', editedContact.value.id);
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
        <p
          class="text-white fs-2"
          style="font-family: 'Courier New', Courier, monospace; font-weight: 600"
        >
          Be Verified
        </p>
        <small
          class="text-white text-wrap text-center"
          style="width: 17rem; font-family: 'Courier New', Courier, monospace"
          >Join experienced Designers on this platform.</small
        >
      </div>
      <!-------------------- ------ Right Box ---------------------------->

      <div class="col-md-6 right-box">
        <div class="row align-items-center">
          <div v-if="showSuccessMessage" class="success-message mb-4">
            <!-- Show success message -->
            <p>Sign up successful! Redirecting...</p>
          </div>
          <div v-else class="header-text mb-4 text-white">
            <h2>Sign Up</h2>
            <p>We are happy to have you back.</p>
          </div>
          <Form @submit="submitSignin" :validation-schema="contactFormSchema">
            <div class="input-group mb-3">
              <Field
                name="u_name"
                type="text"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="User name"
                v-model="editedContact.username"
              />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="input-group mb-3">
              <Field
                name="u_password"
                type="password"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Password"
                v-model="editedContact.password"
              />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="input-group mb-3">
              <Field
                name="first_name"
                type="text"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="First name"
                v-model="editedContact.firstname"
              />
              <ErrorMessage name="first name" class="error-feedback" />
            </div>
            <div class="input-group mb-3">
              <Field
                name="last_name"
                type="text"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Last name"
                v-model="editedContact.lastname"
              />
              <ErrorMessage name="last name" class="error-feedback" />
            </div>
            <div class="input-group mb-3">
              <Field
                name="u_address"
                type="text"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Adddress"
                v-model="editedContact.address"
              />
              <ErrorMessage name="address" class="error-feedback" />
            </div>
            <div class="input-group mb-3">
              <Field
                name="u_telephone"
                type="text"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Phone numbers"
                v-model="editedContact.telephone"
              />
              <ErrorMessage name="telephone" class="error-feedback" />
            </div>
            <div class="input-group mb-3">
              <Field
                name="u_email"
                type="text"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Email"
                v-model="editedContact.email"
              />
            </div>
            <div class="input-group mb-5 d-flex justify-content-between">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="formCheck" />
                <label for="formCheck" class="form-check-label text-secondary"
                  ><small class="text-white">Remember Me</small></label
                >
              </div>
            </div>
            <div class="input-group mb-3">
              <button type="submit" class="btn btn-lg btn-primary w-100 fs-6">Sign In</button>
            </div>
            <div class="input-group mb-3">
              <button class="btn btn-lg btn-light w-100 fs-6">
                <i class="fa-brands fa-google mx-3"></i><small> Sign In with Google</small>
              </button>
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
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      address: '',
      telephone: '',
      email: '',

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
