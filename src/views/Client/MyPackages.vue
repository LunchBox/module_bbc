<template>
  <div>
    <div>My Packages</div>
    <div>
      <div v-for="pkg in pkgs">
        <div>No: {{ pkg.tracking_number }}</div>
        <div>from {{ pkg.from_address }}, {{ pkg.from_campus }}</div>
        <div>to {{ pkg.to_address }}, {{ pkg.to_campus }}</div>
        <div>
          Recipient: {{ pkg.recipient.name }}, {{ pkg.recipient.phone_number }}
        </div>
        <div>Status: {{ pkg.status }}</div>
        <div>Sent Time: {{ pkg.send_time }}</div>
        <div>
          <button @click="$router.push(`/track/${pkg.tracking_number}`)">
            Track
          </button>
        </div>
        <div>
          <button
            @click.prevent="onReturn(pkg.id)"
            :disabled="pkg.returning === 1"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { useCampus } from "@/services/useCampus";
import { usePackages } from "@/services/usePackage";

// const { getAllCampuses } = useCampus();
const { getMyPackages, returnPackage } = usePackages();

export default {
  data() {
    return {
      pkgs: [],
    };
  },

  methods: {
    async load() {
      this.pkgs = await getMyPackages();
      console.log(this.pkgs);
    },

    async onReturn(pkgId) {
      if (!confirm("are you sure?")) return;
      await returnPackage(pkgId);
    },
  },

  mounted() {
    this.load();
  },
};
</script>
