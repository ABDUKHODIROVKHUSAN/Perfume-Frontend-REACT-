import { serverApi } from "../../lib/config";
import axios from "axios";
import { Perfume, PerfumeInquiry } from "../../lib/types/perfume";


class PerfumeService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getPerfumes(input: PerfumeInquiry,): Promise<Perfume[]> {
    try {
      const url = `${this.path}/perfume/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      const result = await axios.get(url);
      console.log("Fetched Perfumes:", result.data);
      return result.data;
    } catch (err) {
      console.log("Error fetching perfumes:", err);
      throw err;
    }
  }

  public async getPerfume(perfumeId: string): Promise<Perfume> {
  try {
    const url = `${this.path}/perfume/${perfumeId}`;
    console.log("Fetching perfume from:", url);
    const result = await axios.get(url, { withCredentials: true });
    console.log("Perfume data received:", result.data);
    return result.data;
  } catch (err) {
    console.log("Error, getPerfume:", err);
    throw err;
  }
}

    

    public async getComingSoon(limit = 4): Promise<Perfume[]> {
      const url = `${this.path}/coming?limit=${limit}`;
      const result = await axios.get(url);
      console.log("Fetched Coming Soon Perfumes:", result.data);
      return result.data;
    }
  
   
  }
  


export default PerfumeService;
