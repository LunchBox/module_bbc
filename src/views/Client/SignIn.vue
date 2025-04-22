<template>
  <div>Client Sign In</div>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="formData.email" />
      <input type="password" v-model="formData.password" />
      <button>Sign In</button>
    </form>
    <div>
      New Account?
      <a href="#" @click.prevent="$emit('to-signup')">Sign Up</a>
    </div>
  </div>
</template>

<script>
import { useAuth } from "@/services/useAuth";

const { clientSignIn } = useAuth();

export default {
  emits: ["signin-success", "to-signup"],
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async onSubmit() {
      const { email, password } = this.formData;
      await clientSignIn(email, password);
      this.$emit("signin-success");
    },
  },
};
</script>
