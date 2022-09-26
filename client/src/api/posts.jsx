
import { instance } from './axiosclient';

export const getPosts = (offset) => {
    return instance.get(
        `/publication?offset=${offset}&limit=10`
        
    )
    .then((res) => {
        return res.data
    })
    .catch (() => null)
}

export async function publishPublication (content,image){
    return await instance.post(
    `/publication`,
    {
        content,
        image
    },
    {headers: {
        'content-type' : 'multipart/form-data'
    },
    }
  )
  .then((res) => {
    return res.data
  })
  .catch (() => null)
}

export async function updatePublication (postid, textUpdate, image){
    return await instance.put(
    `/publication/${postid}`,
    {
        textUpdate,
        image
    },
    {headers: {
        'content-type' : 'multipart/form-data'
    },
    }
  )
  .then((res) => {
    return res.data
  })
  .catch (() => null)
}

export async function deletePublication (postid){
    return await instance.delete(
    `/publication/${postid}`
  )
  .then((res) => {
    return res.data
  })
  .catch (() => null)
}