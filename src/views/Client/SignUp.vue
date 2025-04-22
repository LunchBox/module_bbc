<template>
  <div>
    <div>Client Sign Up view</div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="formData.email" />
      <input type="password" v-model="formData.password" />
      <input type="password" v-model="formData.repeat_password" />
      <input type="text" v-model="formData.phone_number" />
      <input type="text" v-model="formData.firstname" />
      <input type="text" v-model="formData.lastname" />

      <button>Sign Up</button>
    </form>

    <div>
      Have a account?
      <a href="#" @click.prevent="$emit('to-signin')">Sign In</a>
    </div>
  </div>
</template>

<script>
import { useAuth } from "@/services/useAuth";
const { clientSignUp } = useAuth();

export default {
  emits: ["to-signin"],
  data() {
    return {
      formData: {
        email: null,
        password: null,
        repeat_password: null,
        phone_number: null,
        firstname: null,
        lastname: null,
      },
    };
  },
  methods: {
    async onSubmit() {
      await clientSignUp(this.formData);
    },
  },
};
</script>
