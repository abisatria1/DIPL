<template>
  <div class="login-form">
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Login As" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          name="form.level"
          v-model="form.levels"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-radio 
            value="participant"
          >Participant
          </b-form-radio>
          <b-form-radio
            value="campaigner"
          >Campaigner
          </b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
          levels: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  height: 100vh;
  /* border: 1px solid black; */
}

.row {
  /* border: 1px solid black; */
  height: 100vh;
  display: flex;
  align-items: center;
}

.login-form {
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.199);
  padding: 16px;
  align-items: center;
  width: 400px;
  margin: auto;
}
</style>