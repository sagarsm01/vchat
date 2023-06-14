import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let test = false;
  if(test) {
    res.status(500).json({ error: 'An error occurred' });
  } else {
    const uri = `http://1f77-34-142-228-179.ngrok-free.app`;
    const url = `${uri}/submit-prompt`;
    try {
      let config: any = {
        method: 'post',
        maxBodyLength: Infinity,
        url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: req.body
      };
      const response = await axios.request(config);

      const data = response.data;

      res.status(200).json(data);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'An error occurred' });
    }
}
}
