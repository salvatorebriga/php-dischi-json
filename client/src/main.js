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

      console.log(this.selectedDisc);
    },

    addSong() {
      console.log(this.newSong);
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
