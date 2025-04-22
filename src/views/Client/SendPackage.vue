<template>
  <div>Client Send Packages view</div>
  <form @submit.prevent="onSubmit">
    <div>
      From
      <div>- Campus</div>
      <select v-model="pkg.from_campus_id" required>
        <option v-for="c in campuses" :value="c.id">{{ c.name }}</option>
      </select>
      <div>- Address</div>
      <input type="text" v-model="pkg.from_address" required />
    </div>

    <div>
      To
      <div>- Receiptent Name</div>
      <input type="text" v-model="pkg.recipient_name" required />
      <div>- Phone Number</div>
      <input type="text" v-model="pkg.recipient_phone_number" required />
      <div>- Campus</div>
      <select v-model="pkg.to_campus_id" required>
        <option v-for="c in campuses" :value="c.id">{{ c.name }}</option>
      </select>
      <div>- Address</div>
      <input type="text" v-model="pkg.to_address" required />
    </div>

    <div>
      <button>Send Now</button>
    </div>
  </form>
</template>
<script>
import { useCampus } from "@/services/useCampus";
import { usePackages } from "@/services/usePackage";

const { getAllCampuses } = useCampus();
const { sendPackage } = usePackages();

export default {
  emits: ["send-success"],
  data() {
    return {
      campuses: [],
      pkg: {
        from_campus_id: null,
        from_address: null,
        to_campus_id: null,
        to_address: null,
        recipient_name: null,
        recipient_phone_number: null,
      },
    };
  },

  methods: {
    async loadCampuses() {
      this.campuses = await getAllCampuses();
    },

    async onSubmit() {
      await sendPackage(this.pkg);
      this.$emit("send-success");
    },
  },
  mounted() {
    this.loadCampuses();
  },
};
</script>
