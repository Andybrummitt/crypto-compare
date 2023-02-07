// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(!req.body.userId){
    res.status(400).json({ message: 'User ID is required.' })
  }
  try {
    const { data, error } = await supabase.auth.admin.deleteUser(
      req.body.userId
    );
    if(error){
      console.log('Error')
      throw new Error(error.message)
    }
    else {
      console.log('Account Deleted')
      res.status(200).json({ message: 'Account Deleted!' })
    }
  } catch (err) {
    res.status(500).json({message: err})
  }
}
