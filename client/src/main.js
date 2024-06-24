const { createApp } = Vue;

createApp({
  data() {
    return {
      url: "http://localhost/php-dischi-json/server/server.php",
      dischi: [],
      selectedDisc: null,
      newSong: {
        name: "",
        album: "",
        artist: "",
        year: "",
        thumbUrl: "",
      },
    };
  },

  methods: {
    getDischi() {
      axios
        .get(this.url)
        .then((response) => {
          this.dischi = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    },

    getModal(index) {
      this.selectedDisc = this.dischi.find((disc) => disc.id === index);
      const modal = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      modal.show();
    },

    addSong() {
      axios
        .post(this.url + "?action=create", this.newSong)
        .then((response) => {
          this.dischi.push(response.data);
          this.resetForm();
        })
        .catch((error) => {
          console.error("Error adding song: ", error);
        });
    },

    deleteSong(id) {
      if (confirm("Are you sure you want to delete this song?")) {
        axios
          .post(this.url + "?action=delete", { id })
          .then(() => {
            // Remove the deleted song from the frontend
            this.dischi = this.dischi.filter((disc) => disc.id !== id);
            this.selectedDisc = null; // Clear selected disc after deletion
          })
          .catch((error) => {
            console.error("Error deleting song: ", error);
          });
      }
    },

    resetForm() {
      this.newSong = {
        name: "",
        album: "",
        artist: "",
        year: "",
        thumbUrl: "",
      };
    },
  },

  created() {
    this.getDischi();
  },
}).mount("#app");
