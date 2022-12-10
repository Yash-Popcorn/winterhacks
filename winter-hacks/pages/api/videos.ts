// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Storage } from "@google-cloud/storage"

const storage = new Storage({
  projectId: 'hiding-us',
  keyFilename: './hiding-us-a300a5a58360.json'
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  if (req.method === "POST") res.status(404)

  const [files] = await storage.bucket('blur-video-posts').getFiles()
  const arr = new Array<string>()

  files.forEach(value => arr.push(value.name))

  res.status(200).json(arr)
}
