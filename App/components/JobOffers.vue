<template>
  <main class="bg-neutral-50/80 p-5">
    <h2 class="text-4xl font-bold">
      Offres
      <span class="text-aquamarine-500">d'emplois</span> du moment
    </h2>
    <p class="text-sm mt-5 text-neutral-500 font-semibold">
      {{ list.length }} résultats trouvés
    </p>
    <div class="flex md:flex-row flex-col gap-4">
      <div
        class="mt-2 md:w-1/3 h-[40vh] md:h-[80vh] p-4 overflow-y-auto flex flex-col gap-4"
      >
        <div v-for="job in list">
          <JobCard :job="job" @applyJob="selectedJob = $event" />
        </div>
      </div>
      <div
        class="md:w-2/3 flex p-5 rounded-lg bg-white justify-center items-center shadow-lg md:h-[80vh]"
      >
        <div
          class="flex-col md:flex-row flex items-center justify-center"
          v-if="!selectedJob"
        >
          <h2
            class="text-2xl md:text-3xl md:w-[400px] text-start font-bold text-neutral-800 underline-offset-1"
          >
            Parcourez les nombreuses offres et tentez votre chance dès
            aujourd'hui pour une expérience professionnelle enrichissante
          </h2>
          <img
            src="/assets/images/image.jpg"
            class="md:w-[400px] object-cover"
            draggable="false"
          />
        </div>
        <div class="w-[500px]" v-if="selectedJob">
          <h3 class="text-3xl font-bold">
            Postulez pour l'offre {{ selectedJob.title }}
          </h3>
          <div class="flex gap-2 mt-2">
            <UFormGroup required label="Nom" class="w-full">
              <UInput placeholder="André" v-model="nom" />
            </UFormGroup>
            <UFormGroup required label="Prénom" class="w-full">
              <UInput placeholder="Dubois" v-model="prenom" />
            </UFormGroup>
          </div>
          <UFormGroup required label="Email" class="mt-2">
            <UInput
              placeholder="you@example.com"
              v-model="email"
              icon="i-heroicons-envelope"
            />
          </UFormGroup>
          <UFormGroup required label="Déposez votre CV" class="mt-2">
            <input
              type="file"
              @change="handleFileChange"
              className="flex cursor-pointer file:cursor-pointer file:pt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </UFormGroup>
          <UFormGroup label="Message" class="w-full mt-2">
            <UTextarea placeholder="Madame, Monsieur.." />
          </UFormGroup>
          <UButton
            class="bg-aquamarine-500 hover:bg-aquamarine-500 hover:scale-[1.01] mt-5 flex items-center justify-center w-full text-xl duration-300 text-white"
            variant="soft"
            icon="ic:baseline-send"
            :disabled="!(nom && prenom && email && selectedFile)"
            @click="sendEmail()"
            >Envoyer</UButton
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// Récupérer la data de l'api Profil Public

const { data: jobs } = await useFetch(
  "https://app.staging.profilpublic.fr/api/jobs"
);

console.log(jobs._rawValue.data);

const list = jobs._rawValue.data;

// Récupérer l'offre de job du composant enfant JobCard

let selectedJob = ref(null);

watchEffect(() => {
  console.log(selectedJob.value);
});

// Envoi d'email
const toast = useToast();

const nom = ref("");
const prenom = ref("");
const email = ref("");

const selectedFile = ref(null);

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]; // Met à jour la propriété avec le premier fichier sélectionné
};

function sendEmail() {
  window.location.reload();
  toast.add({
    title: "Email Envoyé",
    description: "Votre candidature a bien été envoyée",
  });
}
</script>
