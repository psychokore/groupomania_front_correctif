
import { instance } from "./axiosclient";


export const getComments = ( postid, offset) => {
    return instance.get(
        `/comment/${postid}/comment?offset=${offset}&limit=10`
    )
    .then ((res) => {
        return res.data
    })
    .catch (() => null)
}



export async function postComment (commentid, comment){
    return await instance.post(
    `/comment/${commentid}`,
    {
        comment
    },
  )
  .then((res) => {
    return res.data
  })
  .catch (() => null)
}

export async function deleteComment (commentid) {
    return await instance.delete(
      `/comment/${commentid}`
    )
    .then((res) => {
      return res.data
    })
    .catch (() => null)
  }

  export async function updateComment(commentid, textUpdate){
    return await instance.put(
    `/comment/${commentid}`,
    {
        textUpdate
    }
  )
  .then((res) => {
    return res.data
  })
  .catch (() => null)
}