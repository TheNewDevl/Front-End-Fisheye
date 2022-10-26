import { DataType } from "../types";

async function getData(
  url = "../../data/photographers.json"
): Promise<DataType> {
  //fetch data from json

  return await fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Erreur : ${res.status}`);
    }
  });
}

export default getData;
