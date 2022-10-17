import { DataType } from "../types";

async function getData(
  url = "../../data/photographers.json"
): Promise<DataType> {
  //fetch data from json
  try {
    return await fetch(url).then((res) => res.json());
  } catch (e) {
    console.log(`L'erreur suivante est survenue : ${e.message}`);
  }
}

export default getData;
