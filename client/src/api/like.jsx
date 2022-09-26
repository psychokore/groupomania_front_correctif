
import { instance } from "./axiosclient";

export const getLikes = (postid) => {
    return instance.get(
        `/like/${postid}/`
    )
    .then((res) => {
        return res.data
      })
    .catch (() => null)
}


export async function addLike (postid){
    return await instance.post(
    `/like/${postid}`
  )
  .then((res) => {
    return res.data
  })
  .catch (() => null)
}

export async function deleteLike (postid) {
  return await instance.delete(
    `/like/${postid}`
  )
  .then((res) => {
    return res.data
  })
  .catch (() => null)
}