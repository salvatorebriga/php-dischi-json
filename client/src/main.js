const { createApp } = Vue;

createApp({
  data() {
    return {
      title: "PHP DISCHI",
      url: "http://localhost/php-dischi-json/server/server.php",
      dischi: [],
    };
  },

  methods: {
    getDischi() {
      axios.get(this.url).then((response) => {
        this.dischi = response.data;
      });
    },
  },
  created() {
    this.getDischi();
  },
}).mount("#app");
