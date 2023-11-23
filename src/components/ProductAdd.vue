<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
  initialDrink: { type: Object, required: true }
});

const images = ref([]); // Add this line to define the 'images' array

const $emit = defineEmits(['submit:drink', 'delete:drink']);

const showSuccessMessage = ref(false);

const drinkFormSchema = yup.object().shape({
  dr_name: yup
    .string()
    .required('Title require.')
    .min(2, 'At least 2 characters.')
    .max(50, 'Maximum 50 characters.'),
  dr_price: yup.string().min(5, 'At least 5 characters.'),
  dr_img: yup.string().required('Please choose an image.'),
  cate_id: yup.string().required('Please choose category.')
});

const editedDrink = ref({ ...props.initialDrink });

const submitDrink = () => {
  console.log('Submitting drink:', editedDrink.value);

  $emit('submit:drink', {
    dr_name: editedDrink.value.drinkname,
    dr_price: editedDrink.value.price,
    dr_img: editedDrink.value.image,
    cate_id: editedDrink.value.category
  });
};

// const deleteDrink = () => {
//   $emit('delete:drink', editedDrink.value.id);
// };

const selectFiles = () => {
  console.log('Selecting files');
  this.$refs.fileInput.click();
};

const onFileSelect = (event) => {
  console.log('File selected:', event.target.files);

  const files = event.target.files;
  if (files.length === 0) return;
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.split('/')[0] !== 'image') continue;
    console.log('Adding image:', files[i].name);

    if (images.value.some((e) => e.name === files[i].name)) {
      images.value.push({ name: files[i].name, url: URL.createObjectURL(files[i]) });
      // Update the editedDrink's dr_img field
      editedDrink.value.dr_img = files[i].name;
    }
  }
};
</script>

<!-- Rest of your template and styles -->

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <!----------------------- Login Container -------------------------->
    <div class="row border rounded-5 p-3 shadow box-area">
      <!--------------------------- Left Box ----------------------------->
      <div
        class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
        style="background: white"
      >
        <div class="card">
          <img src="..." class="card-img-top" alt="" />
          <div class="card-body">
            <span v-if="!isDragging"
              >Drag & Drop image here or
              <span class="select" role="button" @click="selectFiles">Choose</span>
            </span>
            <div v-else class="select">Drop image here</div>
            <input name="dr_img" type="file" class="file" ref="fileInput" @change="onFileSelect" />
            <!-- <p class="card-text">Add image here</p>
            <button class="btn btn-primary bottom-0 end-0">Upload</button> -->
          </div>
          <div class="card-footer">
            <div class="card-img" v-for="(image, index) in images" :key="index">
              <span class="delete" role="button" @click="deleteImage(index)">x</span>
              <img :src="image.url" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-------------------- ------ Right Box ---------------------------->

      <div class="col-md-6 right-box">
        <div class="row align-items-center">
          <div v-if="showSuccessMessage" class="success-message mb-4">
            <!-- Show success message -->
            <p>Add drink successful! Redirecting...</p>
          </div>
          <div v-else class="header-text mb-4 text-white">
            <h2>Add Product</h2>
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
            <!-- <div class="input-group">
              <button class="btn btn-primary">Save</button>
              <button
                v-if="editedDrink.id"
                type="button"
                class="btn btn-danger"
                @click="deleteDrink"
              >
                Xóa
              </button>
            </div> -->
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
      image: [],
      category: '',
      showSuccessMessage: false
    };
  }
  // methods: {
  //   selectFiles() {
  //     this.$refs.fileInput.click();
  //   },
  //   onFileSelect(event) {
  //     const files = event.target.files;
  //     if (files.length === 0) return;
  //     for (let i = 0; i < files.length; i++) {
  //       if (files[i].type.split('/')[0] !== 'image') continue;
  //       if (this.images.some((e) => e.name === files[i].name)) {
  //         this.images.push({ name: files[i].name, url: URL.createObjectURL(files[i]) });
  //       }
  //     }
  //   }
  // }
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

.card {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 20px;
}

.card .top {
  text-align: center;
}

.card-body {
  height: 100%;
  border-radius: 10px;
  border: 2px dashed #343442;
  align-items: center;
  user-select: center;
  -webkit-user-select: center;
  background-color: #f5f5f5;
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
