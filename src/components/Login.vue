<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <!----------------------- Login Container -------------------------->
    <div class="row border rounded-5 p-3 bg-white shadow box-area">
      <!--------------------------- Left Box ----------------------------->
      <div
        class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
        style="background: #b22830"
      >
        <div class="featured-image mb-3">
          <img src="@/assets/picture/White_logo800.png" class="img-fluid" />
        </div>
        <!-- <p
          class="text-white fs-2"
          style="font-family: 'Courier New', Courier, monospace; font-weight: 600"
        >
          Be Verified
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
            <p>Login successful! Redirecting...</p>
          </div>
          <div v-else class="header-text mb-4">
            <h2>LOGIN</h2>
            <p>We are happy to have you back.</p>
          </div>
          <form @submit.prevent="login">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="User name"
                v-model="username"
              />
            </div>
            <div class="input-group mb-1">
              <input
                type="password"
                class="form-control form-control-lg bg-light fs-6"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div class="input-group mb-5 d-flex justify-content-between">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="formCheck" />
                <label for="formCheck" class="form-check-label text-secondary"
                  ><small>Remember Me</small></label
                >
              </div>
              <div class="forgot">
                <small><a href="#">Forgot Password?</a></small>
              </div>
            </div>
            <div class="input-group mb-3">
              <button type="submit" class="btn btn-lg btn-primary w-100 fs-6">Login</button>
            </div>
            <div class="input-group mb-3">
              <button class="btn btn-lg btn-light w-100 fs-6">
                <i class="fa-brands fa-google mx-3"></i><small> Sign In with Google</small>
              </button>
            </div>
            <div class="row">
              <small>Don't have account? <router-link to="/signin"> Sign Up</router-link></small>
            </div>
          </form>
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
      password: ''
    };
  },
  methods: {
    async login() {
      const credentials = {
        u_name: this.username,
        u_password: this.password
      };

      try {
        const response = await this.$usersService.loginUser(credentials);
        console.log('Response from server:', response);

        if (response.message === 'Login successful') {
          // Handle successful login
          console.log('Login successful!', response.user);

          // Set showSuccessMessage to true
          this.showSuccessMessage = true;

          // Simulate a redirect after a short delay (e.g., 2 seconds)
          setTimeout(() => {
            // You can use router.push to navigate to another page
            this.$router.push('/');

            // For now, I'll reset the form and hide the success message
            this.username = '';
            this.password = '';
            this.showSuccessMessage = false;
          }, 1000);
        } else {
          // Handle login error
          console.error('Login failed', response.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  background: #ececec;
}

/*------------ Login container ------------*/

.box-area {
  width: 930px;
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
