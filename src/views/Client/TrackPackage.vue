<template>
  <div>Track Package</div>
  {{ details }}
  <div v-if="details">
    <div>
      Tracking
      {{ details.tracking_number }}
    </div>
    <div>
      {{ details.status }}
      {{ details.from_campus }} -> {{ details.to_campus }}
    </div>
    <div>
      Progress
      <div v-for="prog in details.progress">
        <div>
          {{ prog.status }}
        </div>
        <div>
          {{ prog.datetime }}

          <span v-if="prog.returnning === 1">Returnning</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { usePackages } from "@/services/usePackage";

const { getPackageDetails } = usePackages();

export default {
  props: ["trackingNumber"],
  data() {
    return {
      details: {},
    };
  },
  methods: {},
  async mounted() {
    this.details = await getPackageDetails(this.trackingNumber);
  },
};
</script>
