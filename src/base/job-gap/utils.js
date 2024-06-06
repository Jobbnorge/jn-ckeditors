class Utils {
  get apiUrl() {
    switch (window.location.hostname) {
      case "localhost":
        return "https://localhost:8001";
      case "test.jobbnorge.no":
        return "https://testjaapi.jobbnorge.no";
      case "staging.jobbnorge.no":
        return "https://stagingjaapi.jobbnorge.no";
      default:
        return "https://jaapi.jobbnorge.no";
    }
  }

  async getComponents() {
    return new Promise(async (resolve) => {
      const result = await fetch(`${this.apiUrl}/jobgap/components`, {
        credentials: "include",
      });

      if (result.status !== 200)
        throw new Error("Could not fetch data from Api");

      resolve(await result.json());
    });
  }
}

export default new Utils();