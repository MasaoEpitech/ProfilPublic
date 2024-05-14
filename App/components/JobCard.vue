<template>
  <div
    class="rounded-lg bg-white border-aquamarine-300/30 shadow-lg/40 bg-aquamarine-50/10 border-2 p-4"
  >
    <div class="flex gap-3 mb-2 items-baseline justify-start">
      <div
        v-if="job.status == 'active'"
        class="h-4 w-4 bg-aquamarine-400 rounded-full text-center"
      />
      <div v-else class="h-4 w-4 bg-red-400 rounded-full text-center"></div>
      <h2 class="text-2xl w-[90%] underline-offset-0 font-bold">
        {{ job.title }}
      </h2>
      <UIcon
        class="size-6 cursor-pointer"
        name="ic:twotone-favorite-border"
        dynamic
      />
    </div>
    <p class="text-neutral-500 mb-2 text-sm font-bold">
      Il y a {{ calculateDaysAgo(job.createdAt) }} jours
    </p>
    <p v-if="job.crushes" class="whitespace-break-spaces">
      {{ job.crushes }}
    </p>
    <p v-else-if="!job.crushes && job.answer2" class="">
      {{ job.answer2 }}
    </p>
    <p v-else-if="!job.crushes && job.answer3" class="">
      {{ job.answer3 }}
    </p>

    <div class="flex mt-5 justify-between items-center">
      <div class="flex gap-5">
        <UTooltip class="flex flex-row gap-1" v-if="job.applicationEmail">
          <template #text> Vues </template>
          <UIcon class="size-6" name="ant-design:eye-filled" dynamic />
          <span>
            {{ job.viewCount }}
          </span>
        </UTooltip>
        <div class="flex gap-2">
          <UTooltip v-if="job.contactEmail">
            <template #text>
              <span>Contact - {{ job.contactEmail }}</span>
            </template>
            <UIcon
              @click="copyEmail(job.contactEmail)"
              class="size-6 cursor-pointer"
              name="ant-design:mail-filled"
              dynamic
            />
          </UTooltip>
        </div>
      </div>
      <UButton
        class="bg-aquamarine-200 hover:bg-aquamarine-500 hover:text-white duration-200 hover:scale-[1.02] text-aquamarine-600"
        variant="soft"
        @click="applyJob(job)"
        >Postuler</UButton
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  job: Object,
});

function calculateDaysAgo(createdDate) {
  const now = new Date();
  const createdAt = new Date(createdDate);
  const differenceInMilliseconds = now - createdAt;
  return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}

const toast = useToast();

function copyEmail(email) {
  navigator.clipboard
    .writeText(email)
    .then(() => {
      console.log("Email copied to clipboard");
      toast.add({
        timeout: 1500,
        title: "Email Copié",
        description: "L'email a été copié",
      });
    })
    .catch((err) => {
      console.error("Failed to copy email: ", err);
    });
}

const emit = defineEmits(["applyJob"]);

function applyJob(job) {
  emit("applyJob", job);
}
</script>
