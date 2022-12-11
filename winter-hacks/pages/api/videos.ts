// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Storage } from "@google-cloud/storage"
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = new Storage({
  projectId: 'hiding-us',
  keyFilename: './hiding-us-a300a5a58360.json'
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  if (req.method === "GET") {
    const bucket = storage.bucket('blur-video-posts')
    const [files] = await bucket.getFiles()
    const arr = new Array<string>()

    files.forEach(v => {
      arr.push(v.name)
    })

    res.status(200).json(arr)
  }
  else {
    /*
    console.log(req.files)
    const bucket = storage.bucket('blur-video-posts')
    const fileName = Date.now().toString(36)
    const file = bucket.file(fileName)

    storage.bucket('blur-video-posts').upload(req.body.url).then(value => {
        file.makePublic()
    })
    */

    const data = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      
      form.parse(req, (err, fields, files) => {
        console.log(files.file.path);
        
        const bucket = storage.bucket('blur-video-posts')
        const file = bucket.file(files.file.filepath)

        storage.bucket('blur-video-posts').upload(files.file.filepath, {
          contentType: "video/mp4",
          public: true
        }).then(async value => {
            
        })
        

        resolve({ fields, files })
      });
    })

    res.status(200).json([

    ])
  }
}
