const { createApp } = Vue;

createApp({
  data() {
    return {
      title: "PHP DISCHI",
      url: "http://localhost/php-dischi-json/server/server.php",
      dischi: [],
      selectedDisc: null,
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
  },
  created() {
    this.getDischi();
  },
}).mount("#app");
