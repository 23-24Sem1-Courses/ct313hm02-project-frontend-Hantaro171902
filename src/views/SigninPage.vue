<template>
  <div>
    <Signin @signin="handleSignin" />
  </div>
</template>

<script>
import Signin from '@/components/Signin.vue';

export default {
  components: {
    Signin
  },
  methods: {
    handleSignin(credentials) {
      // Call a method to send the login credentials to the backend
      this.$emit('signin', credentials);
    }
  }
};
</script>
