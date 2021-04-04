<template>
  <div>
    <h2 class="text-center">Register</h2>
    <b-tabs content-class="mt-3" fill>
    
    <b-tab title="Participant" active>
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="formParticipant.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Name:"
          label-for="input-2"
        >
          <b-form-input
            id="input-1"
            v-model="formParticipant.email"
            placeholder="Enter Full Name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Gender:"
          label-for="input-3"
        >
          <b-form-select v-model="formParticipant.gender" class="mb-3">
            <b-form-select-option value="male">Male</b-form-select-option>
            <b-form-select-option value="female">Female</b-form-select-option>
            <b-form-select-option value="other">Other</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Job:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="formParticipant.job"
            placeholder="Enter Job"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Phone Number:"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="formParticipant.phoneNumber"
            placeholder="Enter Phone Number"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label="Password:" label-for="input-6">
          <b-form-input
            id="input-6"
            v-model="formParticipant.password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label="Retype Password:" label-for="input-6">
          <b-form-input
            id="input-6"
            v-model="formParticipant.retypepassword"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    </b-tab>

    <b-tab title="Campaigner">
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="formCampaigner.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Name:"
          label-for="input-2"
        >
          <b-form-input
            id="input-1"
            v-model="formCampaigner.email"
            placeholder="Enter Full Name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Organization:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="formCampaigner.organization"
            placeholder="Organization Name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Phone Number:"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="formCampaigner.phoneNumber"
            placeholder="Enter Phone Number"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label="Password:" label-for="input-6">
          <b-form-input
            id="input-6"
            v-model="formCampaigner.password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label="Retype Password:" label-for="input-6">
          <b-form-input
            id="input-6"
            v-model="formCampaigner.retypepassword"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
      
    </b-tab>
  </b-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formParticipant: {
          email: '',
          password: '',
          levels: '',
        },
        formCampaigner:{
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