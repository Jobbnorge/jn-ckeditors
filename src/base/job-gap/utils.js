export const apiUrl = "https://localhost:8001";

export async function getComponents() {
  return new Promise(async (resolve) => {
    const result = await fetch(`${apiUrl}/jobgap/components`, {
      credentials: "include",
    });

    if (result.status !== 200) throw new Error("Could not fetch data from Api");

    resolve(await result.json());
  });
}
